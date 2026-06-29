const express = require('express')
const path    = require('path')
const fs      = require('fs')
const app     = express()
const port    = 3031

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// Guardar TXT resultado filtrado
app.post('/guardar', (req, res) => {
  const { contenido } = req.body
  if (!contenido) return res.status(400).json({ ok: false, msg: 'Faltan datos.' })

  const rutaArchivos = path.join(__dirname, 'archivos')
  if (!fs.existsSync(rutaArchivos)) fs.mkdirSync(rutaArchivos)

  const existentes = fs.readdirSync(rutaArchivos)
    .filter(f => f.startsWith('resultado_filtro_'))
    .length

  const nombre = `resultado_filtro_${existentes + 1}.txt`
  const ruta   = path.join(rutaArchivos, nombre)

  fs.writeFile(ruta, contenido, 'utf8', err => {
    if (err) return res.status(500).json({ ok: false, msg: 'Error al guardar.' })
    res.json({ ok: true, ruta: `archivos/${nombre}` })
  })
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))
app.listen(port, () => console.log(`Proyecto 2 en http://localhost:${port}`))