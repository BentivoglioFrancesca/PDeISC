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
let nums1 = [10, 5, 20, 3, 8]
renderChips('e1-chips', nums1)

function e1Agregar() {
  const val = Number(document.getElementById('e1-input').value)
  if (isNaN(val) || document.getElementById('e1-input').value === '') return
  nums1.push(val)
  document.getElementById('e1-input').value = ''
  renderChips('e1-chips', nums1)
}

function e1Sumar() {
  const total = nums1.reduce((acc, n) => acc + n, 0)
  const pasos = nums1.map((n, i) => {
    const acc = nums1.slice(0, i + 1).reduce((a, b) => a + b, 0)
    return `+${n} = ${acc}`
  }).join(' → ')
  setResultado('e1-resultado', `reduce((acc, n) => acc + n, 0)<br>Pasos: 0 → ${pasos}<br><strong>Total: ${total}</strong>`, 'ok')
}

// Ejercicio 2
let nums2 = [2, 3, 4, 5]
renderChips('e2-chips', nums2)

function e2Agregar() {
  const val = parseInt(document.getElementById('e2-input').value)
  if (isNaN(val) || document.getElementById('e2-input').value === '') return
  nums2.push(val)
  document.getElementById('e2-input').value = ''
  renderChips('e2-chips', nums2)
}

function e2Multiplicar() {
  const total = nums2.reduce((acc, n) => acc * n, 1)
  const pasos = nums2.map((n, i) => {
    const acc = nums2.slice(0, i + 1).reduce((a, b) => a * b, 1)
    return `×${n} = ${acc}`
  }).join(' → ')
  setResultado('e2-resultado', `reduce((acc, n) => acc * n, 1)<br>Pasos: 1 → ${pasos}<br><strong>Resultado: ${total}</strong>`, 'ok')
}

// Ejercicio 3
let productos = [
  { producto: 'Teclado', precio: 3500 },
  { producto: 'Mouse',   precio: 1800 },
  { producto: 'Monitor', precio: 25000 }
]

// Render de los productos


function renderProductos() {
  const c = document.getElementById('e3-chips')
  c.innerHTML = ''
  productos.forEach(p => {
    const chip = document.createElement('span')
    chip.className = 'chip'
    chip.textContent = `${p.producto}: $${p.precio}`
    c.appendChild(chip)
  })
}
renderProductos()

function e3Agregar() {
  const prod   = document.getElementById('e3-prod').value.trim()
  const precio = Number(document.getElementById('e3-precio').value)
  if (!prod || !precio || precio <= 0) return
  productos.push({ producto: prod, precio })
  document.getElementById('e3-prod').value   = ''
  document.getElementById('e3-precio').value = ''
  renderProductos()
}

function e3Total() {
  const total = productos.reduce((acc, item) => acc + item.precio, 0)
  const lineas = productos.map(p => `${p.producto}: $${p.precio}`).join('<br>')
  setResultado('e3-resultado', `reduce((acc, item) => acc + item.precio, 0)<br>${lineas}<br><strong>Total: $${total.toLocaleString('es-AR')}</strong>`, 'ok')
}