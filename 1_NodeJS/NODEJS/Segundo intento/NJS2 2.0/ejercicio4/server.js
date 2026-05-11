import { createServer } from 'node:http';

import { ejercicio4 } from './ejercicio4.js';


const server = createServer((req, res) => {

if (req.url === "/ejercicio4") {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(ejercicio4());
  }


  else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`

      <a href="/ejercicio4">Ejercicio 4</a><br>
    `);
  }

});
server.listen(3004, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3004');
});
