function renderChips(id, array, claseExtra = '') {
  const c = document.getElementById(id)
  c.innerHTML = ''
  if (!array.length) {
    c.innerHTML = '<span style="color:#bbb;font-style:italic;font-size:0.8rem">[]</span>'
    return
  }
  array.forEach(item => {
    const chip = document.createElement('span')
    chip.className = 'chip ' + claseExtra
    chip.textContent = item
    c.appendChild(chip)
  })
}

// Resultado 

function setResultado(id, html, tipo = '') {
  const el = document.getElementById(id)
  el.innerHTML = html
  el.className = 'resultado ' + tipo
}

// Ejercicio 1
let letras = ['a', 'b', 'c', 'd', 'e']
renderChips('e1-orig', letras)

// Agregar 

function e1Agregar() {
  const val = document.getElementById('e1-input').value.trim()
  if (!val) return
  letras.push(val)
  document.getElementById('e1-input').value = ''
  renderChips('e1-orig', letras)
  renderChips('e1-inv', [])
  setResultado('e1-resultado', '—')
}

// Funcion para invertir 

function e1Invertir() {
  const invertido = [...letras].reverse()
  renderChips('e1-inv', invertido, 'nuevo')
  setResultado('e1-resultado', `[...letras].reverse()<br>Original: [${letras.join(', ')}]<br>Invertido: [${invertido.join(', ')}]`, 'ok')
}

// Funcion para resetear 

function e1Reset() {
  renderChips('e1-inv', [])
  setResultado('e1-resultado', '—')
}

// Ejercicio 2
let nums = [10, 20, 30, 40, 50]
renderChips('e2-orig', nums)

function e2Agregar() {
  const val = Number(document.getElementById('e2-input').value)
  if (isNaN(val) || document.getElementById('e2-input').value === '') return
  nums.push(val)
  document.getElementById('e2-input').value = ''
  renderChips('e2-orig', nums)
  renderChips('e2-inv', [])
  setResultado('e2-resultado', '—')
}

function e2Invertir() {
  const invertido = [...nums].reverse()
  renderChips('e2-inv', invertido, 'nuevo')
  setResultado('e2-resultado', `[...nums].reverse()<br>Original: [${nums.join(', ')}]<br>Invertido: [${invertido.join(', ')}]`, 'ok')
}

function e2Reset() {
  renderChips('e2-inv', [])
  setResultado('e2-resultado', '—')
}

// Ejercicio 3
function e3Revertir() {
  const texto = document.getElementById('e3-input').value
  if (!texto.trim()) {
    setResultado('e3-resultado', ' Escribí algún texto primero.', 'error')
    return
  }
  const arrayLetras = texto.split('')
  const invertido   = [...arrayLetras].reverse()
  const resultado   = invertido.join('')
  const vista = arrayLetras.length > 20 ? [...arrayLetras.slice(0, 20), '...'] : arrayLetras
  renderChips('e3-chips', vista, 'resultado')
  setResultado('e3-resultado', `"${texto}".split('') → reverse() → join('')<br>Resultado: <strong>"${resultado}"</strong>`, 'ok')
}