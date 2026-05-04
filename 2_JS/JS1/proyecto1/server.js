const express = require('express')
const path = require('path')
const app = express()
const port = 3020

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))
app.listen(port, () => console.log(`Proyecto 1 - 3 formas de lectura en http://localhost:${port}`))