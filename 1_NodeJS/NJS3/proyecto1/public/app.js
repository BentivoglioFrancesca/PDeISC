const stage       = document.getElementById('stage')
const btnAgregar  = document.getElementById('btnAgregar')
const btnCambiarTxt = document.getElementById('btnCambiarTxt')
const btnColor    = document.getElementById('btnColor')
const btnAgregarImg = document.getElementById('btnAgregarImg')
const btnCambiarImg = document.getElementById('btnCambiarImg')
const btnTamanio  = document.getElementById('btnTamanio')

let h1El   = null
let imgEl  = null
let imgIdx = 0
let sizeIdx = 0

// para que las imagenes sean distintas cada vez
const imagenes = [
  'https://tse1.explicit.bing.net/th/id/OIP.0HjhUa2o_ioyaqqn4_weowHaEK?w=1200&h=675&rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://okdiario.com/img/2019/06/25/todo-lo-que-necesitas-saber-sobre-el-gato-naranja.jpg',
  'https://media.istockphoto.com/id/1281729484/photo/ginger-cute-kitten-sleeping-on-the-bed.jpg?s=170667a&w=0&k=20&c=RojkQ-oSquV2BGFYA6muz5uCbI8vA-h8HwDkyLfvnyo='
]

const colores = ['#e8ff00', '#4ade80', '#f472b6', '#60a5fa', '#fb923c', '#a78bfa']
let colorIdx = 0

const tamanios = [
  { width: '120px', height: 'auto' },
  { width: '200px', height: 'auto' },
  { width: '300px', height: 'auto' },
  { width: '80px',  height: 'auto' }
]

// para agregar H1 
btnAgregar.addEventListener('click', () => {
  limpiarPlaceholder()
  if (!h1El) {
    h1El = document.createElement('h1')
    h1El.textContent = 'Hola DOM'
    h1El.style.color = '#f0f0f0'
    stage.prepend(h1El)
  }
})

// para cambiar texto del H1 
btnCambiarTxt.addEventListener('click', () => {
  if (!h1El) return alert('Primero agregá el H1')
  h1El.textContent = h1El.textContent === 'Hola DOM' ? 'Chau DOM' : 'Hola DOM'
})

// para cambiar color del H1 
btnColor.addEventListener('click', () => {
  if (!h1El) return alert('Primero agregá el H1')
  colorIdx = (colorIdx + 1) % colores.length
  h1El.style.color = colores[colorIdx]
})

// para agregar imagen 
btnAgregarImg.addEventListener('click', () => {
  limpiarPlaceholder()
  if (!imgEl) {
    imgEl = document.createElement('img')
    imgEl.src = imagenes[0]
    imgEl.alt = 'Imagen dinámica'
    imgEl.style.width = tamanios[0].width
    stage.appendChild(imgEl)
  }
})

// para cambiar imagen 
btnCambiarImg.addEventListener('click', () => {
  if (!imgEl) return alert('Primero agregá la imagen')
  imgIdx = (imgIdx + 1) % imagenes.length
  imgEl.src = imagenes[imgIdx]
})

//  para cambiar tamaño de imagen 
btnTamanio.addEventListener('click', () => {
  if (!imgEl) return alert('Primero agregá la imagen')
  sizeIdx = (sizeIdx + 1) % tamanios.length
  imgEl.style.width  = tamanios[sizeIdx].width
  imgEl.style.height = tamanios[sizeIdx].height
})

function limpiarPlaceholder () {
  // no borrar el texto, CSS lo oculta solo
}