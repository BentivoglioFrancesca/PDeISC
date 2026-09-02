// server.js
// Punto de entrada del backend. Expone una API REST 

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const sociosRoutes = require('./routes/socios');
const librosRoutes = require('./routes/libros');
const prestamosRoutes = require('./routes/prestamos');

const app = express();

app.use(cors()); // permite que los frontends (otro puerto) consuman la API
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/socios', sociosRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/prestamos', prestamosRoutes);

const PUERTO = process.env.PORT || 4000;
app.listen(PUERTO, () => {
  console.log(`API de la biblioteca corriendo en http://localhost:${PUERTO}`);
});
