/**
 * app.js
 * Lógica del juego Ahorcado.
 * - Pide una palabra aleatoria al backend (POST /api/palabra)
 * - Maneja el estado del juego con una clase Juego
 * - Guarda y muestra scores via API (POST /api/score, POST /api/scores)
 * - Muestra Top 10 en pantalla (la BBDD guarda todos los registros)
 * - Ordena la tabla por nombre, puntos o tiempo
 * - Genera PDF de la partida o del ranking (POST /api/pdf, /api/pdf-ranking)
 * - Cara del ahorcado según errores cometidos
 * - Toggle modo día/noche persistente
 */

// ── URL base de la API ────────────────────────────────────────
const API = "http://localhost:3000/api";

// ── Referencias al DOM ────────────────────────────────────────
const wordDisplay    = document.getElementById("wordDisplay");
const wrongLetters   = document.getElementById("wrongLetters");
const timerEl        = document.getElementById("timer");
const puntosEl       = document.getElementById("puntos");
const vidasEl        = document.getElementById("vidas");
const keyboardEl     = document.getElementById("keyboard");
const btnNueva       = document.getElementById("btnNueva");
const scoresBody     = document.getElementById("scoresBody");
const scoresNote     = document.getElementById("scoresNote");
const themeToggle    = document.getElementById("themeToggle");
const themeIcon      = document.getElementById("themeIcon");

// Modal score
const modalScore     = document.getElementById("modalScore");
const modalTitulo    = document.getElementById("modalTitulo");
const modalSub       = document.getElementById("modalSub");
const inputNombre    = document.getElementById("inputNombre");
const modalFeedback  = document.getElementById("modalFeedback");
const btnGuardar     = document.getElementById("btnGuardar");
const btnCerrarModal = document.getElementById("btnCerrarModal");

// Modal PDF
const modalPDF                 = document.getElementById("modalPDF");
const pdfInfo                  = document.getElementById("pdfInfo");
const btnDescargarPDF          = document.getElementById("btnDescargarPDF");
const btnDescargarPDFTabla     = document.getElementById("btnDescargarPDFTabla");
const btnDescargarTablaDirecto = document.getElementById("btnDescargarTablaDirecto");
const btnCerrarPDF             = document.getElementById("btnCerrarPDF");

// ── Partes del ahorcado en orden de aparición ─────────────────
const PARTES = [
  "p-cabeza",
  "p-cuerpo",
  "p-brazo-i",
  "p-brazo-d",
  "p-pierna-i",
  "p-pierna-d",
];

const MAX_ERRORES = PARTES.length; // 6 vidas
const TOP_N       = 10;            // cantidad de filas visibles en la tabla

// ── Estado de ordenamiento de la tabla ───────────────────────
let todosLosScores = [];  // TODOS los scores traídos de la API
let scoresVisibles = [];  // Top 10 actualmente mostrado (se usa también para el PDF)
let sortCol        = "puntos"; // columna activa por defecto
let sortDir        = "desc";   // dirección: "asc" o "desc"

// Score del último juego terminado (para el PDF de partida)
let ultimoScore = null;

// ─────────────────────────────────────────────────────────────
// CLASE JUEGO
// Encapsula todo el estado de una partida.
// ─────────────────────────────────────────────────────────────
class Juego {
  /**
   * @param {string} palabra  Palabra a adivinar (en minúsculas)
   */
  constructor(palabra) {
    this.palabra          = palabra;
    this.letrasAdivinadas = new Set();
    this.letrasErradas    = new Set();
    this.terminado        = false;
    this.ganado           = false;
    this.segundos         = 0;
    this.puntos           = 0;
    this._intervalo       = null;
  }

  /** Inicia el temporizador */
  iniciarTimer() {
    this._intervalo = setInterval(() => {
      this.segundos++;
      timerEl.textContent = `${this.segundos}s`;
    }, 1000);
  }

  /** Detiene el temporizador */
  detenerTimer() {
    clearInterval(this._intervalo);
  }

  /** Cantidad de errores cometidos */
  get errores() {
    return this.letrasErradas.size;
  }

  /** Vidas restantes */
  get vidas() {
    return MAX_ERRORES - this.errores;
  }

