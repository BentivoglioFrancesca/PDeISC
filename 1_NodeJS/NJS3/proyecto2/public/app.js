
function logEvento (listId, eventoNombre, detalle = '') {
  const ul = document.getElementById(listId)
  const li = document.createElement('li')
  const hora = new Date().toLocaleTimeString('es-AR', { hour12: false })
  li.innerHTML = `[${hora}] <span>${eventoNombre}</span>${detalle ? ' — ' + detalle : ''}`
  ul.prepend(li)
  // Limitar a 20 entradas
  while (ul.children.length > 20) ul.removeChild(ul.lastChild)
}


// componnete 1 eventos de Mouse

const mouseBox   = document.getElementById('mouseBox')
const mouseLabel = document.getElementById('mouseLabel')

const mouseEventos = [
  ['click',       () => { mouseBox.style.background = '#ffe8e5'; logEvento('mouseLog', 'click') }],
  ['dblclick',    () => { mouseBox.style.background = '#e8f5ee'; logEvento('mouseLog', 'dblclick') }],
  ['mouseenter',  () => { mouseBox.classList.add('active');    logEvento('mouseLog', 'mouseenter') }],
  ['mouseleave',  () => { mouseBox.classList.remove('active'); logEvento('mouseLog', 'mouseleave') }],
  ['contextmenu', (e) => { e.preventDefault(); logEvento('mouseLog', 'contextmenu', 'menú bloqueado') }],
  ['mousemove',   (e) => {
    mouseLabel.textContent = `x: ${e.offsetX}  y: ${e.offsetY}`
    logEvento('mouseLog', 'mousemove', `(${e.offsetX}, ${e.offsetY})`)
  }]
]

mouseEventos.forEach(([tipo, handler]) => mouseBox.addEventListener(tipo, handler))


// componente 2 eventos de Teclado

const keyInput   = document.getElementById('keyInput')
const keyDisplay = document.getElementById('keyDisplay')

keyInput.addEventListener('keydown', (e) => {
  keyDisplay.textContent = e.key === ' ' ? '[ ESPACIO ]' : e.key
  keyDisplay.style.transform = 'scale(1.2)'
  logEvento('keyLog', 'keydown', `tecla: "${e.key}"`)
})

keyInput.addEventListener('keyup', (e) => {
  keyDisplay.style.transform = 'scale(1)'
  logEvento('keyLog', 'keyup', `tecla: "${e.key}"`)
})

keyInput.addEventListener('input', (e) => {
  logEvento('keyLog', 'input', `valor actual: "${e.target.value}"`)
})

keyInput.addEventListener('focus', () => logEvento('keyLog', 'focus'))
keyInput.addEventListener('blur',  () => logEvento('keyLog', 'blur'))


// compnente 3 drag & Drop

const dragItem = document.getElementById('dragItem')
const dropZone = document.getElementById('dropZone')

dragItem.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', 'item')
  logEvento('dragLog', 'dragstart')
})

dragItem.addEventListener('dragend', () => logEvento('dragLog', 'dragend'))

dropZone.addEventListener('dragenter', (e) => {
  e.preventDefault()
  dropZone.classList.add('over')
  logEvento('dragLog', 'dragenter')
})

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault()
  logEvento('dragLog', 'dragover')
})

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('over')
  logEvento('dragLog', 'dragleave')
})

dropZone.addEventListener('drop', (e) => {
  e.preventDefault()
  dropZone.classList.remove('over')
  dropZone.classList.add('filled')
  dropZone.textContent = '✓ ¡Soltado!'
  logEvento('dragLog', 'drop', '¡elemento recibido!')
})


// componente 4 animaciones de cssc

const animBall = document.getElementById('animBall')
const btnAnim  = document.getElementById('btnAnim')

btnAnim.addEventListener('click', () => {
  animBall.classList.remove('running')
  // Forzar reflow para reiniciar animación
  void animBall.offsetWidth
  animBall.classList.add('running')
  logEvento('animLog', 'click (inicio animación)')
})

animBall.addEventListener('animationstart', () => logEvento('animLog', 'animationstart'))
animBall.addEventListener('animationiteration', () => logEvento('animLog', 'animationiteration'))
animBall.addEventListener('animationend', () => {
  animBall.classList.remove('running')
  logEvento('animLog', 'animationend')
})

// componente 5 ventana

const scrollYEl = document.getElementById('scrollY')
const winWEl    = document.getElementById('winW')
const winHEl    = document.getElementById('winH')

function actualizarDimensiones () {
  winWEl.textContent = window.innerWidth
  winHEl.textContent = window.innerHeight
}

actualizarDimensiones()

window.addEventListener('scroll', () => {
  scrollYEl.textContent = Math.round(window.scrollY)
  logEvento('winLog', 'scroll', `Y = ${Math.round(window.scrollY)}px`)
})

window.addEventListener('resize', () => {
  actualizarDimensiones()
  logEvento('winLog', 'resize', `${window.innerWidth} × ${window.innerHeight}`)
})

window.addEventListener('DOMContentLoaded', () => {
  logEvento('winLog', 'DOMContentLoaded', 'DOM listo')
})

window.addEventListener('online',  () => logEvento('winLog', 'online',  'volviste a estar en línea'))
window.addEventListener('offline', () => logEvento('winLog', 'offline', 'sin conexión'))