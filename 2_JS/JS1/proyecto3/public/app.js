const LS_KEY = 'almacen_personas'

//  Cargar desde localStorage al iniciar 
let personas = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
renderLista(personas)

//  Toggle campo hijos 
function toggleHijos() {
  const tiene = document.querySelector('input[name="tieneHijos"]:checked')?.value
  const campoHijos = document.getElementById('campo-hijos')
  campoHijos.style.display = tiene === 'si' ? 'flex' : 'none'
  if (tiene !== 'si') document.getElementById('cantHijos').value = ''
}

//  Definición de campos y sus reglas de validación 
const reglas = {
  nombre:      v => v.trim().length >= 2            ? null : 'Mínimo 2 caracteres.',
  apellido:    v => v.trim().length >= 2            ? null : 'Mínimo 2 caracteres.',
  edad:        v => v && +v >= 0 && +v <= 120       ? null : 'Edad entre 0 y 120.',
  fechaNac:    v => v !== ''                         ? null : 'Requerida.',
  documento:   v => /^\d{7,10}$/.test(v.trim())    ? null : 'Solo números, 7-10 dígitos.',
  estadoCivil: v => v !== ''                         ? null : 'Seleccioná una opción.',
  nacionalidad:v => v.trim().length >= 2            ? null : 'Requerida.',
  telefono:    v => v.trim().length >= 6            ? null : 'Teléfono inválido.',
  mail:        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Email inválido.',
}


// bloqueo de letras donde van numeros 
// solo permite letras 
const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]$/

