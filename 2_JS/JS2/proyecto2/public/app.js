//  ESTADO 
let numerosUtiles = []

//  TEMA 
const themeToggle = document.getElementById('theme-toggle')
const themeIcon   = themeToggle.querySelector('.theme-icon')

function aplicarTema(tema) {
  document.documentElement.setAttribute('data-theme', tema)
  themeIcon.textContent = tema === 'dark' ? '☀️' : '🌙'
  localStorage.setItem('tema', tema)
}

themeToggle.addEventListener('click', () => {
  const actual = document.documentElement.getAttribute('data-theme')
  aplicarTema(actual === 'dark' ? 'light' : 'dark')
})

const temaGuardado = localStorage.getItem('tema') || 'dark'
aplicarTema(temaGuardado)

//  DROPZONE 
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
  const file = e.dataTransfer.files[0]
  if (file) procesarArchivo(file)
})

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) procesarArchivo(fileInput.files[0])
})

//  PROCESO ARCHIVO con fileRender asi uso archivos locales 
function procesarArchivo(file) {
  const errEl = document.getElementById('err-archivo')
  errEl.textContent = ''

  if (!file.name.endsWith('.txt')) {
    errEl.textContent = 'Solo se aceptan archivos .txt.'
    return
  }

  const reader = new FileReader()
  reader.onload = e => {
    const lineas = e.target.result
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
  reader.readAsText(file)
}

//  FILTRO con .length 
function cumpleFiltro(n) {
  const str = String(Math.abs(n))
  if (str.length < 2) return false
  return str[0] === str[str.length - 1]
}

//  ANALIZAR 
function analizarNumeros(todos) {
  const utiles = todos.filter(cumpleFiltro).sort((a, b) => a - b)
  const noUtil = todos.length - utiles.length
  const pct    = todos.length > 0 ? ((utiles.length / todos.length) * 100).toFixed(1) : 0

  numerosUtiles = utiles

  document.getElementById('stat-total').textContent  = todos.length
  document.getElementById('stat-utiles').textContent = utiles.length
  document.getElementById('stat-no').textContent     = noUtil
  document.getElementById('stat-pct').textContent    = pct + '%'
  document.getElementById('badge-util').textContent  = utiles.length + ' útiles'
  document.getElementById('badge-no').textContent     = (todos.length - utiles.length) + ' no útiles'

  const bar   = document.getElementById('pct-bar')
  const label = document.getElementById('pct-label')
  bar.style.width   = pct + '%'
  label.innerHTML   = `<span style="color:var(--blanco);font-weight:600">${utiles.length} de ${todos.length}</span> números son útiles &nbsp;<span style="font-family:'DM Serif Display',serif;font-size:1.1rem;color:var(--dorado)">${pct}%</span>`

  document.getElementById('card-stats').style.display = 'block'

  // limpiar mensaje servidor
  document.getElementById('msg-servidor').textContent = ''
  document.getElementById('msg-servidor').className   = 'server-msg'

  const noUtiles = todos.filter(n => !cumpleFiltro(n)).sort((a, b) => a - b)
  renderFiltrados(utiles, noUtiles)

  document.getElementById('resultados-wrap').style.display = 'block'
  document.getElementById('resultados-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' })
}

//  RENDER LISTA FILTRADA 
function renderFiltrados(utiles, noUtiles) {
  const contenedor = document.getElementById('filtrados-lista')

  // bloque de chips para útiles
  const chipsUtiles = utiles.length
    ? '<div class="chips-wrap">' +
        utiles.map((n, i) => {
          const str     = String(Math.abs(n))
          const primero = str[0]
          const ultimo  = str[str.length - 1]
          const medio   = str.slice(1, -1)
          return `<div class="chip chip--util" style="animation-delay:${i * 0.03}s">
            <span class="chip-index">${i + 1}</span>
            <span class="chip-val">
              <span class="chip-digit--match">${n < 0 ? '-' : ''}${primero}</span><span class="chip-mid">${medio}</span><span class="chip-digit--match">${ultimo}</span>
            </span>
          </div>`
        }).join('') +
      '</div>'
    : '<p class="empty-msg">Ningún número cumple el filtro.</p>'

  // bloque de chips para no útiles
  const chipsNoUtiles = noUtiles.length
    ? '<div class="chips-wrap">' +
        noUtiles.map((n, i) => `
          <div class="chip chip--no" style="animation-delay:${i * 0.03}s">
            <span class="chip-index">${i + 1}</span>
            <span class="chip-val chip-val--no">${n}</span>
          </div>`
        ).join('') +
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

//  GENERAR CONTENIDO TXT con join para dar texto por linea
function generarContenidoTxt() {
  return [
    `// Resultado del filtro — números que empiezan y terminan con el mismo dígito`,
    `// Total de útiles: ${numerosUtiles.length}`,
    `// Ordenados ascendente`,
    '',
    ...numerosUtiles.map(String)
  ].join('\n')
}

//  GUARDAR EN SERVIDOR 
async function guardarEnServidor() {
  const contenido = generarContenidoTxt()
  const msgEl     = document.getElementById('msg-servidor')

  msgEl.textContent = 'Guardando...'
  msgEl.className   = 'server-msg'

// hago un fetch con post para transformarlo en json 

  try {
    const res  = await fetch('/guardar', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ contenido, nombre: 'resultado_filtro.txt' })
    })
    const data = await res.json()

    if (data.ok) {
      msgEl.textContent = `✓ Guardado en el servidor: ${data.ruta}`
      msgEl.className   = 'server-msg server-msg--ok'
    } else {
      msgEl.textContent = `✗ Error: ${data.msg}`
      msgEl.className   = 'server-msg server-msg--error'
    }
  } catch (err) {
    msgEl.textContent = '✗ No se pudo conectar con el servidor.'
    msgEl.className   = 'server-msg server-msg--error'
  }
}

//  DESCARGAR TXT conviertiendolo en un archivo de memoria 
function exportarResultado() {
  if (!numerosUtiles.length) return
  const blob = new Blob([generarContenidoTxt()], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = 'resultado_filtro.txt'
  a.click()
  // esta es la URL temporal 
  URL.revokeObjectURL(url)
}

//  RESETEAR 
function resetear() {
  document.getElementById('resultados-wrap').style.display = 'none'
  document.getElementById('card-stats').style.display      = 'none'
  document.getElementById('err-archivo').textContent = ''
  document.getElementById('file-input').value = ''
  numerosUtiles = []
  window.scrollTo({ top: 0, behavior: 'smooth' })
}