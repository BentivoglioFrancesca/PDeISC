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
let nums1 = [40, 7, 22, 3, 55, 18, 1]
renderChips('e1-orig', nums1)

function e1Agregar() {
  const val = Number(document.getElementById('e1-input').value)
  if (isNaN(val) || document.getElementById('e1-input').value === '') return
  nums1.push(val)
  document.getElementById('e1-input').value = ''
  renderChips('e1-orig', nums1)
  renderChips('e1-ord', [])
  setResultado('e1-resultado', '—')
}

function e1Ordenar() {
  const ordenado = [...nums1].sort((a, b) => a - b)
  renderChips('e1-ord', ordenado, 'nuevo')
  setResultado('e1-resultado', `sort((a, b) => a - b)<br>Original: [${nums1.join(', ')}]<br>Ordenado: [${ordenado.join(', ')}]`, 'ok')
}

function e1Reset() {
  renderChips('e1-ord', [])
  setResultado('e1-resultado', '—')
}

// Ejercicio 2
let palabras = ['banana', 'manzana', 'ananá', 'durazno', 'ciruela']
renderChips('e2-orig', palabras)

function e2Agregar() {
  const val = document.getElementById('e2-input').value.trim().toLowerCase()
  if (!val) return
  palabras.push(val)
  document.getElementById('e2-input').value = ''
  renderChips('e2-orig', palabras)
  renderChips('e2-ord', [])
  setResultado('e2-resultado', '—')
}

function e2Ordenar() {
  const ordenado = [...palabras].sort((a, b) => a.localeCompare(b, 'es'))
  renderChips('e2-ord', ordenado, 'nuevo')
  setResultado('e2-resultado', `sort((a, b) => a.localeCompare(b))<br>Original: [${palabras.join(', ')}]<br>Ordenado: [${ordenado.join(', ')}]`, 'ok')
}

// Resetear 

function e2Reset() {
  renderChips('e2-ord', [])
  setResultado('e2-resultado', '—')
}

// Ejercicio 3
let personas = [
  { nombre: 'Sofía',   edad: 32 },
  { nombre: 'Carlos',  edad: 21 },
  { nombre: 'Martina', edad: 45 },
  { nombre: 'Lucas',   edad: 28 }
]

// Render de personas 

function renderPersonas(id, array) {
  const c = document.getElementById(id)
  c.innerHTML = ''
  if (!array.length) {
    c.innerHTML = '<span style="color:#bbb;font-style:italic;font-size:0.8rem">[]</span>'
    return
  }
  array.forEach(p => {
    const chip = document.createElement('span')
    chip.className = 'chip'
    chip.textContent = `${p.nombre} (${p.edad})`
    c.appendChild(chip)
  })
}
renderPersonas('e3-orig', personas)

// Agregar 

function e3Agregar() {
  const nombre = document.getElementById('e3-nombre').value.trim()
  const edad   = Number(document.getElementById('e3-edad').value)
  if (!nombre || !edad) return
  personas.push({ nombre, edad })
  document.getElementById('e3-nombre').value = ''
  document.getElementById('e3-edad').value   = ''
  renderPersonas('e3-orig', personas)
  renderPersonas('e3-ord', [])
  setResultado('e3-resultado', '—')
}

// Ordenar 

function e3Ordenar() {
  const ordenado = [...personas].sort((a, b) => a.edad - b.edad)
  const c = document.getElementById('e3-ord')
  c.innerHTML = ''
  ordenado.forEach((p, i) => {
    const chip = document.createElement('span')
    chip.className = 'chip nuevo'
    chip.textContent = `${i + 1}. ${p.nombre} (${p.edad})`
    c.appendChild(chip)
  })
  const lineas = ordenado.map((p, i) => `${i + 1}. ${p.nombre} — ${p.edad} años`).join('<br>')
  setResultado('e3-resultado', `sort((a, b) => a.edad - b.edad):<br>${lineas}`, 'ok')
}