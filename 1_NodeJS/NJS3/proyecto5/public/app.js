const stage = document.getElementById('stage')

let cardCount  = 0
let alertCount = 0
let tablaCount = 0
let galCount   = 0
let citaCount  = 0

function quitarPlaceholder () {
  const ph = stage.querySelector('.placeholder')
  if (ph) ph.remove()
}

// tarjeta
document.getElementById('btnCard').addEventListener('click', () => {
  quitarPlaceholder()
  cardCount++

  const wrapper = document.createElement('div')

  wrapper.innerHTML = `
    <div class="ih-card">
      <h4>Tarjeta #${cardCount}</h4>
      <p> aca esta la tarjeta creada </p>
      <span class="tag">innerHTML</span>
    </div>
  `
  stage.appendChild(wrapper.firstElementChild)
})

// ALERTA 
document.getElementById('btnAlerta').addEventListener('click', () => {
  quitarPlaceholder()
  alertCount++

  const tipos = [
    { icono: '⚠️', titulo: 'Alerta',  msg: 'Esto es una alerta de prueba generada con innerHTML.' },
  ]
  const t = tipos[(alertCount - 1) % tipos.length]

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="ih-alerta">
      <span class="alerta-icono">${t.icono}</span>
      <div>
        <strong>${t.titulo} #${alertCount}</strong>
        <p>${t.msg}</p>
      </div>
    </div>
  `
  stage.appendChild(wrapper.firstElementChild)
})

// tabla
document.getElementById('btnTabla').addEventListener('click', () => {
  quitarPlaceholder()
  tablaCount++

  const filas = [
    ['HTML',       'Lenguaje de marcado',  'Estructura'],
    ['CSS',        'Hojas de estilo',      'Presentación'],
    ['JavaScript', 'Lenguaje de scripting','Comportamiento'],
    ['Express',    'Framework Node.js',    'Servidor'],
    ['DOM',        'Document Object Model','API del navegador']
  ]

  const filasHTML = filas.map(([tech, desc, rol]) =>
    `<tr><td>${tech}</td><td>${desc}</td><td>${rol}</td></tr>`
  ).join('')

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <table class="ih-tabla">
      <thead>
        <tr><th>Tecnología</th><th>Descripción</th><th>Rol</th></tr>
      </thead>
      <tbody>${filasHTML}</tbody>
    </table>
  `
  stage.appendChild(wrapper.firstElementChild)
})

// galeria
document.getElementById('btnGaleria').addEventListener('click', () => {
  quitarPlaceholder()
  galCount++

  const seeds = [galCount * 10, galCount * 10 + 1, galCount * 10 + 2]
  const imgs  = seeds.map(s =>
    `<img src="https://tse1.mm.bing.net/th/id/OIP.CGOHT_Xc7tlshlLcq9QyYgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Imagen ${s}">`
  ).join('')

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `<div class="ih-galeria">${imgs}</div>`
  stage.appendChild(wrapper.firstElementChild)
})

// escritura
document.getElementById('btnCita').addEventListener('click', () => {
  quitarPlaceholder()
  citaCount++

  const citas = [
    { texto: ' porfavor aprobame profe ', autor: 'Francesca Bentivoglio' },

  ]
  const c = citas[(citaCount - 1) % citas.length]

  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
    <div class="ih-cita">
      <blockquote>"${c.texto}"</blockquote>
      <cite>— ${c.autor}</cite>
    </div>
  `
  stage.appendChild(wrapper.firstElementChild)
})

// limpiar
document.getElementById('btnLimpiar').addEventListener('click', () => {
  stage.innerHTML = '<p class="placeholder">Usá los botones para insertar elementos vía innerHTML</p>'
  cardCount = alertCount = tablaCount = galCount = citaCount = 0
})