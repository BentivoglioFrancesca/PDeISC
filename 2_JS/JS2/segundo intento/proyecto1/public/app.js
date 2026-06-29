let numeros = []
const MIN = 10
const MAX = 20

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

function agregarNumero() {
  const input = document.getElementById('numero-input')
  const errEl = document.getElementById('err-numero')
  const valor = input.value.trim()

  errEl.textContent = ''
  input.classList.remove('invalido')

  if (valor === '' || isNaN(valor)) {
    errEl.textContent = 'Ingresá un número válido.'
    input.classList.add('invalido')
    input.focus()
    return
  }
  if (numeros.length >= MAX) {
    errEl.textContent = `Ya llegaste al máximo de ${MAX} números.`
    input.classList.add('invalido')
    return
  }

  numeros.push(Number(valor))
  input.value = ''
  input.focus()
  actualizarUI()
}

document.getElementById('numero-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') agregarNumero()
})

function eliminarNumero(index) {
  numeros.splice(index, 1)
  actualizarUI()
}

function actualizarUI() {
  const count = numeros.length
  const pct   = Math.min((count / MAX) * 100, 100)
  const listo = count >= MIN

  document.getElementById('counter').textContent = count

  const bar   = document.getElementById('progress-bar')
  const label = document.getElementById('progress-label')
  bar.style.width = pct + '%'
  bar.className   = 'progress-bar' + (listo ? ' progress-bar--ok' : '')

  if (count < MIN)       label.textContent = `${count} de ${MIN} mínimos`
  else if (count < MAX)  label.textContent = `✓ Mínimo alcanzado — podés agregar ${MAX - count} más`
  else                   label.textContent = `✓ Máximo alcanzado`

  renderLista()

  document.getElementById('btn-limpiar').style.display = count > 0 ? 'inline-flex' : 'none'

  const cardExport = document.getElementById('card-export')
  if (listo) {
    cardExport.style.display = 'block'
    document.getElementById('export-count').textContent = count
  } else {
    cardExport.style.display = 'none'
  }

  const input = document.getElementById('numero-input')
  const btn   = document.getElementById('btn-agregar')
  input.disabled = count >= MAX
  btn.disabled   = count >= MAX
}

function renderLista() {
  const lista = document.getElementById('numeros-lista')
  if (!numeros.length) {
    lista.innerHTML = '<p class="empty-msg">Todavía no agregaste ningún número.</p>'
    return
  }
  lista.innerHTML = '<div class="chips-wrap">' +
    numeros.map((n, i) => `
      <div class="chip" style="animation-delay:${i * 0.04}s">
        <span class="chip-index">${i + 1}</span>
        <span class="chip-val">${n}</span>
        <button class="chip-del" onclick="eliminarNumero(${i})" title="Eliminar">×</button>
      </div>
    `).join('') +
  '</div>'
}

function limpiarTodo() {
  numeros = []
  actualizarUI()
}

function generarContenidoTxt() {
  return numeros.join('\n')
}

async function exportarTxt() {
  if (numeros.length < MIN) return

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
      // descarga con el mismo nombre que quedó guardado en el servidor
      const blob = new Blob([contenido], { type: 'text/plain' })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = data.nombre
      a.click()
      URL.revokeObjectURL(url)

      msgEl.textContent = `✓ Guardado como ${data.nombre}`
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