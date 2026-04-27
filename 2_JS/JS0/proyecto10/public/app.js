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
let nums1 = [2, 4, 6, 8, 10]
renderChips('e1-orig', nums1)

// Funcion para agregar 

function e1Agregar() {
  const val = Number(document.getElementById('e1-input').value)
  if (isNaN(val) || document.getElementById('e1-input').value === '') return
  nums1.push(val)
  document.getElementById('e1-input').value = ''
  renderChips('e1-orig', nums1)
  renderChips('e1-nuevo', [])
  setResultado('e1-resultado', '—')
}

function e1Mapear() {
  const triplicados = nums1.map(n => n * 3)
  renderChips('e1-nuevo', triplicados, 'nuevo')
  const lineas = nums1.map((n, i) => `${n} → ${triplicados[i]}`).join(' &nbsp;|&nbsp; ')
  setResultado('e1-resultado', `map(n => n * 3): ${lineas}`, 'ok')
}

// Ejercicio 2
let nombres = ['ana', 'luis', 'sofía', 'pedro']
renderChips('e2-orig', nombres)

function e2Agregar() {
  const val = document.getElementById('e2-input').value.trim().toLowerCase()
  if (!val) return
  nombres.push(val)
  document.getElementById('e2-input').value = ''
  renderChips('e2-orig', nombres)
  renderChips('e2-nuevo', [])
  setResultado('e2-resultado', '—')
}

// Función para cambiar a mayusculas 

function e2Mayusculas() {
  const mayus = nombres.map(n => n.toUpperCase())
  renderChips('e2-nuevo', mayus, 'nuevo')
  const lineas = nombres.map((n, i) => `"${n}" → "<strong>${mayus[i]}</strong>"`).join('<br>')
  setResultado('e2-resultado', `map(n => n.toUpperCase()):<br>${lineas}`, 'ok')
}

// Ejercicio 3
let precios = [100, 250, 580, 1200]
renderChips('e3-orig', precios.map(p => `$${p}`))

function e3Agregar() {
  const val = Number(document.getElementById('e3-input').value)
  if (!val || val <= 0) return
  precios.push(val)
  document.getElementById('e3-input').value = ''
  renderChips('e3-orig', precios.map(p => `$${p}`))
  renderChips('e3-nuevo', [])
  setResultado('e3-resultado', '—')
}

// Funcion del IVA 

function e3IVA() {
  const conIVA = precios.map(p => parseFloat((p * 1.21).toFixed(2)))
  renderChips('e3-nuevo', conIVA.map(p => `$${p}`), 'nuevo')
  const lineas = precios.map((p, i) => `$${p} + 21% = <strong>$${conIVA[i]}</strong>`).join('<br>')
  setResultado('e3-resultado', `map(p => p * 1.21):<br>${lineas}`, 'ok')
}