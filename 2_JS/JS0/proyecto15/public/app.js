function decodificar(){

let mensaje =
document.getElementById("entrada").value;

while(mensaje.includes("(")){

let inicio = mensaje.indexOf("(");
let fin = mensaje.indexOf(")");

let parte = mensaje.slice(inicio+1,fin);

/* invertir texto */
let invertido = parte.split("").reverse().join("");

/* reemplazar (texto) por texto invertido */
mensaje =
mensaje.slice(0,inicio) +
invertido +
mensaje.slice(fin+1);

}

document.getElementById("salida").innerText=mensaje;

}

function limpiar(){
document.getElementById("entrada").value="";
document.getElementById("salida").innerText="---";
}