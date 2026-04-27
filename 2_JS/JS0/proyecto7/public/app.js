const changeLog = document.getElementById('changeLog')

// Estados constantes 

const arrays = {
  1: ['gato', 'perro', 'conejo', 'tortuga', 'loro'],
  2: [10, 25, 50, 75, 100],
  3: ['Buenos Aires', 'Madrid', 'Roma', 'París', 'Tokyo']
}

// Para los cambios 

function registrarCambio(ej, metodo, resultado) {
  const li = document.createElement('li')
  li.innerHTML =
    `<span class="log-ej">[ej ${ej}]</span> ` +
    `<span class="log-attr">${metodo}</span> → ` +
    `<span class="log-desp">${resultado}</span>`
  changeLog.prepend(li)
  while (changeLog.children.length > 30) changeLog.removeChild(changeLog.lastChild)
}

// Render 

function renderArray(ej, indiceEncontrado = -1) {
  const display = document.getElementById(`display-${ej}`)
  const arr = arrays[ej]
  display.innerHTML = arr.map((item, i) => {
    const cls = i === indiceEncontrado ? 'encontrado' : ''
    return `<span class="array-item ${cls}"><span class="idx">[${i}]</span>${item}</span>`
  }).join('')
}

// Aca se muestran los resultados 

function mostrarResultado(ej, texto, encontrado) {
  const panel = document.getElementById(`result${ej}`)
  const p     = document.getElementById(`result-text-${ej}`)
  panel.style.display = 'block'
  panel.className = encontrado ? 'panel panel--result' : 'panel panel--result no-encontrado'
  p.textContent = texto
  p.className   = encontrado ? 'result-text ok' : 'result-text fail'
}

renderArray(1)
renderArray(2)
renderArray(3)

// EJ 1
document.getElementById('find1').addEventListener('click', () => {
  const arr = arrays[1]
  const idx = arr.indexOf('perro')
  renderArray(1, idx)
  mostrarResultado(1, idx !== -1 ? `"perro" está en el índice ${idx}` : '"perro" no está en el array', idx !== -1)
  registrarCambio(1, 'indexOf("perro")', idx !== -1 ? `índice: ${idx}` : 'no encontrado (-1)')
})
document.getElementById('reset1').addEventListener('click', () => {
  renderArray(1)
  document.getElementById('result1').style.display = 'none'
})

// EJ 2
document.getElementById('find2').addEventListener('click', () => {
  const arr = arrays[2]
  const idx = arr.indexOf(50)
  renderArray(2, idx)
  mostrarResultado(2, idx !== -1 ? `El número 50 está en el índice ${idx}` : 'El número 50 no está en el array', idx !== -1)
  registrarCambio(2, 'indexOf(50)', idx !== -1 ? `índice: ${idx}` : 'no encontrado (-1)')
})
document.getElementById('reset2').addEventListener('click', () => {
  renderArray(2)
  document.getElementById('result2').style.display = 'none'
})

// EJ 3
document.getElementById('find3').addEventListener('click', () => {
  const arr = arrays[3]
  const idx = arr.indexOf('Madrid')
  renderArray(3, idx)
  mostrarResultado(3, idx !== -1 ? `"Madrid" está en el índice ${idx}` : '"Madrid" no está en el array de ciudades', idx !== -1)
  registrarCambio(3, 'indexOf("Madrid")', idx !== -1 ? `índice: ${idx}` : 'no encontrado (-1)')
})
document.getElementById('reset3').addEventListener('click', () => {
  renderArray(3)
  document.getElementById('result3').style.display = 'none'
})