"use strict";
var contadorMinasRestantes;
var jugando;

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
    dibujarTablero(8, 8);
    inicializarContadorBanderas(10);
    jugando = true;
  });

  var btnMedio = document.getElementById("btn-medio");
  btnMedio.addEventListener("click", function () {
    mostrarPantalla("pantalla-juego");
    empezarJuego(12, 12, 25);
    dibujarTablero(12, 12);
    inicializarContadorBanderas(25);
    jugando = true;
  });

  var btnDificil = document.getElementById("btn-dificil");
  btnDificil.addEventListener("click", function () {
    mostrarPantalla("pantalla-juego");
    empezarJuego(16, 16, 40);
    dibujarTablero(16, 16);
    inicializarContadorBanderas(40);
    jugando = true;
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
  var tablero = document.getElementById("tablero");

  tablero.innerHTML = "";

  for (var i = 0; i < x; i++) {
    var divFila = document.createElement("div");
    divFila.classList.add("fila-tablero");

    for (var j = 0; j < y; j++) {
      var btnCelda = document.createElement("button");
      btnCelda.classList.add("celda");
      btnCelda.setAttribute("data-x", i);
      btnCelda.setAttribute("data-y", j);
      btnCelda.addEventListener("click", function () {
        var x = parseInt(this.getAttribute("data-x"));
        var y = parseInt(this.getAttribute("data-y"));
        presionarCeldaUI(x, y);
      });
      btnCelda.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        var x = parseInt(this.getAttribute("data-x"));
        var y = parseInt(this.getAttribute("data-y"));
        banderaUI(x, y, this);
      });

      btnCelda.innerText = "x"; // ----------- borrar

      divFila.appendChild(btnCelda);
    }
    tablero.appendChild(divFila);
  }
}

function presionarCeldaUI(x, y) {
  if (jugando === false) {
    return;
  }

  console.log("celdasRestantes: ", celdasRestantes);
  var resultado = presionarCelda(x, y);

  switch (resultado.estado) {
    case "siguienteTurno":
      revelarCasillasUI(resultado.casillasARevelar);
      break;

    case "gameOver":
      revelarMinasUI(resultado.minas);
      console.log("perdiste");
      jugando = false;
      break;

    case "sinCambio":
      break;
    case "victoria":
      revelarCasillasUI(resultado.casillasARevelar);
      console.log("ganaste :)");
      jugando = false;
      break;
    default:
      break;
  }
}

function revelarCasillasUI(casillas) {
  var btnCelda;

  for (var i = 0; i < casillas.length; i++) {
    var x = casillas[i].x;
    var y = casillas[i].y;

    btnCelda = document.querySelector(
      '[data-x="' + x + '"][data-y="' + y + '"]'
    );

    btnCelda.disabled = true;

    if (tablero[x][y].minasVecinas > 0) {
      btnCelda.innerText = tablero[x][y].minasVecinas;
    } else {
      btnCelda.innerText = "-";
    }
  }
}

function banderaUI(x, y, boton) {
  if (jugando === false) {
    return;
  }

  var resultado = alternarBandera(x, y);

  switch (resultado.estado) {
    case "banderaColocada":
      boton.innerText = "B";
      contadorMinasRestantes--;
      actualizarContadorUI();
      break;

    case "banderaQuitada":
      boton.innerText = "x";
      contadorMinasRestantes++;
      actualizarContadorUI();
      break;

    case "sinCambio":
      // no hacer nada
      break;
  }
}

function inicializarContadorBanderas(cantMinas) {
  contadorMinasRestantes = cantMinas;
  actualizarContadorUI();
}
function actualizarContadorUI() {
  var span = document.getElementById("contador-minas");
  span.innerText = "Minas: " + contadorMinasRestantes;
}

function revelarMinasUI(minas) {
  var btnCelda;

  for (var i = 0; i < minas.length; i++) {
    var x = minas[i].x;
    var y = minas[i].y;

    btnCelda = document.querySelector(
      '[data-x="' + x + '"][data-y="' + y + '"]'
    );

    btnCelda.innerText = "o";
    btnCelda.disabled = true;
    // btnCelda.classList.add("celda-mina");
  }
}
