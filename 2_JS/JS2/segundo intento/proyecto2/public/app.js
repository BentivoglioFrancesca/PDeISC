let numerosUtiles = []

const themeToggle = document.getElementById('theme-toggle')
const themeIcon   = themeToggle.querySelector('.theme-icon')

function aplicarTema(tema) {
  document.documentElement.setAttribute('data-theme', tema)
  themeIcon.textContent = tema === 'dark' ? '☀️' : '🌙'
  localStorage.setItem('tema', tema)
}

themeToggle.addEventListener('click', () => {
  aplicarTema(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
})
aplicarTema(localStorage.getItem('tema') || 'dark')

// ═══════════════════════════════════════════════
//  ARCHIVOS DEL PROYECTO 1
// ═══════════════════════════════════════════════

const P1_URL = 'http://localhost:3030'

async function cargarArchivosP1() {
  const listaEl = document.getElementById('p1-lista')
  const errEl   = document.getElementById('err-p1')
  errEl.textContent = ''
  listaEl.innerHTML = '<p class="empty-msg">Cargando...</p>'

  try {
    const res  = await fetch(`${P1_URL}/archivos`)
    const data = await res.json()

    if (!data.ok || !data.archivos.length) {
      listaEl.innerHTML = '<p class="empty-msg">No hay archivos guardados en el Proyecto 1 todavía.</p>'
      return
    }

    listaEl.innerHTML = '<div class="p1-archivos-grid">' +
      data.archivos.map(f => `
        <div class="p1-archivo-item">
          <div class="p1-archivo-info">
            <span class="p1-archivo-nombre">📄 ${f.nombre}</span>
            <span class="p1-archivo-meta">${f.fecha} · ${f.size} bytes</span>
          </div>
          <button class="btn btn--cargar btn--sm" onclick="cargarDesdeP1('${f.nombre}')">Cargar</button>
        </div>
      `).join('') +
    '</div>'
  } catch {
    listaEl.innerHTML = '<p class="empty-msg">No se pudo conectar con el Proyecto 1 (puerto 3030).</p>'
    errEl.textContent = 'Asegurate de que el servidor del Proyecto 1 esté corriendo.'
  }
}

async function cargarDesdeP1(nombre) {
  const errEl = document.getElementById('err-p1')
  errEl.textContent = ''

  try {
    const res  = await fetch(`${P1_URL}/archivos/${nombre}`)
    const text = await res.text()
    procesarTexto(text)
  } catch {
    errEl.textContent = 'No se pudo cargar el archivo.'
  }
}

cargarArchivosP1()

// ═══════════════════════════════════════════════
//  DROPZONE
// ═══════════════════════════════════════════════

const dropzone  = document.getElementById('dropzone')
const fileInput = document.getElementById('file-input')

dropzone.addEventListener('dragover', e => {
  e.preventDefault()
  dropzone.classList.add('dropzone--over')
})
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dropzone--over'))
dropzone.addEventListener('drop', e => {
  e.preventDefault()
  dropzone.classList.remove('dropzone--over')
  if (e.dataTransfer.files[0]) procesarArchivo(e.dataTransfer.files[0])
})
fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) procesarArchivo(fileInput.files[0])
})

function procesarArchivo(file) {
  const errEl = document.getElementById('err-archivo')
  errEl.textContent = ''

  if (!file.name.endsWith('.txt')) {
    errEl.textContent = 'Solo se aceptan archivos .txt.'
    return
  }

  const reader = new FileReader()
  reader.onload = e => procesarTexto(e.target.result)
  reader.readAsText(file)
}

function procesarTexto(texto) {
  const errEl = document.getElementById('err-archivo')
  errEl.textContent = ''

  const lineas = texto
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l !== '' && !l.startsWith('//'))

  const todos = lineas.map(l => Number(l)).filter(n => !isNaN(n))

  if (!todos.length) {
    errEl.textContent = 'El archivo no contiene números válidos.'
    return
  }

  analizarNumeros(todos)
}

// ═══════════════════════════════════════════════
//  FILTRO Y ANÁLISIS
// ═══════════════════════════════════════════════

function cumpleFiltro(n) {
  const str = String(Math.abs(n))
  if (str.length < 2) return false
  return str[0] === str[str.length - 1]
}

