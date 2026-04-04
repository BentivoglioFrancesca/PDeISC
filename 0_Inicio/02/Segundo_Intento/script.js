var marco = document.getElementById("marco");
var modal = new bootstrap.Modal(document.getElementById("modalVisor"));

var linksExternos = document.querySelectorAll(".link-externo");

linksExternos.forEach(function(link) {
  link.addEventListener("click", function(evento) {

    evento.preventDefault();


    marco.setAttribute("src", link.getAttribute("href"));


    modal.show();
  });
});

document.getElementById("modalVisor").addEventListener("hidden.bs.modal", function() {
  marco.setAttribute("src", "");
});