  /**
   * Procesa una letra ingresada por el jugador.
   * @param {string} letra
   * @returns {"correcta"|"error"|"repetida"|"fin"}
   */
  jugarLetra(letra) {
    if (this.terminado) return "fin";
    if (this.letrasAdivinadas.has(letra) || this.letrasErradas.has(letra)) return "repetida";

    if (this.palabra.includes(letra)) {
      this.letrasAdivinadas.add(letra);
      this.puntos += 10 * this.vidas;

      const todasAdivinadas = [...this.palabra].every(l => this.letrasAdivinadas.has(l));
      if (todasAdivinadas) {
        this.ganado    = true;
        this.terminado = true;
        this.puntos   += Math.max(0, 200 - this.segundos);
        this.detenerTimer();
        return "fin";
      }
      return "correcta";
    } else {
      this.letrasErradas.add(letra);
      if (this.errores >= MAX_ERRORES) {
        this.terminado = true;
        this.ganado    = false;
        this.detenerTimer();
        return "fin";
      }
      return "error";
    }
  }

  /**
   * Devuelve los slots de la palabra para renderizar.
   * @returns {string[]}
   */
  getSlots() {
    return [...this.palabra].map(l => {
      if (this.letrasAdivinadas.has(l)) return l;
      if (!this.ganado && this.terminado) return l;
      return null;
    });
  }
}

// ── Instancia global del juego ────────────────────────────────
let juego = null;

// ─────────────────────────────────────────────────────────────
// MODO DÍA / NOCHE
// ─────────────────────────────────────────────────────────────

/**
 * Aplica el tema al <html> y lo persiste en localStorage.
 * @param {"dark"|"light"} tema
 */
function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  themeIcon.textContent = tema === "dark" ? "☀️" : "🌙";
  localStorage.setItem("tema", tema);
}

aplicarTema(localStorage.getItem("tema") || "dark");

themeToggle.addEventListener("click", () => {
  const actual = document.documentElement.getAttribute("data-theme");
  aplicarTema(actual === "dark" ? "light" : "dark");
});

// ─────────────────────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────────────────────

/** Dibuja los slots de la palabra en pantalla */
function renderPalabra() {
  const slots = juego.getSlots();
  wordDisplay.innerHTML = slots.map(l => {
    if (l === null) return `<div class="letra-slot"></div>`;
    const esPerdida = !juego.ganado && juego.terminado && !juego.letrasAdivinadas.has(l);
    const cls = esPerdida ? "letra-slot--error" : "letra-slot--correcta";
    return `<div class="letra-slot ${cls}">${l}</div>`;
  }).join("");
}

/** Muestra las partes del ahorcado según errores actuales */
function renderAhorcado() {
  PARTES.forEach((id, i) => {
    const el = document.getElementById(id);
    if (i < juego.errores) {
      el.classList.remove("oculto");
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
      el.classList.add("oculto");
    }
  });
}

/** Actualiza la expresión de la cara según cuántos errores lleva el jugador */
function actualizarCara() {
  const ojoI  = document.getElementById("ojo-i");
  const ojoD  = document.getElementById("ojo-d");
  const ojosX = document.getElementById("ojos-x");
  const boca  = document.getElementById("boca");

  const perdido = juego.terminado && !juego.ganado;

  if (perdido) {
    ojoI.classList.add("oculto");
    ojoD.classList.add("oculto");
    ojosX.classList.remove("oculto");
    boca.setAttribute("d", "M123,60 Q130,52 137,60"); // dolido
    return;
  }

  ojoI.classList.remove("oculto");
  ojoD.classList.remove("oculto");
  ojosX.classList.add("oculto");

  const e = juego.errores;
  if      (e === 0) boca.setAttribute("d", "M123,55 Q130,61 137,55"); // sonrisa
  else if (e <= 2)  boca.setAttribute("d", "M123,58 L137,58");         // neutral
  else if (e <= 4)  boca.setAttribute("d", "M123,60 Q130,56 137,60"); // preocupado
  else              boca.setAttribute("d", "M123,61 Q130,54 137,61"); // muy preocupado
}

/** Actualiza el contador de letras incorrectas */
function renderErrores() {
  const erradas = [...juego.letrasErradas].join("  ").toUpperCase();
  wrongLetters.textContent = erradas || "—";
}

/** Actualiza puntos y vidas en pantalla */
function renderStats() {
  puntosEl.textContent = juego.puntos;
  vidasEl.textContent  = juego.vidas;
}

/** Genera el teclado virtual con las letras del español */
function renderTeclado() {
  const letras = "abcdefghijklmnñopqrstuvwxyz".split("");
  keyboardEl.innerHTML = letras.map(l =>
    `<button class="key" data-letra="${l}">${l}</button>`
  ).join("");

  keyboardEl.querySelectorAll(".key").forEach(btn => {
    btn.addEventListener("click", () => manejarLetra(btn.dataset.letra));
  });
}

