const changeLog = document.getElementById('changeLog')

// Estados constantes 

const INICIAL = {
  1: ['a', 'b', 'c', 'd', 'e'],
  2: ['Ana', 'Luis', 'Pedro', 'Marta'],
  3: ['uno', 'dos', 'tres', 'cuatro', 'cinco']
}

const arrays = {
  1: [...INICIAL[1]],
  2: [...INICIAL[2]],
  3: [...INICIAL[3]]
}

// índices que fueron insertados o modificados (para resaltarlos)
const estados = { 1: {}, 2: {}, 3: {} }

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

function renderArray(ej, destacar = [], tipo = '') {
  const display = document.getElementById(`display-${ej}`)
  const arr = arrays[ej]

  if (arr.length === 0) {
    display.innerHTML = '<p class="placeholder">Array vacío</p>'
    return
  }

  display.innerHTML = arr.map((item, i) => {
    const cls = destacar.includes(i) ? tipo : ''
    return `<span class="array-item ${cls}"><span class="idx">[${i}]</span>${item}</span>`
  }).join('')
}

renderArray(1)
renderArray(2)
renderArray(3)

// ejercicio 1 : elimina 2 desde posición 1
document.getElementById('splice1').addEventListener('click', () => {
  const arr   = arrays[1]
  const antes = `[${arr.join(', ')}]`
  const eliminados = arr.splice(1, 2)
  registrarCambio(1, 'splice(1, 2)', antes, `eliminados: [${eliminados.join(', ')}] → [${arr.join(', ')}]`)
  renderArray(1, [1], 'afectado')
})
document.getElementById('reset1').addEventListener('click', () => {
  arrays[1] = [...INICIAL[1]]
  registrarCambio(1, 'reset', '—', `[${arrays[1].join(', ')}]`)
  renderArray(1)
})

// ejercicio 2 (1, 0, "Carlos"): inserta sin eliminar
document.getElementById('splice2').addEventListener('click', () => {
  const arr   = arrays[2]
  const antes = `[${arr.join(', ')}]`
  arr.splice(1, 0, 'Carlos')
  registrarCambio(2, 'splice(1, 0, "Carlos")', antes, `[${arr.join(', ')}]`)
  renderArray(2, [1], 'nuevo')
})
document.getElementById('reset2').addEventListener('click', () => {
  arrays[2] = [...INICIAL[2]]
  registrarCambio(2, 'reset', '—', `[${arrays[2].join(', ')}]`)
  renderArray(2)
})

// ejercicio 3 (2, 2, "X", "Y"): reemplaza 2 desde posición 2
document.getElementById('splice3').addEventListener('click', () => {
  const arr   = arrays[3]
  const antes = `[${arr.join(', ')}]`
  const eliminados = arr.splice(2, 2, 'X', 'Y')
  registrarCambio(3, 'splice(2, 2, "X", "Y")', antes, `reemplazados: [${eliminados.join(', ')}] → [${arr.join(', ')}]`)
  renderArray(3, [2, 3], 'nuevo')
})
document.getElementById('reset3').addEventListener('click', () => {
  arrays[3] = [...INICIAL[3]]
  registrarCambio(3, 'reset', '—', `[${arrays[3].join(', ')}]`)
  renderArray(3)
})