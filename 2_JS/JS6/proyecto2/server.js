const express = require("express");
const mysql   = require("mysql2");
const cors    = require("cors");
const fs      = require("fs");
const path    = require("path");
const PDFKit  = require("pdfkit");

const app  = express();
const PORT = 3000;

//  Middlewares 
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../proyecto1/public"))); // sirve index.html, styles.css y app.js

//  Conexión MySQL 
const db = mysql.createConnection({
  host:     "localhost",
  user:     "root",
  password: "",
  database: "Score",
});

db.connect((err) => {
  if (err) {
    console.error(" Error al conectar con MySQL:", err.message);
    process.exit(1);
  }
  console.log(" Conectado a MySQL – Score");
});

//  Cargar palabras desde JSON 
const palabras = JSON.parse(
  fs.readFileSync(path.join(__dirname, "palabras.json"), "utf-8")
);

// RUTAS

/** Devuelve una palabra aleatoria del archivo palabras.json.*/
app.post("/api/palabra", (req, res) => {
  const palabra = palabras[Math.floor(Math.random() * palabras.length)];
  res.json({ palabra });
});

/** Guarda el score de un jugador en la base de datos.*/
app.post("/api/score", (req, res) => {
  const { nombre, puntos, tiempo } = req.body;

  if (!nombre || puntos === undefined || tiempo === undefined) {
    return res.status(400).json({ error: "Faltan datos: nombre, puntos y tiempo son requeridos." });
  }

  db.query(
    "INSERT INTO score (nombre, puntos, tiempo) VALUES (?, ?, ?)",
    [nombre, puntos, tiempo],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, nombre, puntos, tiempo });
    }
  );
});

/* Devuelve TODOS los scores ordenados por puntos (mayor a menor).
El recorte a Top 10 se hace en el frontend */
app.post("/api/scores", (req, res) => {
  db.query(
    "SELECT * FROM score ORDER BY puntos DESC, tiempo ASC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

/* Genera y devuelve un PDF con el score de UNA partida.*/
app.post("/api/pdf", (req, res) => {
  const { nombre, puntos, tiempo, fecha } = req.body;

  // Nombre de archivo seguro para el header 
  const nombreArchivo = (nombre || "jugador")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // saca acentos
    .replace(/[^a-zA-Z0-9]/g, "_");                     // reemplaza el resto

  try {
    const doc    = new PDFKit({ margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="score_${nombreArchivo}.pdf"`);
      res.setHeader("Content-Length", pdfBuffer.length);
      res.end(pdfBuffer);
    });

    doc.fontSize(26).font("Helvetica-Bold").text("Ahorcado - Score", { align: "center" });
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    doc.fontSize(14).font("Helvetica");
    doc.text(`Jugador : ${nombre}`);
    doc.text(`Puntos  : ${puntos}`);
    doc.text(`Tiempo  : ${tiempo} segundos`);
    doc.text(`Fecha   : ${fecha}`);

    doc.moveDown();
    doc.fontSize(11).fillColor("gray").text("Generado por Ahorcado - Node.js + MySQL", { align: "center" });

    doc.end();

  } catch (err) {
    console.error(" Error al generar el PDF del score:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Error al generar el PDF del score." });
    }
  }
});

/** Genera y devuelve un PDF con la tabla de posiciones (Top 10 visible en pantalla).*/
app.post("/api/pdf-ranking", (req, res) => {
  const { scores } = req.body;

  if (!Array.isArray(scores) || scores.length === 0) {
    return res.status(400).json({ error: "No hay scores para generar el PDF." });
  }

  try {
    const doc    = new PDFKit({ margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="ranking_ahorcado.pdf"');
      res.setHeader("Content-Length", pdfBuffer.length);
      res.end(pdfBuffer);
    });

    doc.fontSize(24).font("Helvetica-Bold").text("Ahorcado - Tabla de posiciones", { align: "center" });
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    doc.fontSize(11).font("Helvetica-Bold");
    doc.text("#     Jugador                Puntos     Tiempo     Fecha");
    doc.moveDown(0.3);
    doc.font("Helvetica");

    scores.forEach((s, i) => {
      const nombre = String(s.nombre ?? "-").slice(0, 22);
      const puntos = String(s.puntos ?? 0);
      const tiempo = `${s.tiempo ?? 0}s`;

      let fecha = "-";
      if (s.fecha) {
        const f = new Date(s.fecha);
        if (!isNaN(f.getTime())) fecha = f.toLocaleDateString("es-AR");
      }

      doc.text(
        `${String(i + 1).padEnd(6)}${nombre.padEnd(24)}${puntos.padEnd(11)}${tiempo.padEnd(11)}${fecha}`
      );
    });

    doc.moveDown();
    doc.fontSize(11).fillColor("gray").text("Generado por Ahorcado - Node.js + MySQL", { align: "center" });

    doc.end();

  } catch (err) {
    console.error(" Error al generar el PDF del ranking:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Error al generar el PDF del ranking." });
    }
  }
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});