import { suma, resta, multiplicacion, division } from './calculos.js';

export function ejercicio5() {
  return `
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="bg-light">
        <div class="container py-5">

          <table class="table table-bordered text-center">
            <tr>
              <th>Operacion</th>
              <th>Resultado</th>
            </tr>
            <tr>
              <td>5 + 3</td>
              <td>${suma(5, 3)}</td>
            </tr>
            <tr>
              <td>8 - 6</td>
              <td>${resta(8, 6)}</td>
            </tr>
            <tr>
              <td>3 * 11</td>
              <td>${multiplicacion(3, 11)}</td>
            </tr>
            <tr>
              <td>30 / 5</td>
              <td>${division(30, 5)}</td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `;
}