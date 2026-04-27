const changeLog = document.getElementById('changeLog')

const INICIAL = {
  1: [],
  2: ['Revisar emails', 'Actualizar doc', 'Deploy viernes'],
  3: ['pedro22', 'lucia_x', 'coach77']
}

const arrays = {
  1: [...INICIAL[1]],
  2: [...INICIAL[2]],
  3: [...INICIAL[3]]
}

// para registrar los cambios 
 
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

// render 

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

document.querySelectorAll('.btn--action').forEach(btn => {
  btn.addEventListener('click', () => {
    const ej    = parseInt(btn.dataset.ej)
    const valor = btn.dataset.valor
    const arr   = arrays[ej]

    const antes = arr.length ? `[${arr.join(', ')}]` : '[]'
    arr.unshift(valor)
    registrarCambio(ej, 'unshift()', antes, `[${arr.join(', ')}]`)
    renderArray(ej)

    const textoOriginal = btn.textContent
    btn.textContent = `✓ "${valor}" al principio`
    setTimeout(() => { btn.textContent = textoOriginal }, 1200)
  })
})

// registrar los cambios
 
document.querySelectorAll('.btn--reset').forEach(btn => {
  btn.addEventListener('click', () => {
    const ej = parseInt(btn.dataset.ej)
    arrays[ej] = [...INICIAL[ej]]
    registrarCambio(ej, 'reset', '—', `[${arrays[ej].join(', ')}]`)
    renderArray(ej)
  })
})