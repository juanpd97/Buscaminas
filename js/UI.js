"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var btnJugar = document.getElementById("btn-jugar");
  btnJugar.addEventListener("click", function () {
    mostrarPantalla("pantalla-dificultad");
  });

  var btnVolverInicio = document.getElementById("btn-volver-inicio");
  btnVolverInicio.addEventListener("click", function () {
    mostrarPantalla("pantalla-inicio");
  });

  var btnRanking = document.getElementById("btn-ranking");
  btnRanking.addEventListener("click", function () {
    mostrarPantalla("pantalla-ranking");
  });

  var btnVolverInicioDesdeRanking = document.getElementById(
    "btn-volver-inicio-desde-ranking",
  );
  btnVolverInicioDesdeRanking.addEventListener("click", function () {
    mostrarPantalla("pantalla-inicio");
  });

  var btnFacil = document.getElementById("btn-facil");
  btnFacil.addEventListener("click", function () {
    empezarJuegoUI(8, 8, 10);
  });

  var btnMedio = document.getElementById("btn-medio");
  btnMedio.addEventListener("click", function () {
    empezarJuegoUI(12, 12, 25);
  });

  var btnDificil = document.getElementById("btn-dificil");
  btnDificil.addEventListener("click", function () {
    empezarJuegoUI(16, 16, 40);
  });

  var btnDificultadPersonalizada = document.getElementById(
    "btn-dificultad-personalizada",
  );
  btnDificultadPersonalizada.addEventListener("click", function () {
    var errorJuegoPersonalizado = document.getElementById(
      "error-juego-personalizado",
    );
    errorJuegoPersonalizado.textContent = "";
    mostrarPantalla("pantalla-personalizado");
  });

  var btnVolverDificultadDesdePersonalizado = document.getElementById(
    "btn-volver-dificultad-desde-personalizado",
  );
  btnVolverDificultadDesdePersonalizado.addEventListener("click", function () {
    mostrarPantalla("pantalla-dificultad");
  });

  var btnReiniciar = document.getElementById("btn-reiniciar");

  btnReiniciar.addEventListener("click", function () {
    empezarJuegoUI(
      configuracionJuego.x,
      configuracionJuego.y,
      configuracionJuego.cantMinas,
    );
  });

  var cronometro = document.getElementById("cronometro");

  var btnJugarPersonalizado = document.getElementById(
    "btn-jugar-personalizado",
  );
  btnJugarPersonalizado.addEventListener("click", function () {
    jugarPersonalizado();
  });

  //boton menu
  var btnMenuDesdeJuego = document.getElementById("btn-menu-desde-juego");
  btnMenuDesdeJuego.addEventListener("click", function () {
    modalMenuJuego();
  });
});
// ------------------------------------

function mostrarPantalla(idPantalla) {
  //i
  var pantallas = document.getElementsByClassName("pantalla");
  var i;

  for (i = 0; i < pantallas.length; i++) {
    pantallas[i].classList.remove("pantalla-activa");
  }

  document.getElementById(idPantalla).classList.add("pantalla-activa");
}
