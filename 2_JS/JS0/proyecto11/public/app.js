function renderChips(id, array, condicion = null) {
  const c = document.getElementById(id)
  c.innerHTML = ''
  if (!array.length) {
    c.innerHTML = '<span style="color:#bbb;font-style:italic;font-size:0.8rem">[]</span>'
    return
  }
  array.forEach(item => {
    const chip = document.createElement('span')
    const pasa = condicion ? condicion(item) : true
    chip.className = 'chip' + (pasa ? ' resaltado' : ' negativo')
    chip.textContent = item
    c.appendChild(chip)
  })
}

// Render array para los elementos

function renderChipsSimple(id, array, claseExtra = '') {
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

// Resultados 

function setResultado(id, html, tipo = '') {
  const el = document.getElementById(id)
  el.innerHTML = html
  el.className = 'resultado ' + tipo
}

// Ejercicio 1
let nums = [3, 15, 7, 22, 10, 1, 18, 9, 14]
renderChips('e1-orig', nums, n => n > 10)

function e1Agregar() {
  const val = Number(document.getElementById('e1-input').value)
  if (isNaN(val) || document.getElementById('e1-input').value === '') return
  nums.push(val)
  document.getElementById('e1-input').value = ''
  renderChips('e1-orig', nums, n => n > 10)
  renderChipsSimple('e1-filtrado', [])
  setResultado('e1-resultado', '—')
}

function e1Filtrar() {
  const filtrado = nums.filter(n => n > 10)
  renderChips('e1-orig', nums, n => n > 10)
  renderChipsSimple('e1-filtrado', filtrado, 'resaltado')
  setResultado('e1-resultado', `filter(n => n > 10): [${filtrado.join(', ')}] — ${filtrado.length} elemento(s)`, 'ok')
}

// Ejercicio 2
let palabras = ['sol', 'computadora', 'pez', 'pantalla', 'mar', 'teclado']
renderChips('e2-orig', palabras, p => p.length > 5)

function e2Agregar() {
  const val = document.getElementById('e2-input').value.trim().toLowerCase()
  if (!val) return
  palabras.push(val)
  document.getElementById('e2-input').value = ''
  renderChips('e2-orig', palabras, p => p.length > 5)
  renderChipsSimple('e2-filtrado', [])
  setResultado('e2-resultado', '—')
}

function e2Filtrar() {
  const filtrado = palabras.filter(p => p.length > 5)
  renderChips('e2-orig', palabras, p => p.length > 5)
  renderChipsSimple('e2-filtrado', filtrado, 'resaltado')
  const lineas = palabras.map(p => `"${p}" → ${p.length} letras ${p.length > 5 ? '✅' : '❌'}`).join('<br>')
  setResultado('e2-resultado', `filter(p => p.length > 5):<br>${lineas}<br><br>Resultado: [${filtrado.join(', ')}]`, 'ok')
}

// Ejercicio 3
let usuarios = [
  { nombre: 'Ana',   activo: true  },
  { nombre: 'Luis',  activo: false },
  { nombre: 'Sofía', activo: true  },
  { nombre: 'Pedro', activo: false },
  { nombre: 'María', activo: true  }
]

function renderUsuarios() {
  const c = document.getElementById('e3-orig')
  c.innerHTML = ''
  usuarios.forEach(u => {
    const chip = document.createElement('span')
    chip.className = 'chip' + (u.activo ? ' resaltado' : ' negativo')
    chip.textContent = `${u.nombre} ${u.activo ? '✅' : '❌'}`
    c.appendChild(chip)
  })
}
renderUsuarios()

function e3Agregar() {
  const nombre = document.getElementById('e3-nombre').value.trim()
  const activo = document.getElementById('e3-activo').checked
  if (!nombre) return
  usuarios.push({ nombre, activo })
  document.getElementById('e3-nombre').value = ''
  document.getElementById('e3-activo').checked = false
  renderUsuarios()
  renderChipsSimple('e3-filtrado', [])
  setResultado('e3-resultado', '—')
}

function e3Filtrar() {
  const activos = usuarios.filter(u => u.activo)
  const c = document.getElementById('e3-filtrado')
  c.innerHTML = ''
  if (!activos.length) {
    c.innerHTML = '<span style="color:#bbb;font-style:italic;font-size:0.8rem">Ningún usuario activo</span>'
  } else {
    activos.forEach(u => {
      const chip = document.createElement('span')
      chip.className = 'chip resaltado'
      chip.textContent = u.nombre
      c.appendChild(chip)
    })
  }
  setResultado('e3-resultado', `filter(u => u.activo): ${activos.length} usuario(s) activo(s) de ${usuarios.length} en total`, 'ok')
}