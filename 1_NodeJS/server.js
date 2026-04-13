import express from 'express';
import fs from 'fs';
import { parse } from 'url';
import { upperCase } from 'upper-case';

import { menu } from './modulos/menu.js';
import { suma, resta, multiplicacion } from './modulos/calculo.js';
import { obtenerHora } from './modulos/tiempo.js';

const app = express();


app.get('/', (req, res) => {
  res.send(menu() + "<h1>hola profe</h1>");
});


app.get('/pag1', (req, res) => {
  res.send(menu() + "<h1>" + upperCase("pagina 1, primer ejercicio") + "</h1>");
});


app.get('/pag2', (req, res) => {
  res.send(menu() + "<h1>Hora actual: " + obtenerHora() + "</h1>");
});


app.get('/pag3', (req, res) => {
  res.send(
    menu() +
    "<h1>Cálculos</h1>" +
    "Suma: " + suma(2,3) + "<br>" +
    "Resta: " + resta(5,2) + "<br>" +
    "Multiplicación: " + multiplicacion(3,4) + "<br>" 
  );
});

app.get('/pag4', (req, res) => {
  fs.readFile('./paginas/pagina.html', (err, data) => {
    if (err) {
      res.send("Error");
    } else {
      res.send(data.toString());
    }
  });
});


app.get('/pag5', (req, res) => {

  const url = parse(req.url, true);

  console.log("Host:", req.headers.host);
  console.log("Path:", url.pathname);
  console.log("Query:", url.query);

  res.send(menu() + "<h1>la consola</h1>");
});


app.listen(3001, () => {
  console.log("http://localhost:3001");
});