import { createServer } from 'node:http';

import { ejercicio1 } from './ejercicio1.js';
import { ejercicio2 } from './ejercicio2.js';
import { ejercicio3 } from './ejercicio3.js';
import { ejercicio4 } from './ejercicio4.js';
import { ejercicio5 } from './ejercicio5.js';

const server = createServer((req, res) => {

  if (req.url === "/ejercicio1") {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(ejercicio1());
  }

  else if (req.url === "/ejercicio2") {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(ejercicio2());
  }

  else if (req.url === "/ejercicio3") {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(ejercicio3());
  }

  else if (req.url === "/ejercicio4") {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(ejercicio4());
  }

  else if (req.url === "/ejercicio5") {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(ejercicio5());
  }

  else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <a href="/ejercicio1">Ejercicio 1</a><br>
      <a href="/ejercicio2">Ejercicio 2</a><br>
      <a href="/ejercicio3">Ejercicio 3</a><br>
      <a href="/ejercicio4">Ejercicio 4</a><br>
      <a href="/ejercicio5">Ejercicio 5</a><br>
    `);
  }

});
server.listen(3001, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3001');
});
