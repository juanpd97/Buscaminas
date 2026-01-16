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
    "btn-volver-inicio-desde-ranking"
  );
  btnVolverInicioDesdeRanking.addEventListener("click", function () {
    mostrarPantalla("pantalla-inicio");
  });

  var btnFacil = document.getElementById("btn-facil");
  btnFacil.addEventListener("click", function () {
    mostrarPantalla("pantalla-juego");
    empezarJuego(8, 8, 10);
    dibujarTablero(8,8);
  });

  var btnMedio = document.getElementById("btn-medio");
  btnMedio.addEventListener("click", function () {
    mostrarPantalla("pantalla-juego");
    empezarJuego(12, 12, 25);
    dibujarTablero(12,12);
  });

  var btnDificil = document.getElementById("btn-dificil");
  btnDificil.addEventListener("click", function () {
    mostrarPantalla("pantalla-juego");
    empezarJuego(16,16,40);
    dibujarTablero(16,16);
  });

  var btnDificultadPersonalizada = document.getElementById(
    "btn-dificultad-personalizada"
  );
  btnDificultadPersonalizada.addEventListener("click", function () {
    mostrarPantalla("pantalla-personalizado");
  });

  var btnVolverDificultadDesdePersonalizado = document.getElementById(
    "btn-volver-dificultad-desde-personalizado"
  );
  btnVolverDificultadDesdePersonalizado.addEventListener("click", function () {
    mostrarPantalla("pantalla-dificultad");
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


function dibujarTablero(x, y) {
    var tablero = document.getElementById('tablero');
    
    tablero.innerHTML = '';//i

    for (var i = 0; i < x; i++) {
        var divFila = document.createElement("div");
        divFila.classList.add('fila-tablero'); 
        
        for (var j = 0; j < y; j++) {
            var btnCelda = document.createElement('button'); 
            btnCelda.setAttribute("data-x", i);
            btnCelda.setAttribute("data-y", j);

            // btnCelda.innerText = 'x';
                        
            divFila.appendChild(btnCelda); 
        }
        tablero.appendChild(divFila);
    }
}