;['nombre', 'apellido', 'nacionalidad', 'localidad' ].forEach(id => {
  document.getElementById(id).addEventListener('keydown', (e) => {
  
    // permitir teclas de control: backspace, delete, flechas y eso
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

// BLOQUEO DE TECLAS EN DNI Y TELÉFONO
// solo permite dígitos (y + para teléfono)
const soloDigitos   = /^\d$/
const digitosTel    = /^[\d+\-\s]$/

;['documento'].forEach(id => {
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

// Validación individual al escribir (eventos input y blur)
Object.keys(reglas).forEach(id => {
  const el = document.getElementById(id)
  if (!el) return
  el.addEventListener('input', () => validarCampo(id))
  el.addEventListener('blur',  () => validarCampo(id))
})

function validarCampo(id) {
  const el  = document.getElementById(id)
  const err = document.getElementById('err-' + id)
  if (!el || !err) return true

  const msg = reglas[id] ? reglas[id](el.value) : null

  if (msg) {
    el.classList.add('invalido');  el.classList.remove('valido')
    err.textContent = msg
    return false
  } else {
    el.classList.remove('invalido'); el.classList.add('valido')
    err.textContent = ''
    return true
  }
}

function validarTodo() {
  let ok = true

  // Campos con reglas
  Object.keys(reglas).forEach(id => {
    if (!validarCampo(id)) ok = false
  })

  // Sexo (radio)
  const sexo = document.querySelector('input[name="sexo"]:checked')
  const errSexo = document.getElementById('err-sexo')
  if (!sexo) {
    errSexo.textContent = 'Seleccioná una opción.'
    ok = false
  } else {
    errSexo.textContent = ''
  }

  // Tiene hijos (radio)
  const tieneHijos = document.querySelector('input[name="tieneHijos"]:checked')
  const errHijos = document.getElementById('err-tieneHijos')
  if (!tieneHijos) {
    errHijos.textContent = 'Indicá si tiene hijos.'
    ok = false
  } else {
    errHijos.textContent = ''
  }

  // Cantidad de hijos (si aplica)
  if (tieneHijos?.value === 'si') {
    const cant = document.getElementById('cantHijos').value
    const errCant = document.getElementById('err-cantHijos')
    if (!cant || +cant < 1) {
      errCant.textContent = 'Ingresá una cantidad válida.'
      document.getElementById('cantHijos').classList.add('invalido')
      ok = false
    } else {
      errCant.textContent = ''
      document.getElementById('cantHijos').classList.remove('invalido')
      document.getElementById('cantHijos').classList.add('valido')
    }
  }

  return ok
}

// GUARDAR persona 
function guardarPersona(event) {
  event.preventDefault()

  if (!validarTodo()) {
    mostrarToast('Revisá los campos marcados en rojo.', 'error')
    return
  }

  const tieneHijos = document.querySelector('input[name="tieneHijos"]:checked').value

  const persona = {
    id:           Date.now(),
    nombre:       document.getElementById('nombre').value.trim(),
    apellido:     document.getElementById('apellido').value.trim(),
    edad:         document.getElementById('edad').value,
    fechaNac:     document.getElementById('fechaNac').value,
    sexo:         document.querySelector('input[name="sexo"]:checked').value,
    documento:    document.getElementById('documento').value.trim(),
    estadoCivil:  document.getElementById('estadoCivil').value,
    nacionalidad: document.getElementById('nacionalidad').value.trim(),
    telefono:     document.getElementById('telefono').value.trim(),
    mail:         document.getElementById('mail').value.trim(),
    tieneHijos,
    cantHijos:    tieneHijos === 'si' ? document.getElementById('cantHijos').value : '—',
    profesion:    document.getElementById('profesion').value.trim() || '—',
    localidad:    document.getElementById('localidad').value.trim() || '—'
  }

  // Verificar DNI duplicado
  const existe = personas.find(p => p.documento === persona.documento)
  if (existe) {
    mostrarToast(` Ya existe una persona con DNI ${persona.documento}.`, 'error')
    document.getElementById('documento').classList.add('invalido')
    document.getElementById('err-documento').textContent = 'Este documento ya está registrado.'
    return
  }

  // Guardar en array y en localStorage
  personas.push(persona)
  localStorage.setItem(LS_KEY, JSON.stringify(personas))

  mostrarToast(` ${persona.nombre} ${persona.apellido} guardado correctamente.`, 'ok')
  renderLista(personas)
  limpiarForm()
}

//  Render lista lateral 
function renderLista(lista) {
  const ul = document.getElementById('persona-lista')
  document.getElementById('total-badge').textContent = personas.length

  if (!lista.length) {
    ul.innerHTML = '<li class="lista-empty">Aún no hay personas guardadas.</li>'
    return
  }

  ul.innerHTML = lista.map(p => `
    <li class="lista-item" onclick="abrirModal(${p.id})">
      <div class="lista-avatar">${p.nombre.charAt(0)}${p.apellido.charAt(0)}</div>
      <div>
        <div class="lista-nombre">${p.nombre} ${p.apellido}</div>
        <div class="lista-sub">${p.nacionalidad} · ${p.edad} años</div>
      </div>
    </li>
  `).join('')
}

//  Buscador 
function filtrarLista() {
  const q = document.getElementById('buscador').value.toLowerCase()
  const filtrado = personas.filter(p =>
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(q)
  )
  renderLista(filtrado)
}

//  Modal de detalle 
function abrirModal(id) {
  const p = personas.find(p => p.id === id)
  if (!p) return

  document.getElementById('modal-contenido').innerHTML = `
    <div class="modal-nombre">${p.nombre} ${p.apellido}</div>
    <div class="modal-sub">DNI ${p.documento} · ${p.mail}</div>
    <div class="modal-grid">
      <div class="modal-item"><div class="mi-label">Edad</div><div class="mi-val">${p.edad} años</div></div>
      <div class="modal-item"><div class="mi-label">Fecha de nac.</div><div class="mi-val">${p.fechaNac}</div></div>
      <div class="modal-item"><div class="mi-label">Sexo</div><div class="mi-val">${p.sexo}</div></div>
      <div class="modal-item"><div class="mi-label">Estado civil</div><div class="mi-val">${p.estadoCivil}</div></div>
      <div class="modal-item"><div class="mi-label">Nacionalidad</div><div class="mi-val">${p.nacionalidad}</div></div>
      <div class="modal-item"><div class="mi-label">Teléfono</div><div class="mi-val">${p.telefono}</div></div>
      <div class="modal-item"><div class="mi-label">Hijos</div><div class="mi-val">${p.tieneHijos === 'si' ? p.cantHijos : 'No'}</div></div>
      <div class="modal-item"><div class="mi-label">Profesión</div><div class="mi-val">${p.profesion}</div></div>
      <div class="modal-item"><div class="mi-label">Localidad</div><div class="mi-val">${p.localidad}</div></div>
    </div>
    <button class="btn--danger-sm" onclick="eliminarPersona(${p.id})">🗑️ Eliminar esta persona</button>
  `
  document.getElementById('overlay').classList.add('open')
  document.getElementById('modal').classList.add('open')
}

function cerrarModal() {
  document.getElementById('overlay').classList.remove('open')
  document.getElementById('modal').classList.remove('open')
}

//  Eliminar una persona 
function eliminarPersona(id) {
  personas = personas.filter(p => p.id !== id)
  localStorage.setItem(LS_KEY, JSON.stringify(personas))
  renderLista(personas)
  cerrarModal()
  mostrarToast(' Persona eliminada.', 'ok')
}

//  Borrar todo 
function borrarTodo() {
  if (!personas.length) return
  if (!confirm('¿Seguro que querés borrar todas las personas guardadas?')) return
  personas = []
  localStorage.removeItem(LS_KEY)
  renderLista(personas)
  mostrarToast(' Todos los datos fueron eliminados.', 'ok')
}

//  Limpiar formulario 
function limpiarForm() {
  document.getElementById('form-persona').reset()
  document.querySelectorAll('input, select').forEach(el => {
    el.classList.remove('valido', 'invalido')
  })
  document.querySelectorAll('.err').forEach(el => el.textContent = '')
  document.getElementById('campo-hijos').style.display = 'none'
}

//  Toast 
function mostrarToast(msg, tipo) {
  const toast = document.getElementById('toast')
  toast.textContent = msg
  toast.className = `toast ${tipo} show`
  setTimeout(() => toast.classList.remove('show'), 3200)
}