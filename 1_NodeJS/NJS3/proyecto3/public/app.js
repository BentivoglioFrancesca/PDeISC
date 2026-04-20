// ── Proyecto 3: Contar hijos del DOM ─────────────────────────────────────────

// ── Inspector de hijos ────────────────────────────────────────────────────────
const resultNombre = document.getElementById('resultNombre')
const resultCount  = document.getElementById('resultCount')
const childrenList = document.getElementById('childrenList')

/**
 * Al pulsar cualquier sección (.component) mostramos cuántos hijos tiene
 * usando childNodes (todos) y children (sólo elementos).
 */
document.querySelectorAll('.component').forEach(section => {
  section.addEventListener('click', function (e) {
    // Quitar selección previa
    document.querySelectorAll('.component').forEach(s => s.classList.remove('selected'))
    this.classList.add('selected')

    const nombre       = this.dataset.nombre || this.id
    const hijos        = this.children          // HTMLCollection — sólo elementos
    const hijosTotal   = this.childNodes         // NodeList — incluye texto/comentarios

    resultNombre.textContent = nombre
    resultCount.textContent  = hijos.length

    // Listar los hijos en el panel
    childrenList.innerHTML = ''
    Array.from(hijos).forEach((hijo, i) => {
      const li = document.createElement('li')
      const id = hijo.id ? `#${hijo.id}` : ''
      const cls = hijo.className ? `.${hijo.className.split(' ')[0]}` : ''
      li.textContent = `[${i}] <${hijo.tagName.toLowerCase()}>${id}${cls}`
      childrenList.appendChild(li)
    })

    // Mostrar info de childNodes (con nodos de texto)
    const liExtra = document.createElement('li')
    liExtra.style.cssText = 'color:#666;font-style:italic;flex-basis:100%'
    liExtra.textContent = `childNodes (incl. texto): ${hijosTotal.length}`
    childrenList.appendChild(liExtra)
  })
})

// ── Utilidad log ─────────────────────────────────────────────────────────────
function logEvento (listId, nombre, detalle = '') {
  const ul = document.getElementById(listId)
  if (!ul) return
  const li = document.createElement('li')
  const h  = new Date().toLocaleTimeString('es-AR', { hour12: false })
  li.innerHTML = `[${h}] <span>${nombre}</span>${detalle ? ' — ' + detalle : ''}`
  ul.prepend(li)
  while (ul.children.length > 10) ul.removeChild(ul.lastChild)
}

// ── COMP 1: mouse ─────────────────────────────────────────────────────────────
const mouseBox = document.getElementById('mouseBox')
mouseBox?.addEventListener('mouseenter', () => logEvento('mouseLog', 'mouseenter'))
mouseBox?.addEventListener('mouseleave', () => logEvento('mouseLog', 'mouseleave'))

// ── COMP 2: teclado ───────────────────────────────────────────────────────────
const keyInput   = document.getElementById('keyInput')
const keyDisplay = document.getElementById('keyDisplay')

keyInput?.addEventListener('keydown', (e) => {
  keyDisplay.textContent = e.key
  logEvento('keyLog', 'keydown', e.key)
})
keyInput?.addEventListener('focus', () => logEvento('keyLog', 'focus'))
keyInput?.addEventListener('blur',  () => logEvento('keyLog', 'blur'))

// ── COMP 3: drag ──────────────────────────────────────────────────────────────
const dragItem = document.getElementById('dragItem')
const dropZone = document.getElementById('dropZone')

dragItem?.addEventListener('dragstart', () => logEvento('dragLog', 'dragstart'))
dragItem?.addEventListener('dragend',   () => logEvento('dragLog', 'dragend'))
dropZone?.addEventListener('dragover',  (e) => e.preventDefault())
dropZone?.addEventListener('drop', (e) => {
  e.preventDefault()
  dropZone.classList.add('over')
  dropZone.textContent = '✓ ¡Soltado!'
  logEvento('dragLog', 'drop')
})

// ── COMP 4: animaciones CSS ───────────────────────────────────────────────────
const animBall = document.getElementById('animBall')
const btnAnim  = document.getElementById('btnAnim')

btnAnim?.addEventListener('click', (e) => {
  e.stopPropagation() // no contar hijos al pulsar botón
  animBall.classList.remove('running')
  void animBall.offsetWidth
  animBall.classList.add('running')
  logEvento('animLog', 'animationstart')
})
animBall?.addEventListener('animationend', () => {
  animBall.classList.remove('running')
  logEvento('animLog', 'animationend')
})

// ── COMP 5: ventana ───────────────────────────────────────────────────────────
const scrollYEl = document.getElementById('scrollY')
const winWEl    = document.getElementById('winW')
const winHEl    = document.getElementById('winH')

function actualizarDim () {
  if (winWEl) winWEl.textContent = window.innerWidth
  if (winHEl) winHEl.textContent = window.innerHeight
}
actualizarDim()

window.addEventListener('scroll', () => {
  if (scrollYEl) scrollYEl.textContent = Math.round(window.scrollY)
  logEvento('winLog', 'scroll', `Y=${Math.round(window.scrollY)}`)
})

window.addEventListener('resize', () => {
  actualizarDim()
  logEvento('winLog', 'resize', `${window.innerWidth}×${window.innerHeight}`)
})