function analizarNumeros(todos) {
  const utiles   = todos.filter(cumpleFiltro).sort((a, b) => a - b)
  const noUtiles = todos.filter(n => !cumpleFiltro(n)).sort((a, b) => a - b)
  const noUtil   = noUtiles.length
  const pct      = todos.length > 0 ? ((utiles.length / todos.length) * 100).toFixed(1) : 0

  // guardar en variable global para el export
  numerosUtiles = utiles

  document.getElementById('stat-total').textContent  = todos.length
  document.getElementById('stat-utiles').textContent = utiles.length
  document.getElementById('stat-no').textContent     = noUtil
  document.getElementById('stat-pct').textContent    = pct + '%'
  document.getElementById('badge-util').textContent  = utiles.length + ' útiles'
  document.getElementById('badge-no').textContent    = noUtil + ' no útiles'

  const bar   = document.getElementById('pct-bar')
  const label = document.getElementById('pct-label')
  bar.style.width = pct + '%'
  label.innerHTML = `<span style="color:var(--blanco);font-weight:600">${utiles.length} de ${todos.length}</span> números son útiles &nbsp;<span style="font-family:'DM Serif Display',serif;font-size:1.1rem;color:var(--dorado)">${pct}%</span>`

  document.getElementById('card-stats').style.display = 'block'
  document.getElementById('msg-servidor').textContent = ''
  document.getElementById('msg-servidor').className  = 'server-msg'

  renderFiltrados(utiles, noUtiles)

  document.getElementById('resultados-wrap').style.display = 'block'
  document.getElementById('resultados-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function renderFiltrados(utiles, noUtiles) {
  const contenedor = document.getElementById('filtrados-lista')

  const chipsUtiles = utiles.length
    ? '<div class="chips-wrap">' +
        utiles.map((n, i) => {
          const str    = String(Math.abs(n))
          const inicio = str[0]
          const fin    = str[str.length - 1]
          const medio  = str.slice(1, -1)
          return `<div class="chip chip--util" style="animation-delay:${i * 0.03}s">
            <span class="chip-index">${i + 1}</span>
            <span class="chip-val">
              <span class="chip-digit--match">${n < 0 ? '-' : ''}${inicio}</span><span class="chip-mid">${medio}</span><span class="chip-digit--match">${fin}</span>
            </span>
          </div>`
        }).join('') +
      '</div>'
    : '<p class="empty-msg">Ningún número cumple el filtro.</p>'

  const chipsNoUtiles = noUtiles.length
    ? '<div class="chips-wrap">' +
        noUtiles.map((n, i) => `
          <div class="chip chip--no" style="animation-delay:${i * 0.03}s">
            <span class="chip-index">${i + 1}</span>
            <span class="chip-val chip-val--no">${n}</span>
          </div>`).join('') +
      '</div>'
    : '<p class="empty-msg">Todos los números son útiles.</p>'

  contenedor.innerHTML = `
    <div class="listas-dobles">
      <div class="lista-bloque">
        <p class="lista-titulo lista-titulo--ok">✓ Cumplen el filtro (${utiles.length})</p>
        ${chipsUtiles}
      </div>
      <div class="lista-bloque">
        <p class="lista-titulo lista-titulo--no">✗ No cumplen (${noUtiles.length})</p>
        ${chipsNoUtiles}
      </div>
    </div>
  `
}

// ═══════════════════════════════════════════════
//  EXPORTAR
// ═══════════════════════════════════════════════

function generarContenidoTxt() {
  return [
    `// Resultado del filtro — números que empiezan y terminan con el mismo dígito`,
    `// Total de útiles: ${numerosUtiles.length}`,
    `// Ordenados ascendente`,
    '',
    ...numerosUtiles.map(String)
  ].join('\n')
}

async function exportarResultado() {
  if (!numerosUtiles.length) {
    const msgEl = document.getElementById('msg-servidor')
    msgEl.textContent = '✗ No hay números útiles para exportar.'
    msgEl.className   = 'server-msg server-msg--error'
    return
  }

  const contenido = generarContenidoTxt()
  const msgEl     = document.getElementById('msg-servidor')

  msgEl.textContent = 'Guardando en servidor...'
  msgEl.className   = 'server-msg'

  try {
    const res  = await fetch('/guardar', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ contenido })
    })
    const data = await res.json()

    if (data.ok) {
      // descarga el archivo
      const blob = new Blob([contenido], { type: 'text/plain' })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `resultado_filtro.txt`
      a.click()
      URL.revokeObjectURL(url)

      msgEl.textContent = `✓ Guardado en servidor: ${data.ruta}`
      msgEl.className   = 'server-msg server-msg--ok'
    } else {
      msgEl.textContent = `✗ Error: ${data.msg}`
      msgEl.className   = 'server-msg server-msg--error'
    }
  } catch {
    msgEl.textContent = '✗ No se pudo conectar con el servidor.'
    msgEl.className   = 'server-msg server-msg--error'
  }
}

function resetear() {
  document.getElementById('resultados-wrap').style.display = 'none'
  document.getElementById('card-stats').style.display      = 'none'
  document.getElementById('err-archivo').textContent = ''
  document.getElementById('file-input').value = ''
  numerosUtiles = []
  window.scrollTo({ top: 0, behavior: 'smooth' })
}