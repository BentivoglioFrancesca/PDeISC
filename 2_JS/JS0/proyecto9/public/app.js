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
let nombres = ['Francesca', 'Tomas', 'Agustina']
renderChips('e1-chips', nombres)

function e1Agregar() {
  const val = document.getElementById('e1-input').value.trim()
  if (!val) return
  nombres.push(val)
  document.getElementById('e1-input').value = ''
  renderChips('e1-chips', nombres)
}

function e1Saludar() {
  const saludos = []
  nombres.forEach(nombre => saludos.push(`👋 ¡Hola, ${nombre}!`))
  setResultado('e1-resultado', saludos.join('<br>'), 'ok')
}

// Ejercicio 2
let numeros = [3, 7, 12, 5]
renderChips('e2-chips', numeros)

function e2Agregar() {
  const val = Number(document.getElementById('e2-input').value)
  if (isNaN(val) || document.getElementById('e2-input').value === '') return
  numeros.push(val)
  document.getElementById('e2-input').value = ''
  renderChips('e2-chips', numeros)
}

function e2Doble() {
  const dobles = []
  numeros.forEach(n => dobles.push(n * 2))
  renderChips('e2-resultado-chips', dobles, 'nuevo')
  const lineas = numeros.map((n, i) => `${n} × 2 = <strong>${dobles[i]}</strong>`).join(' &nbsp;|&nbsp; ')
  setResultado('e2-resultado', lineas, 'ok')
}

// Ejercicio 3
let personas = [
  { nombre: 'Martina', edad: 22 },
  { nombre: 'Carlos',  edad: 35 },
  { nombre: 'Laura',   edad: 28 }
]

function renderPersonas() {
  const c = document.getElementById('e3-chips')
  c.innerHTML = ''
  personas.forEach(p => {
    const chip = document.createElement('span')
    chip.className = 'chip'
    chip.textContent = `${p.nombre} (${p.edad})`
    c.appendChild(chip)
  })
}
renderPersonas()

// Funcion para agregar 

function e3Agregar() {
  const nombre = document.getElementById('e3-nombre').value.trim()
  const edad   = Number(document.getElementById('e3-edad').value)
  if (!nombre || !edad) return
  personas.push({ nombre, edad })
  document.getElementById('e3-nombre').value = ''
  document.getElementById('e3-edad').value   = ''
  renderPersonas()
}

// Funcion para mostar

function e3Mostrar() {
  const lineas = []
  personas.forEach(p => lineas.push(` <strong>${p.nombre}</strong> tiene <strong>${p.edad}</strong> años`))
  setResultado('e3-resultado', lineas.join('<br>'), 'ok')
}