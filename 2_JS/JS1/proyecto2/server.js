const express = require('express')
const path = require('path')
const app = express()
const port = 3021

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))
app.listen(port, () => console.log(`Proyecto 2 - Formulario 8 campos en http://localhost:${port}`))