/** Actualiza el estado visual de una tecla */
function actualizarTecla(letra, tipo) {
  const btn = keyboardEl.querySelector(`[data-letra="${letra}"]`);
  if (!btn) return;
  btn.disabled = true;
  btn.classList.add(tipo === "correcta" ? "key--correcta" : "key--error");
}

// ─────────────────────────────────────────────────────────────
// SCORES Y ORDENAMIENTO
// ─────────────────────────────────────────────────────────────

/** Carga scores desde la API y los guarda localmente para ordenar */
async function cargarScores() {
  try {
    const res      = await fetch(`${API}/scores`, { method: "POST" });
    todosLosScores = await res.json();
    renderScores();
  } catch (err) {
    scoresBody.innerHTML = `<tr><td colspan="5" class="table__empty">Error al cargar scores.</td></tr>`;
    console.error("Error al cargar scores:", err);
  }
}

/**
 * Ordena los scores locales y renderiza solo el Top 10 en la tabla.
 * Todos los registros siguen existiendo en la base de datos;
 * acá solo se recorta lo que se MUESTRA en pantalla.
 * Usa todosLosScores, sortCol y sortDir.
 */
function renderScores() {
  if (todosLosScores.length === 0) {
    scoresBody.innerHTML = `<tr><td colspan="5" class="table__empty">Aún no hay scores.</td></tr>`;
    scoresNote.textContent = "";
    scoresVisibles = [];
    actualizarIconos();
    return;
  }

  const ordenados = [...todosLosScores].sort((a, b) => {
    let valA = a[sortCol];
    let valB = b[sortCol];

    if (sortCol === "nombre") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ?  1 : -1;
      return 0;
    }

    return sortDir === "asc" ? valA - valB : valB - valA;
  });

  scoresVisibles = ordenados.slice(0, TOP_N);

  scoresBody.innerHTML = scoresVisibles.map((s, i) => `
    <tr>
      <td><span class="badge-rank">#${i + 1}</span></td>
      <td>${s.nombre}</td>
      <td>${s.puntos}</td>
      <td>${s.tiempo}s</td>
      <td>${new Date(s.fecha).toLocaleDateString("es-AR")}</td>
    </tr>
  `).join("");

  const total = todosLosScores.length;
  scoresNote.textContent = total > TOP_N
    ? `Mostrando el Top ${TOP_N} de ${total} jugadores registrados.`
    : `${total} jugador${total === 1 ? "" : "es"} registrado${total === 1 ? "" : "s"}.`;

  actualizarIconos();
}

/** Actualiza los íconos ↑ ↓ ↕ en los encabezados de la tabla */
function actualizarIconos() {
  ["nombre", "puntos", "tiempo"].forEach(col => {
    const icon = document.getElementById(`icon-${col}`);
    if (!icon) return;
    if (col === sortCol) {
      icon.textContent = sortDir === "asc" ? "↑" : "↓";
      icon.classList.add("sort-icon--activo");
    } else {
      icon.textContent = "↕";
      icon.classList.remove("sort-icon--activo");
    }
  });
}

// ─────────────────────────────────────────────────────────────
// LÓGICA PRINCIPAL
// ─────────────────────────────────────────────────────────────

/**
 * Maneja el ingreso de una letra desde teclado virtual o físico.
 * @param {string} letra
 */
function manejarLetra(letra) {
  if (!juego || juego.terminado) return;

  const resultado = juego.jugarLetra(letra);
  if (resultado === "repetida") return;

  actualizarTecla(letra, resultado === "correcta" ? "correcta" : "error");
  renderPalabra();
  renderAhorcado();
  actualizarCara();
  renderErrores();
  renderStats();

  if (resultado === "fin") finalizarJuego();
}

/** Muestra el modal de fin de juego con el resultado */
function finalizarJuego() {
  ultimoScore = {
    puntos: juego.puntos,
    tiempo: juego.segundos,
    fecha:  new Date().toLocaleString("es-AR"),
  };

  if (juego.ganado) {
    modalTitulo.textContent = "¡Ganaste! 🎉";
    modalSub.textContent    = `Palabra: "${juego.palabra.toUpperCase()}" · Puntos: ${juego.puntos} · Tiempo: ${juego.segundos}s`;
  } else {
    modalTitulo.textContent = "¡Perdiste! 💀";
    modalSub.textContent    = `La palabra era: "${juego.palabra.toUpperCase()}" · Tiempo: ${juego.segundos}s`;
  }

  inputNombre.value         = "";
  modalFeedback.textContent = "";
  modalScore.classList.add("modal--visible");
}

