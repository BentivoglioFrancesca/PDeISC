//  URL base de la API 
const API_URL = "http://localhost:3000/api/alumnos";

//  Referencias al DOM 
const tablaBody   = document.getElementById("tablaBody");
const btnAgregar  = document.getElementById("btnAgregar");
const inputNombre = document.getElementById("nombre");
const inputApell  = document.getElementById("apellido");
const inputEdad   = document.getElementById("edad");
const feedback    = document.getElementById("feedback");
const themeToggle = document.getElementById("themeToggle");
const themeIcon   = document.getElementById("themeIcon");

// Modo día/noche 

/**
 * Aplica el tema al <html> y actualiza el ícono.
 * @param {"dark"|"light"} tema
 */
function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  themeIcon.textContent = tema === "dark" ? "☀️" : "🌙";
  localStorage.setItem("tema", tema);
}

// Restaurar tema guardado o usar dark por defecto
aplicarTema(localStorage.getItem("tema") || "dark");

themeToggle.addEventListener("click", () => {
  const actual = document.documentElement.getAttribute("data-theme");
  aplicarTema(actual === "dark" ? "light" : "dark");
});

//  Validación de inputs 

// Bloquear letras en Edad
inputEdad.addEventListener("keypress", (e) => {
  if (!/[0-9]/.test(e.key)) e.preventDefault();
});

// Bloquear números en Nombre y Apellido
[inputNombre, inputApell].forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if (/[0-9]/.test(e.key)) e.preventDefault();
  });
});

// Limitar edad máxima a 99 
inputEdad.addEventListener("input", () => {
  if (parseInt(inputEdad.value) > 99) inputEdad.value = 99;
  if (parseInt(inputEdad.value) < 1)  inputEdad.value = "";
});

//  Feedback 

/**
 * Muestra un mensaje temporal bajo el formulario.
 * @param {string} msg
 * @param {boolean} esError
 */
function mostrarFeedback(msg, esError = false) {
  feedback.textContent = msg;
  feedback.className = "form__feedback" + (esError ? " error" : "");
  setTimeout(() => { feedback.textContent = ""; }, 3000);
}

//  Renderizar tabla 

/** Genera las filas de la tabla con los alumnos recibidos.
 * @param {Array} alumnos
 */
function renderizarTabla(alumnos) {
  if (alumnos.length === 0) {
    tablaBody.innerHTML = `<tr><td colspan="4" class="table__empty">No hay alumnos registrados.</td></tr>`;
    return;
  }

  tablaBody.innerHTML = alumnos.map((a, index) => `
    <tr>
     <td><span class="badge-id">#${a.id}</span></td>
      <td>${a.nombre}</td>
      <td>${a.apellido}</td>
      <td>${a.edad}</td>
    </tr>
  `).join("");
}


/** Carga todos los alumnos desde la API y actualiza la tabla.*/
async function cargarAlumnos() {
  try {
    const res  = await fetch(API_URL);
    const data = await res.json();
    renderizarTabla(data);
  } catch (err) {
    tablaBody.innerHTML = `<tr><td colspan="4" class="table__empty">Error al conectar con la API.</td></tr>`;
    console.error("Error al cargar alumnos:", err);
  }
}

//  POST 

/** Valida el formulario y envía el nuevo alumno a la API.*/
async function agregarAlumno() {
  const nombre   = inputNombre.value.trim();
  const apellido = inputApell.value.trim();
  const edad     = parseInt(inputEdad.value);

  if (!nombre || !apellido || !edad) {
    mostrarFeedback("Completá todos los campos.", true);
    return;
  }
  if (edad < 1 || edad > 99) {
    mostrarFeedback("La edad debe estar entre 1 y 99.", true);
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, apellido, edad }),
    });

    if (!res.ok) {
      const err = await res.json();
      mostrarFeedback(err.error || "Error del servidor.", true);
      return;
    }

    inputNombre.value = "";
    inputApell.value  = "";
    inputEdad.value   = "";
    mostrarFeedback("Alumno agregado correctamente.");
    cargarAlumnos();
  } catch (err) {
    mostrarFeedback("No se pudo conectar con la API.", true);
    console.error("Error al agregar alumno:", err);
  }
}

btnAgregar.addEventListener("click", agregarAlumno);
cargarAlumnos();