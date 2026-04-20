const form        = document.getElementById('regForm')
const resultPanel = document.getElementById('resultPanel')
const resultContent = document.getElementById('resultContent')


// Campos de texto/number/email
const camposTexto = ['nombre', 'edad', 'email', 'carrera']

camposTexto.forEach(id => {
  const el = document.getElementById(id)

  el.addEventListener('input', () => validarCampo(el))
  el.addEventListener('blur',  () => validarCampo(el))
  el.addEventListener('change', () => validarCampo(el))
})

// esto es p0ara que no te deje poner numerosd
document.getElementById('nombre').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[0-9]/g, '')
})

function validarCampo (el) {
  const errorEl = document.getElementById(`err-${el.id}`)

  // el mensaje de que no se puede tener numeros en el nombre
  if (el.id === 'nombre') {
    const tieneNumeros = /\d/.test(el.value)

    if (tieneNumeros) {
      el.classList.add('invalid')
      el.classList.remove('valid')
      errorEl.textContent = 'El nombre no puede tener números.'
      return false
    }
  }

  if (!el.checkValidity()) {
    el.classList.add('invalid')
    el.classList.remove('valid')
    errorEl.textContent = obtenerMensajeError(el)
    return false
  } else {
    el.classList.remove('invalid')
    el.classList.add('valid')
    errorEl.textContent = ''
    return true
  }
}

function obtenerMensajeError (el) {
  const v = el.validity
  if (v.valueMissing)  return 'Este campo es obligatorio.'
  if (v.typeMismatch)  return 'Formato de correo inválido.'
  if (v.tooShort)      return `Mínimo ${el.minLength} caracteres.`
  if (v.rangeUnderflow) return `El valor mínimo es ${el.min}.`
  if (v.rangeOverflow)  return `El valor máximo es ${el.max}.`
  return 'Valor no válido.'
}

camposTexto.forEach(id => {
  document.getElementById(id).addEventListener('invalid', (e) => {
    e.preventDefault()
    validarCampo(e.target)
  })
})


form.addEventListener('submit', (e) => {
  e.preventDefault()

  let valido = camposTexto.every(id => validarCampo(document.getElementById(id)))

  const turnoSeleccionado = document.querySelector('input[name="turno"]:checked')
  const errTurno = document.getElementById('err-turno')

  if (!turnoSeleccionado) {
    errTurno.textContent = 'Seleccioná un turno.'
    valido = false
  } else {
    errTurno.textContent = ''
  }

  if (!valido) return

  const datos = {
    nombre:   document.getElementById('nombre').value.trim(),
    edad:     document.getElementById('edad').value,
    email:    document.getElementById('email').value.trim(),
    carrera:  document.getElementById('carrera').value,
    turno:    turnoSeleccionado.value,
    materias: Array.from(document.querySelectorAll('input[name="materias"]:checked'))
                   .map(cb => cb.value)
  }

  mostrarResultado(datos)
})

// para resetear
form.addEventListener('reset', () => {
  camposTexto.forEach(id => {
    const el = document.getElementById(id)
    el.classList.remove('valid', 'invalid')
    document.getElementById(`err-${id}`).textContent = ''
  })
  document.getElementById('err-turno').textContent = ''
  resultPanel.hidden = true
})

// mostrar resultadi
function mostrarResultado (datos) {
  const materiasHTML = datos.materias.length > 0
    ? datos.materias.map(m => `<span class="chip">${m}</span>`).join('')
    : '<span style="color:var(--muted);font-weight:400">Ninguna seleccionada</span>'

  resultContent.innerHTML = `
    <div class="result-grid">

      <div class="result-item">
        <div class="ri-label">Nombre completo</div>
        <div class="ri-value">${datos.nombre}</div>
      </div>

      <div class="result-item">
        <div class="ri-label">Edad</div>
        <div class="ri-value">${datos.edad} años</div>
      </div>

      <div class="result-item full">
        <div class="ri-label">Correo electrónico</div>
        <div class="ri-value">${datos.email}</div>
      </div>

      <div class="result-item">
        <div class="ri-label">Carrera</div>
        <div class="ri-value">${datos.carrera}</div>
      </div>

      <div class="result-item">
        <div class="ri-label">Turno</div>
        <div class="ri-value">${datos.turno}</div>
      </div>

      <div class="result-item full">
        <div class="ri-label">Materias cursando</div>
        <div class="ri-value">${materiasHTML}</div>
      </div>

    </div>
  `

  resultPanel.hidden = false
  resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' })
}