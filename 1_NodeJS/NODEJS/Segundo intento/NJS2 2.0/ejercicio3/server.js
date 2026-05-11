import { createServer } from 'node:http';

import { ejercicio3 } from './ejercicio3.js';

const server = createServer((req, res) => {

   if (req.url === "/ejercicio3") {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(ejercicio3());
  }


  else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`

      <a href="/ejercicio3">Ejercicio 3</a><br>

    `);
  }

});
server.listen(3003, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3003');
});
