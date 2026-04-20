const linkContainer = document.getElementById('linkContainer')
const changeLog     = document.getElementById('changeLog')

const nodosData = [
  { texto: 'mercado libre',    href: 'https://www.mercadolibre.com.ar/',    target: '_blank', title: 'ir a mercado libre' },
  { texto: 'gitHub',    href: 'https://github.com/BentivoglioFrancesca/PDeISC',    target: '_blank', title: 'ir a github' },
  { texto: 'wikipedia', href: 'https://es.wikipedia.org/wiki/Programaci%C3%B3n', target: '_blank', title: 'ir a Wikipedia' },
  { texto: 'youTube',   href: 'https://www.youtube.com/',   target: '_blank', title: 'ir a youTube' },
  { texto: 'express',       href: 'https://expressjs.com/', target: '_blank', title: 'ir a express' }
]

// estas son las alternantivas
const hrefAlternativos = [
  'https://es.wikipedia.org/wiki/Argentina',
  'https://www.atlassian.com/es/software/jira',
  'https://es.wikipedia.org/wiki/Lionel_Messi',
  'https://arg.shein.com/',
  'https://nodejs.org/es'
]

const textosAlternativos = ['Link modificado', 'Nuevo destino', 'Redirigido', 'Cambiado', 'Actualizado']
const clases = ['link-node', 'link-node modified']

// registro el log
function registrarCambio (nodoNombre, atributo, valorAntes, valorDespues) {
  const li = document.createElement('li')
  li.innerHTML =
    `<span class="log-nodo">[${nodoNombre}]</span> ` +
    `atributo: <span class="log-attr">${atributo}</span> | ` +
    `<span class="log-antes">${valorAntes}</span> → ` +
    `<span class="log-desp">${valorDespues}</span>`
  changeLog.prepend(li)
  while (changeLog.children.length > 30) changeLog.removeChild(changeLog.lastChild)
}

// crea el nodo que pide
function crearNodo (data) {
    
  const ph = linkContainer.querySelector('.placeholder')
  if (ph) ph.remove()

  const a = document.createElement('a')
  a.href        = data.href
  a.target      = data.target
  a.title       = data.title
  a.textContent = data.texto
  a.className   = 'link-node'

  const badge = document.createElement('span')
  badge.className = 'link-href'
  badge.textContent = data.href
  a.appendChild(badge)

  linkContainer.appendChild(a)
  registrarCambio(data.texto, 'createElement', '—', `<a href="${data.href}">`)
  return a
}

// los botones para crear 
document.querySelectorAll('.btn--create').forEach(btn => {
  btn.addEventListener('click', () => {
    const idx  = parseInt(btn.dataset.idx)
    const data = nodosData[idx]

    // si ya esta no lo tiene q duplcar
    const yaExiste = Array.from(linkContainer.querySelectorAll('.link-node'))
      .some(a => a.title === data.title)

    if (yaExiste) {
      btn.textContent = '✓ Ya existe'
      setTimeout(() => { btn.textContent = `+ Crear: ${data.texto}` }, 1200)
      return
    }

    crearNodo(data)
    btn.textContent = `✓ ${data.texto} creado`
    setTimeout(() => { btn.textContent = `+ Crear: ${data.texto}` }, 1200)
  })
})

function getLinks () {
  return Array.from(linkContainer.querySelectorAll('.link-node'))
}

// botones para modificarlos
document.querySelectorAll('.btn--mod').forEach(btn => {
  btn.addEventListener('click', () => {
    const links = getLinks()
    if (links.length === 0) {
      alert('Primero creá al menos un enlace')
      return
    }

    const atributo = btn.dataset.attr

    links.forEach((a, i) => {
      const badge = a.querySelector('.link-href')

      switch (atributo) {

        case 'href': {
          const antes   = a.getAttribute('href')
          const nuevo   = hrefAlternativos[i % hrefAlternativos.length]
          a.setAttribute('href', nuevo)
          if (badge) badge.textContent = nuevo
          a.classList.add('modified')
          registrarCambio(a.title || `enlace-${i}`, 'href', antes, nuevo)
          break
        }

        case 'target': {
          const antes = a.getAttribute('target') || '_self'
          const nuevo = antes === '_blank' ? '_self' : '_blank'
          a.setAttribute('target', nuevo)
          registrarCambio(a.title || `enlace-${i}`, 'target', antes, nuevo)
          break
        }

        case 'textContent': {
          const antes = a.childNodes[0]?.textContent?.trim() || a.textContent
          const nuevo = textosAlternativos[i % textosAlternativos.length]
          a.childNodes[0].textContent = nuevo + ' '
          registrarCambio(a.title || `enlace-${i}`, 'textContent', antes, nuevo)
          break
        }

        case 'title': {
          const antes = a.getAttribute('title') || '—'
          const nuevo = `Modificado el ${new Date().toLocaleTimeString('es-AR')}`
          a.setAttribute('title', nuevo)
          registrarCambio(a.title || `enlace-${i}`, 'title', antes, nuevo)
          break
        }

        case 'class': {
          const antes = a.className
          const nuevo = a.classList.contains('modified') ? 'link-node' : 'link-node modified'
          a.className = nuevo
          if (badge) a.appendChild(badge) 
          registrarCambio(a.title || `enlace-${i}`, 'class', antes, nuevo)
          break
        }
      }
    })
  })
})