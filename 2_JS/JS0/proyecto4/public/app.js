const changeLog = document.getElementById('changeLog')

// Estados constantes 

const INICIAL = {
  1: [10, 25, 37, 42, 58],
  2: ['Hola!', 'Cómo estás?', 'Profe', 'Aprobame', 'Chau'],
  3: ['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D', 'Cliente E']
}

const arrays = {
  1: [...INICIAL[1]],
  2: [...INICIAL[2]],
  3: [...INICIAL[3]]
}

// Cambios 

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

function renderArray(ej) {
  const display = document.getElementById(`display-${ej}`)
  const arr = arrays[ej]

  if (arr.length === 0) {
    display.innerHTML = '<p class="placeholder">Array vacío</p>'
    return
  }

  display.innerHTML = arr.map((item, i) => {
    const esPrimero = i === 0 ? 'primero' : ''
    return `<span class="array-item ${esPrimero}"><span class="idx">[${i}]</span>${item}</span>`
  }).join('')
}

renderArray(1)
renderArray(2)
renderArray(3)

// EJ 1
document.getElementById('shift1').addEventListener('click', () => {
  const arr = arrays[1]
  if (arr.length === 0) { alert('El array ya está vacío'); return }
  const antes     = `[${arr.join(', ')}]`
  const eliminado = arr.shift()
  registrarCambio(1, 'shift()', antes, `eliminado: ${eliminado} → [${arr.join(', ')}]`)
  renderArray(1)
})
document.getElementById('reset1').addEventListener('click', () => {
  arrays[1] = [...INICIAL[1]]
  registrarCambio(1, 'reset', '—', `[${arrays[1].join(', ')}]`)
  renderArray(1)
})

// EJ 2
document.getElementById('shift2').addEventListener('click', () => {
  const arr = arrays[2]
  if (arr.length === 0) { alert('No hay mensajes'); return }
  const antes     = `[${arr.join(', ')}]`
  const eliminado = arr.shift()
  registrarCambio(2, 'shift()', antes, `eliminado: "${eliminado}" → [${arr.join(', ')}]`)
  renderArray(2)
})
document.getElementById('reset2').addEventListener('click', () => {
  arrays[2] = [...INICIAL[2]]
  registrarCambio(2, 'reset', '—', `[${arrays[2].join(', ')}]`)
  renderArray(2)
})

// EJ 3 — cola de atención
document.getElementById('shift3').addEventListener('click', () => {
  const arr = arrays[3]
  if (arr.length === 0) { alert('No hay clientes en la cola'); return }
  const antes     = `[${arr.join(', ')}]`
  const atendido  = arr.shift()

  const panel   = document.getElementById('atendido-panel')
  const display = document.getElementById('atendido-display')
  panel.style.display = 'block'
  display.textContent = `${atendido} — en atención`

  registrarCambio(3, 'shift()', antes, `atendiendo: "${atendido}" → [${arr.join(', ')}]`)
  renderArray(3)
})
document.getElementById('reset3').addEventListener('click', () => {
  arrays[3] = [...INICIAL[3]]
  document.getElementById('atendido-panel').style.display = 'none'
  registrarCambio(3, 'reset', '—', `[${arrays[3].join(', ')}]`)
  renderArray(3)
})