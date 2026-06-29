const express = require('express')
const path    = require('path')
const fs      = require('fs')
const app     = express()
const port    = 3030

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Guardar TXT — nombre autogenerado incremental
app.post('/guardar', (req, res) => {
  const { contenido } = req.body
  if (!contenido) return res.status(400).json({ ok: false, msg: 'Faltan datos.' })

  const rutaArchivos = path.join(__dirname, 'archivos')
  if (!fs.existsSync(rutaArchivos)) fs.mkdirSync(rutaArchivos)

  const existentes = fs.readdirSync(rutaArchivos)
    .filter(f => f.startsWith('numeros_') && f.endsWith('.txt'))
    .length

  const nombre = `numeros_${existentes + 1}.txt`
  const ruta   = path.join(rutaArchivos, nombre)

  fs.writeFile(ruta, contenido, 'utf8', err => {
    if (err) return res.status(500).json({ ok: false, msg: 'Error al guardar.' })
    res.json({ ok: true, ruta: `archivos/${nombre}`, nombre })
  })
})

// Listar archivos TXT
app.get('/archivos', (req, res) => {
  const rutaArchivos = path.join(__dirname, 'archivos')
  if (!fs.existsSync(rutaArchivos)) return res.json({ ok: true, archivos: [] })

  const archivos = fs.readdirSync(rutaArchivos)
    .filter(f => f.endsWith('.txt'))
    .map(f => {
      const stat = fs.statSync(path.join(rutaArchivos, f))
      return { nombre: f, fecha: stat.mtime.toLocaleString('es-AR'), size: stat.size }
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  res.json({ ok: true, archivos })
})

// Servir archivos individuales
app.get('/archivos/:nombre', (req, res) => {
  const ruta = path.join(__dirname, 'archivos', req.params.nombre)
  if (!fs.existsSync(ruta)) return res.status(404).json({ ok: false, msg: 'Archivo no encontrado.' })
  res.sendFile(ruta)
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))
app.listen(port, () => console.log(`Proyecto 1 en http://localhost:${port}`))