const changeLog = document.getElementById('changeLog')

// ─── ESTADOS ────────────────────────────────────────────────
const arrays = {
  1: [],
  2: ['Agustina', 'Antonella'],   // array existente con dos amigos ya cargados
  3: []
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

  display.innerHTML = arr
    .map((item, i) => `<span class="array-item"><span class="idx">[${i}]</span>${item}</span>`)
    .join('')
}

// Render inicial del ej2 (ya tiene elementos)
renderArray(1)
renderArray(2)
renderArray(3)

//  BOTONES CREAR 
document.querySelectorAll('.btn--create').forEach(btn => {
  btn.addEventListener('click', () => {
    const ej    = parseInt(btn.dataset.ej)
    const valor = btn.dataset.valor
    const arr   = arrays[ej]

    // Ej 3: solo agrega si es mayor al último
    if (ej === 3) {
      const num    = parseInt(valor)
      const ultimo = arr.length > 0 ? arr[arr.length - 1] : null

      if (ultimo !== null && num <= ultimo) {
        // Mostrar rechazo visual momentáneo
        const display = document.getElementById(`display-${ej}`)
        const items   = display.querySelectorAll('.array-item')
        if (items.length > 0) {
          items[items.length - 1].classList.add('rechazado')
          setTimeout(() => items[items.length - 1].classList.remove('rechazado'), 400)
        }
        registrarCambio(ej, 'push() rechazado', `último: ${ultimo}`, `${num} ≤ ${ultimo}, no se agrega`)
        btn.textContent = `✗ ${valor} rechazado`
        setTimeout(() => { btn.textContent = `+ ${valor}` }, 1200)
        return
      }

      arr.push(num)
      registrarCambio(ej, 'push()', `último era: ${ultimo ?? '—'}`, `[${arr.join(', ')}]`)

    } else {
      const antes = `[${arr.join(', ')}]`
      arr.push(valor)
      registrarCambio(ej, 'push()', antes, `[${arr.join(', ')}]`)
    }

    renderArray(ej)

    btn.textContent = `✓ ${valor} agregado`
    setTimeout(() => { btn.textContent = `+ ${valor}` }, 1200)
  })
})

// ─── BOTONES RESET ───────────────────────────────────────────
document.querySelectorAll('.btn--reset').forEach(btn => {
  btn.addEventListener('click', () => {
    const ej = parseInt(btn.dataset.ej)
    const antes = `[${arrays[ej].join(', ')}]`

    if (ej === 2) {
      arrays[ej] = ['Carlos', 'Sofía']
    } else {
      arrays[ej] = []
    }

    registrarCambio(ej, 'reset', antes, ej === 2 ? "['Agustina', 'Antonella']" : '[]')
    renderArray(ej)
  })
})