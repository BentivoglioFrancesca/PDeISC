// Agarramos el iframe y el modal de Bootstrap
var marco = document.getElementById("marco");
var modal = new bootstrap.Modal(document.getElementById("modalVisor"));

// Buscamos todos los links externos
var linksExternos = document.querySelectorAll(".link-externo");

// Para cada link externo interceptamos el clic
linksExternos.forEach(function(link) {
  link.addEventListener("click", function(evento) {

    // Cancelamos la navegación normal
    evento.preventDefault();

    // Cargamos la URL en el iframe
    marco.setAttribute("src", link.getAttribute("href"));

    // Bootstrap abre el modal solo con este comando
    modal.show();
  });
});

// Cuando el modal se cierra, vaciamos el iframe
document.getElementById("modalVisor").addEventListener("hidden.bs.modal", function() {
  marco.setAttribute("src", "");
});