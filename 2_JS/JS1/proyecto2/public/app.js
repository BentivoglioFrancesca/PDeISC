let items = []
let metodoActual = 'push'

// seleccion de metodo 
const descripciones = {
  push:    'push() — agrega el nuevo elemento al <strong>final</strong> del array.',
  unshift: 'unshift() — agrega el nuevo elemento al <strong>inicio</strong> del array.',
  splice:  'splice(1, 0, item) — inserta en la <strong>posición 1</strong> del array.',
  spread:  '[ item, ...arr ] — crea un <strong>nuevo array</strong> con el ítem adelante (spread operator).',
  concat:  'arr.concat([ item ]) — <strong>concatena</strong> un array de un elemento al final y devuelve uno nuevo.'
}

document.querySelectorAll('.btn-metodo').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn-metodo').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    metodoActual = btn.dataset.metodo
    document.getElementById('metodo-desc').innerHTML = descripciones[metodoActual]
  })
})

// campos y validaciones 
const campos = ['nombre', 'categoria', 'precio', 'stock', 'marca', 'origen', 'disponible', 'descripcion']

function leerCampos() {
  return {
    nombre:      document.getElementById('nombre').value.trim(),
    categoria:   document.getElementById('categoria').value,
    precio:      document.getElementById('precio').value,
    stock:       document.getElementById('stock').value,
    marca:       document.getElementById('marca').value.trim(),
    origen:      document.getElementById('origen').value.trim(),
    disponible:  document.getElementById('disponible').value,
    descripcion: document.getElementById('descripcion').value.trim()
  }
}

function validarCampos(d) {
  let valido = true
  const errores = {}

  if (!d.nombre)      { errores.nombre = 'Requerido.';                valido = false }
  if (!d.categoria)   { errores.categoria = 'Seleccioná una categoría.'; valido = false }
  if (!d.precio || isNaN(d.precio) || Number(d.precio) < 0) {
    errores.precio = 'Precio inválido.'; valido = false
  }
  if (!d.stock || isNaN(d.stock) || Number(d.stock) < 0) {
    errores.stock = 'Stock inválido.'; valido = false
  }
  if (!d.marca)       { errores.marca = 'Requerido.';                valido = false }
  if (!d.origen)      { errores.origen = 'Requerido.';               valido = false }
  if (!d.disponible)  { errores.disponible = 'Seleccioná disponibilidad.'; valido = false }
  if (!d.descripcion) { errores.descripcion = 'Requerido.';          valido = false }

  // Mostrar errores y clases en cada campo
  campos.forEach(id => {
    const el    = document.getElementById(id)
    const errEl = document.getElementById('err-' + id)
    if (errores[id]) {
      el.classList.add('invalido');  el.classList.remove('valido')
      errEl.textContent = errores[id]
    } else {
      el.classList.remove('invalido'); el.classList.add('valido')
      errEl.textContent = ''
    }
  })

  return valido
}

// bloqueo de letras donde van numeros 
// solo permite letras 
const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]$/

;['nombre', 'origen', 'marca'].forEach(id => {
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



// el almacen segun el metodo relacionado
function almacenar(item) {
  let codeStr = ''

  switch (metodoActual) {
    case 'push':
      items.push(item)
      codeStr = `items.push(item)\n// item insertado al FINAL\n// items.length = ${items.length}`
      break

    case 'unshift':
      items.unshift(item)
      codeStr = `items.unshift(item)\n// item insertado al INICIO\n// items.length = ${items.length}`
      break

    case 'splice':
      items.splice(1, 0, item)
      codeStr = `items.splice(1, 0, item)\n// item insertado en posición 1\n// items.length = ${items.length}`
      break

    case 'spread':
      items = [item, ...items]
      codeStr = `items = [item, ...items]\n// nuevo array creado con item al inicio\n// items.length = ${items.length}`
      break

    case 'concat':
      items = items.concat([item])
      codeStr = `items = items.concat([ item ])\n// nuevo array devuelto por concat()\n// items.length = ${items.length}`
      break
  }

  return codeStr
}

// para agregar un item 
function agregarItem() {
  const datos = leerCampos()
  if (!validarCampos(datos)) {
    mostrarAlerta('resultado-form', false, '❌ Revisá los campos marcados en rojo.')
    return
  }

  const item = {
    ...datos,
    precio: parseFloat(datos.precio),
    stock:  parseInt(datos.stock),
    metodo: metodoActual,
    id:     Date.now()
  }

  const codeStr = almacenar(item)
  actualizarCodigoArray(codeStr)
  renderItems()
  mostrarAlerta('resultado-form', true, `✅ <strong>${item.nombre}</strong> guardado con <code>${metodoActual}()</code>.`)
  limpiarForm()
}

function mostrarAlerta(id, ok, html) {
  const el = document.getElementById(id)
  el.innerHTML = `<div class="alert alert--${ok ? 'ok' : 'error'}">${html}</div>`
}

// actualizar el array (codigo)
function actualizarCodigoArray(metodoCode) {
  document.getElementById('count-badge').textContent = `${items.length} ítem${items.length !== 1 ? 's' : ''}`

  const preview = items.slice(0, 5).map((it, i) =>
    `  [${i}] { nombre: "${it.nombre}", precio: $${it.precio}, categoría: "${it.categoria}" }`
  ).join('\n')

  const mas = items.length > 5 ? `\n  ... y ${items.length - 5} más` : ''

  document.getElementById('array-code').textContent =
`// Método usado: ${metodoCode}

items = [
${preview}${mas}
]`
}

// render listado 
function renderItems() {
  const c = document.getElementById('lista-items')
  if (!items.length) {
    c.innerHTML = '<p class="empty-msg">No hay ítems todavía.</p>'
    return
  }

  const disponibleLabel = { si: '✅ Disponible', no: '❌ Sin stock', encargo: '📦 Por encargo' }

  c.innerHTML = '<div class="item-grid">' +
    items.map((it, i) => `
      <div class="item-card">
        <div class="item-num">${i + 1}</div>
        <div>
          <div class="item-nombre">${it.nombre}</div>
          <div class="item-detalle">
            <span class="tag">${it.categoria}</span>
            <span class="tag">${it.marca}</span>
            <span class="tag">${it.origen}</span>
            <span class="tag">${disponibleLabel[it.disponible] || it.disponible}</span>
            Stock: ${it.stock} u.
          </div>
          <div class="item-detalle" style="margin-top:3px">${it.descripcion}</div>
        </div>
        <div style="text-align:right">
          <div class="item-precio">$${it.precio.toLocaleString('es-AR')}</div>
          <div class="item-metodo">${it.metodo}()</div>
        </div>
      </div>
    `).join('') +
  '</div>'
}

// para limpiar el form
function limpiarForm() {
  campos.forEach(id => {
    const el = document.getElementById(id)
    el.value = ''
    el.classList.remove('valido', 'invalido')
    document.getElementById('err-' + id).textContent = ''
  })
}