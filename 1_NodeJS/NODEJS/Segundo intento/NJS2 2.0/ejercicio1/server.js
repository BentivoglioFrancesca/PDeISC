import { createServer } from 'node:http';

import { ejercicio1 } from './ejercicio1.js';

const server = createServer((req, res) => {

  if (req.url === "/ejercicio1") {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(ejercicio1());
  }

  else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <a href="/ejercicio1">Ejercicio 1</a><br>
    `);
  }

});
server.listen(3001, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3001');
});
