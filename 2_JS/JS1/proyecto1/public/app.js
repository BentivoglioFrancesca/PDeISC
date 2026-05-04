//  ESTADO 
let metodoActivo = 1
let pasoActual   = 1

// SELECTOR DE MÉTODO 
document.querySelectorAll('.metodo-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.metodo-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    metodoActivo = parseInt(btn.dataset.metodo)
  })
})

//  NAVEGACIÓN DE PASOS 
function irPaso(numero) {
  if (numero > pasoActual && !validarPaso(pasoActual)) return

  document.getElementById(`step-${pasoActual}`).classList.remove('active')

  const stepActualEl = document.querySelector(`.step[data-step="${pasoActual}"]`)
  if (numero > pasoActual) {
    stepActualEl.classList.remove('active')
    stepActualEl.classList.add('done')
    stepActualEl.querySelector('.step-circle').textContent = '✓'
  } else {
    stepActualEl.classList.remove('active', 'done')
    stepActualEl.querySelector('.step-circle').textContent = pasoActual
  }

  document.querySelectorAll('.step-line').forEach((linea, i) => {
    linea.classList.toggle('done', i < numero - 1)
  })

  pasoActual = numero

  const stepNuevoEl = document.querySelector(`.step[data-step="${pasoActual}"]`)
  stepNuevoEl.classList.remove('done')
  stepNuevoEl.classList.add('active')
  stepNuevoEl.querySelector('.step-circle').textContent = pasoActual

  document.getElementById(`step-${pasoActual}`).classList.add('active')
}

//  VALIDACIONES 
const reglas = {
  nombre:      v => v.trim().length >= 2              || 'El nombre debe tener al menos 2 caracteres',
  apellido:    v => v.trim().length >= 2              || 'El apellido debe tener al menos 2 caracteres',
  dni:         v => /^\d{7,8}$/.test(v.trim())       || 'El DNI debe tener 7 u 8 dígitos',
  fechaNac:    v => {
    if (!v) return 'Ingresá tu fecha de nacimiento'
    const edad = (new Date() - new Date(v)) / (1000 * 60 * 60 * 24 * 365.25)
    return edad >= 18 || 'Debés tener al menos 18 años'
  },
  tipoCuenta:  () => !!document.querySelector('input[name="tipoCuenta"]:checked') || 'Seleccioná un tipo de cuenta',
  email:       v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Ingresá un email válido',
  telefono:    v => v.trim().length >= 8              || 'Ingresá un teléfono válido',
  ingreso:     v => parseFloat(v) >= 0               || 'Ingresá un ingreso válido',
  domicilio:   v => v.trim().length >= 5              || 'Ingresá tu domicilio completo',
  ocupacion:   v => v !== ''                          || 'Seleccioná una ocupación',
  usuario:     v => /^[a-z0-9_]{4,}$/.test(v.trim()) || 'Mínimo 4 caracteres, solo letras minúsculas, números y _',
  password:    v => v.length >= 8                    || 'La contraseña debe tener al menos 8 caracteres',
  confirmPass: v => v === document.getElementById('password').value || 'Las contraseñas no coinciden',
}

const camposPorPaso = {
  1: ['nombre', 'apellido', 'dni', 'fechaNac', 'tipoCuenta'],
  2: ['email', 'telefono', 'ingreso', 'domicilio', 'ocupacion'],
  3: ['usuario', 'password', 'confirmPass', 'terminos']
}


function validarCampo(nombre) {
  const regla = reglas[nombre]
  if (!regla) return true

  if (nombre === 'tipoCuenta' || nombre === 'terminos') {
    const resultado = regla()
    const errEl = document.getElementById(`err-${nombre}`)
    if (errEl) errEl.textContent = resultado === true ? '' : resultado
    return resultado === true
  }

  const input     = document.getElementById(nombre)
  if (!input) return true
  const resultado = regla(input.value)
  const errEl     = document.getElementById(`err-${nombre}`)

  if (resultado === true) {
    input.classList.remove('invalido')
    input.classList.add('valido')
    if (errEl) errEl.textContent = ''
    return true
  } else {
    input.classList.remove('valido')
    input.classList.add('invalido')
    if (errEl) errEl.textContent = resultado
    return false
  }
}

// BLOQUEO DE TECLAS EN DNI Y TELÉFONO
// solo permite dígitos (y + para teléfono)
const soloDigitos   = /^\d$/
const digitosTel    = /^[\d+\-\s]$/

;['dni'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) return
    if (['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Home','End'].includes(e.key)) return
    if (!soloDigitos.test(e.key)) e.preventDefault()
  })
})

document.getElementById('telefono').addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) return
  if (['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Home','End'].includes(e.key)) return
  if (!digitosTel.test(e.key)) e.preventDefault()
})

function validarPaso(paso) {
  return camposPorPaso[paso].map(c => validarCampo(c)).every(Boolean)
}

document.querySelectorAll('.campo').forEach(input => {
  input.addEventListener('blur',  () => { if (input.dataset.campo) validarCampo(input.dataset.campo) })
  input.addEventListener('input', () => { if (input.dataset.campo && input.classList.contains('invalido')) validarCampo(input.dataset.campo) })
})

//  BLOQUEO DE TECLAS EN NOMBRE Y APELLIDO 
// solo permite letras 
const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]$/

;['nombre', 'apellido'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', (e) => {
    // permitir teclas de control: backspace, delete, flechas, tab, etc.
    if (e.ctrlKey || e.metaKey) return
    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End'].includes(e.key)) return
    // bloquear si no es letra
    if (!soloLetras.test(e.key)) e.preventDefault()
  })
})

