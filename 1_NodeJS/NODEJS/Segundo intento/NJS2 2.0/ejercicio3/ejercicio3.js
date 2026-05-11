import { suma, resta, multiplicacion, division } from '../calculos.js';

export function ejercicio3() {
  return (
    "Suma: " + suma(4, 5) + "\n" +
    "Resta: " + resta(3, 6) + "\n" +
    "Multiplicacion: " + multiplicacion(2, 7) + "\n" +
    "Division: " + division(20, 4)
  );
}