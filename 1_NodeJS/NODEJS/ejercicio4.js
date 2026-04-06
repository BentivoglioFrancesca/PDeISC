import { suma, resta, multiplicacion, division } from './calculos.js';

export function ejercicio4() {
  return (
    "Suma: " + suma(5, 3) + "\n" +
    "Resta: " + resta(8, 6) + "\n" +
    "Multiplicacion: " + multiplicacion(3, 11) + "\n" +
    "Division: " + division(30, 5)
  );
}