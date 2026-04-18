import express from 'express';
import fs from 'fs';
import { parse } from 'url';
import { upperCase } from 'upper-case';

import { menu } from './modulos/menu.js';
import { suma, resta, multiplicacion } from './modulos/calculo.js';
import { obtenerHora } from './modulos/tiempo.js';
import { layout } from './modulos/layout.js';

const app = express();


app.get('/', (req, res) => {
  res.send(layout(menu() + `
    <div class="container py-5">
      <h1 class="display-4">Hola profe</h1>
    </div>
  `));
});

app.get('/pag1', (req, res) => {
  res.send(layout(menu() + `
    <div class="container py-5">
      <h1 class="display-4">${upperCase("pagina 1, primer ejercicio")}</h1>
    </div>
  `));
});

app.get('/pag2', (req, res) => {
  res.send(layout(menu() + `
    <div class="container py-5">
      <h1 class="display-4">Hora actual: ${obtenerHora()}</h1>
    </div>
  `));
});

app.get('/pag3', (req, res) => {
  res.send(layout(menu() + `
    <div class="container py-5">
      <h1 class="display-4">Cálculos</h1>
      <p class="fs-5">Suma: ${suma(2,3)}</p>
      <p class="fs-5">Resta: ${resta(5,2)}</p>
      <p class="fs-5">Multiplicación: ${multiplicacion(3,4)}</p>
    </div>
  `));
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
  res.send(layout(menu() + `
    <div class="container py-5">
      <h1 class="display-4">La consola</h1>
    </div>
  `));
});


app.listen(3001, () => {
  console.log("http://localhost:3001");
});