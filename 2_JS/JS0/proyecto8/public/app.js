function renderChips(id, array, resaltarFn = null) {
  const c = document.getElementById(id)
  c.innerHTML = ''
  if (!array.length) {
    c.innerHTML = '<span style="color:#bbb;font-style:italic;font-size:0.8rem">Array vacío []</span>'
    return
  }
  array.forEach(item => {
    const chip = document.createElement('span')
    chip.className = 'chip' + (resaltarFn && resaltarFn(item) ? ' resaltado' : '')
    chip.textContent = item
    c.appendChild(chip)
  })
}

function setResultado(id, texto, tipo = '') {
  const el = document.getElementById(id)
  el.textContent = texto
  el.className = 'resultado ' + tipo
}

// Ejercicio 1
let roles = ['usuario', 'editor', 'moderador']
renderChips('e1-chips', roles)

function e1Agregar() {
  const val = document.getElementById('e1-input').value.trim().toLowerCase()
  if (!val) return
  roles.push(val)
  document.getElementById('e1-input').value = ''
  renderChips('e1-chips', roles)
  setResultado('e1-resultado', 'Rol agregado. Ahora verificá si existe "admin".')
}

function e1Verificar() {
  const tiene = roles.includes('admin')
  renderChips('e1-chips', roles, item => item === 'admin')
  if (tiene) {
    setResultado('e1-resultado', ' El array SÍ contiene admin', 'ok')
  } else {
    setResultado('e1-resultado', ' El array NO contiene admin', 'error')
  }
}

// Ejercicio 2
let colores = ['rojo', 'azul', 'amarillo', 'naranja']
renderChips('e2-chips', colores)

// Funcion agrear con get element

function e2Agregar() {
  const val = document.getElementById('e2-input').value.trim().toLowerCase()
  if (!val) return
  colores.push(val)
  document.getElementById('e2-input').value = ''
  renderChips('e2-chips', colores)
  setResultado('e2-resultado', 'Color agregado.')
}

function e2Verificar() {
  const tiene = colores.includes('verde')
  renderChips('e2-chips', colores, item => item === 'verde')
  if (tiene) {
    setResultado('e2-resultado', ' El array SÍ contiene "verde".', 'ok')
  } else {
    setResultado('e2-resultado', ' El array NO contiene "verde". Agregá "verde" y volvé a verificar.', 'error')
  }
}

// Ejercicio 3
let numeros = [5, 10, 15, 20]
renderChips('e3-chips', numeros)

function e3AgregarSiNoExiste() {
  const val = Number(document.getElementById('e3-input').value)
  if (isNaN(val) || document.getElementById('e3-input').value === '') {
    setResultado('e3-resultado', ' Ingresá un número válido.', 'error')
    return
  }
  if (numeros.includes(val)) {
    renderChips('e3-chips', numeros, item => item === val)
    setResultado('e3-resultado', ` El número ${val} YA existe. No se agrega.`, 'error')
  } else {
    numeros.push(val)
    renderChips('e3-chips', numeros, item => item === val)
    setResultado('e3-resultado', ` El número ${val} no existía. Se agregó. Total: ${numeros.length} elementos.`, 'ok')
  }
  document.getElementById('e3-input').value = ''
}