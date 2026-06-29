const express = require("express");
const mysql   = require("mysql2");
const cors    = require("cors");
const path    = require("path");

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//  Conexión a MySQL (XAMPP) 
const db = mysql.createConnection({
  host:     "localhost",
  user:     "root",
  password: "",
  database: "alumnosDB",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar con MySQL:", err.message);
    process.exit(1);
  }
  console.log(" Conectado a MySQL – alumnosDB");
});

//  Rutas de la API 

/** Devuelve todos los alumnos ordenados por ID */
app.get("/api/alumnos", (req, res) => {
  db.query("SELECT * FROM alumnos ORDER BY id ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

/** Inserta un nuevo alumno.
 * Valida campos vacíos y combinación nombre+apellido duplicada. */
app.post("/api/alumnos", (req, res) => {
  const { nombre, apellido, edad } = req.body;

  // Validar que no vengan vacíos
  if (!nombre || !apellido || !edad) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  // Verificar si ya existe esa combinación nombre + apellido
  db.query(
    "SELECT id FROM alumnos WHERE nombre = ? AND apellido = ?",
    [nombre, apellido],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      if (rows.length > 0) {
        // 409 Conflict: combinación duplicada
        return res.status(409).json({
          error: `Ya existe un alumno/a llamado ${nombre} ${apellido}.`,
        });
      }

      // No hay duplicado se inserta
      db.query(
        "INSERT INTO alumnos (nombre, apellido, edad) VALUES (?, ?, ?)",
        [nombre, apellido, edad],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ id: result.insertId, nombre, apellido, edad });
        }
      );
    }
  );
});

/** Elimina un alumno por su ID.*/
app.delete("/api/alumnos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM alumnos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Alumno eliminado correctamente." });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});