// validar en tiempo real al salir de cada campo
document.querySelectorAll('.campo').forEach(input => {
  input.addEventListener('blur', () => {
    const nombre = input.dataset.campo
    if (nombre) validarCampo(nombre)
  })
  input.addEventListener('input', () => {
    const nombre = input.dataset.campo
    if (nombre && input.classList.contains('invalido')) validarCampo(nombre)
  })
})


//  TOGGLE PASSWORD 
function togglePass(id) {
  const input = document.getElementById(id)
  input.type  = input.type === 'password' ? 'text' : 'password'
}

//  LECTURA — 3 MÉTODOS 

// Leer con GetElementById
// Accede a cada campo por su id único, es la forma mas directa
function leerConGetElementById() {
  return {
    nombre:     document.getElementById('nombre').value,
    apellido:   document.getElementById('apellido').value,
    dni:        document.getElementById('dni').value,
    tipoCuenta: document.querySelector('input[name="tipoCuenta"]:checked')?.value || '',
    email:      document.getElementById('email').value,
    usuario:    document.getElementById('usuario').value,
  }
}

// Leer con FormData
// Usa la API nativa del navegador que lee todos los campos del <form> por su atributo name. 

function leerConFormData() {
  const fd = new FormData(document.getElementById('form-banco'))
  return {
    nombre:     fd.get('nombre'),
    apellido:   fd.get('apellido'),
    dni:        fd.get('dni'),
    tipoCuenta: fd.get('tipoCuenta') || '',
    email:      fd.get('email'),
    usuario:    fd.get('usuario'),
  }
}

// Leer con QuerySelector
// selecciona los campos por el atributo personalizado data-campo 
// Es más flexible porque no depende del id sino de cualquier selector CSS

function leerConQuerySelector() {
  return {
    nombre:     document.querySelector('[data-campo="nombre"]').value,
    apellido:   document.querySelector('[data-campo="apellido"]').value,
    dni:        document.querySelector('[data-campo="dni"]').value,
    tipoCuenta: document.querySelector('input[name="tipoCuenta"]:checked')?.value || '',
    email:      document.querySelector('[data-campo="email"]').value,
    usuario:    document.querySelector('[data-campo="usuario"]').value,
  }
}

//  SUBMIT 
document.getElementById('form-banco').addEventListener('submit', function (e) {
  e.preventDefault()
  if (!validarPaso(3)) return

  const metodos = { 1: leerConGetElementById, 2: leerConFormData, 3: leerConQuerySelector }
  const datos   = metodos[metodoActivo]()
  const nombresMetodo = { 1: 'getElementById', 2: 'FormData API', 3: 'querySelector' }

  document.querySelector('.progress-wrap').style.display = 'none'
  document.getElementById(`step-${pasoActual}`).classList.remove('active')
  document.getElementById('success-panel').style.display = 'block'

  const tiposLabel = {
    'caja-ahorro':      'Caja de Ahorro',
    'cuenta-corriente': 'Cuenta Corriente'
  }

  document.getElementById('success-datos').innerHTML = `
    <div class="sd-item"><div class="sd-label">Nombre</div><div class="sd-val">${datos.nombre} ${datos.apellido}</div></div>
    <div class="sd-item"><div class="sd-label">DNI</div><div class="sd-val">${datos.dni}</div></div>
    <div class="sd-item"><div class="sd-label">Email</div><div class="sd-val">${datos.email}</div></div>
    <div class="sd-item"><div class="sd-label">Tipo de cuenta</div><div class="sd-val">${tiposLabel[datos.tipoCuenta] || datos.tipoCuenta}</div></div>
    <div class="sd-item"><div class="sd-label">Usuario</div><div class="sd-val">@${datos.usuario}</div></div>
    <div class="sd-item"><div class="sd-label">Método JS</div><div class="sd-val">${nombresMetodo[metodoActivo]}</div></div>
  `

  agregarUsuario(datos, nombresMetodo[metodoActivo])
})

//  PANEL DE USUARIOS 
function agregarUsuario(datos, metodo) {
  const lista = document.getElementById('usuarios-lista')
  const empty = lista.querySelector('.usuarios-empty')
  if (empty) empty.remove()

  const iniciales  = (datos.nombre[0] || '') + (datos.apellido[0] || '')
  const tiposLabel = { 'caja-ahorro': 'Caja de Ahorro', 'cuenta-corriente': 'Cuenta Corriente' }

  const card = document.createElement('div')
  card.className = 'usuario-card'
  card.innerHTML = `
    <div class="usuario-avatar">${iniciales.toUpperCase()}</div>
    <div>
      <div class="usuario-nombre">${datos.nombre} ${datos.apellido}</div>
      <div class="usuario-tipo">${tiposLabel[datos.tipoCuenta] || datos.tipoCuenta}</div>
    </div>
    <div class="usuario-metodo">${metodo}</div>
  `
  lista.prepend(card)
}

// PARA HACER UNA NUEVA SOLICITUD 
function nuevaSolicitud() {
  document.getElementById('form-banco').reset()
  document.querySelectorAll('.campo').forEach(input => input.classList.remove('valido', 'invalido'))
  document.querySelectorAll('.err').forEach(el => el.textContent = '')
  document.getElementById('success-panel').style.display = 'none'

  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.remove('active', 'done')
    s.querySelector('.step-circle').textContent = i + 1
  })
  document.querySelectorAll('.step-line').forEach(l => l.classList.remove('done'))
  document.querySelector('.step[data-step="1"]').classList.add('active')
  document.querySelector('.progress-wrap').style.display = 'block'

  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'))
  document.getElementById('step-1').classList.add('active')
  pasoActual = 1
}