/**
 * Inicia una nueva partida pidiendo una palabra al backend.
 */
async function nuevaPartida() {
  wordDisplay.innerHTML      = "";
  wrongLetters.textContent   = "—";
  timerEl.textContent        = "0s";
  puntosEl.textContent       = "0";
  vidasEl.textContent        = MAX_ERRORES;

  try {
    const res    = await fetch(`${API}/palabra`, { method: "POST" });
    const data   = await res.json();
    const palabra = data.palabra.toLowerCase();

    juego = new Juego(palabra);
    juego.iniciarTimer();

    renderTeclado();
    renderPalabra();
    renderAhorcado();
    actualizarCara();
  } catch (err) {
    wordDisplay.innerHTML = `<p style="color:var(--danger)">Error al conectar con la API.</p>`;
    console.error("Error al obtener palabra:", err);
  }
}

// ─────────────────────────────────────────────────────────────
// GUARDAR SCORE
// ─────────────────────────────────────────────────────────────

/** Valida el nombre y guarda el score en la base de datos */
async function guardarScore() {
  const nombre = inputNombre.value.trim();

  if (!nombre) {
    modalFeedback.textContent = "Ingresá tu nombre.";
    modalFeedback.className   = "form__feedback error";
    return;
  }

  try {
    const res = await fetch(`${API}/score`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        nombre,
        puntos: ultimoScore.puntos,
        tiempo: ultimoScore.tiempo,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      modalFeedback.textContent = err.error || "Error al guardar.";
      modalFeedback.className   = "form__feedback error";
      return;
    }

    ultimoScore.nombre = nombre;
    modalScore.classList.remove("modal--visible");
    cargarScores();

    pdfInfo.textContent = `${nombre} · ${ultimoScore.puntos} pts · ${ultimoScore.tiempo}s`;
    modalPDF.classList.add("modal--visible");

  } catch (err) {
    modalFeedback.textContent = "No se pudo conectar con la API.";
    modalFeedback.className   = "form__feedback error";
    console.error("Error al guardar score:", err);
  }
}

// ─────────────────────────────────────────────────────────────
// PDF
// ─────────────────────────────────────────────────────────────

/** Solicita el PDF de la partida actual y fuerza la descarga */
async function descargarPDF() {
  try {
    const res  = await fetch(`${API}/pdf`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(ultimoScore),
    });

    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `score_${ultimoScore.nombre}.pdf`;
    a.click();
    URL.revokeObjectURL(url);

    modalPDF.classList.remove("modal--visible");
  } catch (err) {
    console.error("Error al descargar PDF:", err);
  }
}

/** Solicita el PDF de la tabla de posiciones (Top 10 visible) y fuerza la descarga */
async function descargarPDFTabla() {
  if (scoresVisibles.length === 0) return;

  try {
    const res = await fetch(`${API}/pdf-ranking`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ scores: scoresVisibles }),
    });

    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "ranking_ahorcado.pdf";
    a.click();
    URL.revokeObjectURL(url);

    modalPDF.classList.remove("modal--visible");
  } catch (err) {
    console.error("Error al descargar el ranking:", err);
  }
}

// ─────────────────────────────────────────────────────────────
// TECLADO FÍSICO
// ─────────────────────────────────────────────────────────────

document.addEventListener("keydown", (e) => {
  const letra = e.key.toLowerCase();
  if (/^[a-zñ]$/.test(letra)) manejarLetra(letra);
});

// ─────────────────────────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────────────────────────

btnNueva.addEventListener("click",              nuevaPartida);
btnGuardar.addEventListener("click",            guardarScore);
btnCerrarModal.addEventListener("click",        () => modalScore.classList.remove("modal--visible"));
btnDescargarPDF.addEventListener("click",       descargarPDF);
btnDescargarPDFTabla.addEventListener("click",  descargarPDFTabla);
btnDescargarTablaDirecto.addEventListener("click", descargarPDFTabla);
btnCerrarPDF.addEventListener("click",          () => modalPDF.classList.remove("modal--visible"));

// Ordenamiento de la tabla al hacer clic en los encabezados
document.querySelectorAll(".th-sort").forEach(th => {
  th.addEventListener("click", () => {
    const col = th.dataset.col;
    if (sortCol === col) {
      sortDir = sortDir === "asc" ? "desc" : "asc";
    } else {
      sortCol = col;
      sortDir = col === "nombre" ? "asc" : "desc";
    }
    renderScores();
  });
});

// ─────────────────────────────────────────────────────────────
// INICIO
// ─────────────────────────────────────────────────────────────
cargarScores();
nuevaPartida();