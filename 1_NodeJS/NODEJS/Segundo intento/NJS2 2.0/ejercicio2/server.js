import { createServer } from 'node:http';

import { ejercicio2 } from './ejercicio2.js';


const server = createServer((req, res) => {

 if (req.url === "/ejercicio2") {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(ejercicio2());
  }

  else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`

      <a href="/ejercicio2">Ejercicio 2</a><br>

    `);
  }

});
server.listen(3002, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3002');
});
