const changeLog = document.getElementById('changeLog')

// Estados constantes 

const arrays = {
  1: [10, 20, 30, 40, 50, 60],
  2: ['Inception', 'Matrix', 'Interstellar', 'Avatar', 'Dune'],
  3: ['mango', 'pera', 'uva', 'kiwi', 'melón', 'durazno']
}

function registrarCambio(ej, metodo, original, copia) {
  const li = document.createElement('li')
  li.innerHTML =
    `<span class="log-ej">[ej ${ej}]</span> ` +
    `<span class="log-attr">${metodo}</span> | ` +
    `original: <span class="log-antes">[${original.join(', ')}]</span> → ` +
    `copia: <span class="log-desp">[${copia.join(', ')}]</span>`
  changeLog.prepend(li)
  while (changeLog.children.length > 30) changeLog.removeChild(changeLog.lastChild)
}

// Render original

function renderOriginal(ej, destacarDesde, destacarHasta) {
  const display = document.getElementById(`display-${ej}`)
  const arr = arrays[ej]
  display.innerHTML = arr.map((item, i) => {
    const estaEnRango = i >= destacarDesde && i < destacarHasta
    return `<span class="array-item ${estaEnRango ? 'destacado' : ''}"><span class="idx">[${i}]</span>${item}</span>`
  }).join('')
}

// Render que es una copia del original 

function renderCopia(ej, copia) {
  const panel   = document.getElementById(`result${ej}`)
  const display = document.getElementById(`result-display-${ej}`)
  panel.style.display = 'block'
  display.innerHTML = copia.map((item, i) =>
    `<span class="array-item copia"><span class="idx">[${i}]</span>${item}</span>`
  ).join('')
}

// render iniciales sin destacado
renderOriginal(1, -1, -1)
renderOriginal(2, -1, -1)
renderOriginal(3, -1, -1)

// EJ 1 — slice(0, 3)
document.getElementById('slice1').addEventListener('click', () => {
  const arr  = arrays[1]
  const copia = arr.slice(0, 3)
  registrarCambio(1, 'slice(0, 3)', arr, copia)
  renderOriginal(1, 0, 3)
  renderCopia(1, copia)
})
document.getElementById('reset1').addEventListener('click', () => {
  document.getElementById('result1').style.display = 'none'
  renderOriginal(1, -1, -1)
  registrarCambio(1, 'reset', arrays[1], [])
})

// EJ 2 — slice(2, 4)
document.getElementById('slice2').addEventListener('click', () => {
  const arr  = arrays[2]
  const copia = arr.slice(2, 4)
  registrarCambio(2, 'slice(2, 4)', arr, copia)
  renderOriginal(2, 2, 4)
  renderCopia(2, copia)
})
document.getElementById('reset2').addEventListener('click', () => {
  document.getElementById('result2').style.display = 'none'
  renderOriginal(2, -1, -1)
  registrarCambio(2, 'reset', arrays[2], [])
})

// EJ 3 — slice(-3)
document.getElementById('slice3').addEventListener('click', () => {
  const arr   = arrays[3]
  const copia = arr.slice(-3)
  registrarCambio(3, 'slice(-3)', arr, copia)
  renderOriginal(3, arr.length - 3, arr.length)
  renderCopia(3, copia)
})
document.getElementById('reset3').addEventListener('click', () => {
  document.getElementById('result3').style.display = 'none'
  renderOriginal(3, -1, -1)
  registrarCambio(3, 'reset', arrays[3], [])
})