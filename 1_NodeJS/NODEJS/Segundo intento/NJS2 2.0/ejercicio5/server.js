import { createServer } from 'node:http';

import { ejercicio5 } from './ejercicio5.js';

const server = createServer((req, res) => {

  if (req.url === "/ejercicio5") {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(ejercicio5());
  }

  else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <a href="/ejercicio5">Ejercicio 5</a><br>
    `);
  }

});
server.listen(3005, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3005');
});
