const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const alumnos = [
  { id: 1, nombre: "Valentina López",  email: "valen@uni.edu",   carrera: "Ingeniería en Sistemas", anio: 3 },
  { id: 2, nombre: "Matías Fernández", email: "matias@uni.edu",  carrera: "Diseño Gráfico",         anio: 1 },
  { id: 3, nombre: "Lucía Torres",     email: "lucia@uni.edu",   carrera: "Ingeniería en Sistemas", anio: 4 },
  { id: 4, nombre: "Franco Romero",    email: "franco@uni.edu",  carrera: "Administración",         anio: 2 },
  { id: 5, nombre: "Camila Díaz",      email: "camila@uni.edu",  carrera: "Diseño Gráfico",         anio: 3 },
  { id: 6, nombre: "Sebastián Vega",   email: "sebas@uni.edu",   carrera: "Administración",         anio: 1 },
];

// POST para traer todos los alumnos
app.post("/api/alumnos", (req, res) => {
  res.json(alumnos);
});

app.listen(3004, () => console.log("EJ4 corriendo en http://localhost:3004"));