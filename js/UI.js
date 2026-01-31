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
    filtroDificultad = "todas";
    mostrarRanking();
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
    dificultad = "facil";
    empezarJuegoUI(8, 8, 10, "facil");
  });

  var btnMedio = document.getElementById("btn-medio");
  btnMedio.addEventListener("click", function () {
    dificultad = "media";
    empezarJuegoUI(12, 12, 25, "medio");
  });

  var btnDificil = document.getElementById("btn-dificil");
  btnDificil.addEventListener("click", function () {
    dificultad = "dificil";
    empezarJuegoUI(16, 16, 40, "dificil");
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
      dificultad,
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

  //opciones
  var btnMenuOpciones = document.getElementById("btn-opciones");
  btnMenuOpciones.addEventListener('click',function () {
    mostrarPantalla('pantalla-opciones')
  });

  var btnVolverDesdeMenuOpciones = document.getElementById('btn-volver-inicio-desde-opciones');
  btnVolverDesdeMenuOpciones.addEventListener('click', function (){
    mostrarPantalla('pantalla-inicio');
  });

  var btnGrafico = document.getElementById('btn-graficos');
  btnGrafico.addEventListener('click',function(){
    cambiarGraficos();
  });

});
// ------------------------------------

function mostrarPantalla(idPantalla) {
  //i
  var pantallas = document.getElementsByClassName("pantalla");
  
  for (var i = 0; i < pantallas.length; i++) {
    pantallas[i].classList.remove("pantalla-activa");
  }

  document.getElementById(idPantalla).classList.add("pantalla-activa");
}

function cambiarGraficos(){
  var graficos = document.getElementById('graficos-css');
  if (graficos.disabled) {
        graficos.disabled = false; 
    } else {
        graficos.disabled = true;  
    }
};

// function modoOscuro(){

// }