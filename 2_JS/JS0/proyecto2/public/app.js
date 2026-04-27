const changeLog = document.getElementById('changeLog')

//  ESTADOS INICIALES 
const INICIAL = {
  1: ['perro', 'gato', 'conejo', 'tortuga', 'loro'],
  2: ['leche', 'pan', 'arroz', 'fideos', 'aceite'],
  3: ['item A', 'item B', 'item C', 'item D', 'item E']
}

const arrays = {
  1: [...INICIAL[1]],
  2: [...INICIAL[2]],
  3: [...INICIAL[3]]
}

//  LOG 
function registrarCambio(ej, metodo, antes, despues) {
  const li = document.createElement('li')
  li.innerHTML =
    `<span class="log-ej">[ej ${ej}]</span> ` +
    `<span class="log-attr">${metodo}</span> | ` +
    `<span class="log-antes">${antes}</span> → ` +
    `<span class="log-desp">${despues}</span>`
  changeLog.prepend(li)
  while (changeLog.children.length > 30) changeLog.removeChild(changeLog.lastChild)
}

//  RENDER 
function renderArray(ej) {
  const display = document.getElementById(`display-${ej}`)
  const arr = arrays[ej]

  if (arr.length === 0) {
    display.innerHTML = '<p class="placeholder">Array vacío</p>'
    return
  }

  display.innerHTML = arr.map((item, i) => {
    const esUltimo = i === arr.length - 1 ? 'ultimo' : ''
    return `<span class="array-item ${esUltimo}"><span class="idx">[${i}]</span>${item}</span>`
  }).join('')
}

// render inicial
renderArray(1)
renderArray(2)
renderArray(3)

//  EJ 1 — pop() animales 
document.getElementById('pop1-pop').addEventListener('click', () => {
  const arr = arrays[1]
  if (arr.length === 0) {
    alert('El array ya está vacío')
    return
  }
  const antes     = `[${arr.join(', ')}]`
  const eliminado = arr.pop()
  registrarCambio(1, 'pop()', antes, `eliminado: "${eliminado}" → [${arr.join(', ')}]`)
  renderArray(1)
})

document.getElementById('pop1-reset').addEventListener('click', () => {
  arrays[1] = [...INICIAL[1]]
  registrarCambio(1, 'reset', '—', `[${arrays[1].join(', ')}]`)
  renderArray(1)
})

//  EJ 2 — pop() compras + mostrar eliminado 
document.getElementById('pop2-pop').addEventListener('click', () => {
  const arr = arrays[2]
  if (arr.length === 0) {
    alert('La lista de compras ya está vacía')
    return
  }
  const antes     = `[${arr.join(', ')}]`
  const eliminado = arr.pop()

  // mostrar el panel de eliminado
  const panel   = document.getElementById('eliminado-panel')
  const display = document.getElementById('eliminado-display')
  panel.style.display = 'block'
  display.textContent = `"${eliminado}" fue eliminado`

  registrarCambio(2, 'pop()', antes, `eliminado: "${eliminado}" → [${arr.join(', ')}]`)
  renderArray(2)
})

document.getElementById('pop2-reset').addEventListener('click', () => {
  arrays[2] = [...INICIAL[2]]
  document.getElementById('eliminado-panel').style.display = 'none'
  registrarCambio(2, 'reset', '—', `[${arrays[2].join(', ')}]`)
  renderArray(2)
})

//  EJ 3 — while + pop() vaciar todo 
document.getElementById('pop3-vaciar').addEventListener('click', () => {
  const arr   = arrays[3]
  if (arr.length === 0) {
    alert('El array ya está vacío')
    return
  }

  const antes = `[${arr.join(', ')}]`
  const eliminados = []

  // simulación del while con pop()
  while (arr.length > 0) {
    eliminados.push(arr.pop())
  }

  registrarCambio(3, 'while + pop()', antes, `eliminados en orden: [${eliminados.join(', ')}] → []`)
  renderArray(3)
})

document.getElementById('pop3-reset').addEventListener('click', () => {
  arrays[3] = [...INICIAL[3]]
  registrarCambio(3, 'reset', '—', `[${arrays[3].join(', ')}]`)
  renderArray(3)
})