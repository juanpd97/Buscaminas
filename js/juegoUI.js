"use strict";

var contadorMinasRestantes;
var jugando;
var configuracionJuego = {
  x: 0,
  y: 0,
  cantMinas: 0,
};

function empezarJuegoUI(x, y, cantMinas) {
  configuracionJuego = { x: x, y: y, cantMinas: cantMinas };
  mostrarPantalla("pantalla-juego");
  empezarJuego(x, y, cantMinas);
  dibujarTablero(x, y);
  inicializarContadorBanderas(cantMinas);
  jugando = true;
  reiniciarCronometro();
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

  if (!cronometroIniciado) {
    iniciarCronometro();
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
      pausarCronometro();
      modalDerrota();
      break;

    case "sinCambio":
      break;
    case "victoria":
      revelarCasillasUI(resultado.casillasARevelar);
      console.log("ganaste :)");
      jugando = false;
      pausarCronometro();
      modalVictoria();
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
      '[data-x="' + x + '"][data-y="' + y + '"]',
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
      '[data-x="' + x + '"][data-y="' + y + '"]',
    );

    btnCelda.innerText = "o";
    btnCelda.disabled = true;
    // btnCelda.classList.add("celda-mina");
  }
}

function jugarPersonalizado() {
  var errorJuegoPersonalizado = document.getElementById(
    "error-juego-personalizado",
  );
  errorJuegoPersonalizado.textContent = "";

  var inputFilas = document.getElementById("input-filas");
  var inputColumnas = document.getElementById("input-columnas");
  var inputMinas = document.getElementById("input-minas");
  var formulario = document.querySelector(
    ".formulario-dificultad-personalizada",
  );

  var filas = parseInt(inputFilas.value, 10);
  var columnas = parseInt(inputColumnas.value, 10);
  var minas = parseInt(inputMinas.value, 10);

  var totalCeldas = filas * columnas;

  // Buscar o crear elemento de error
  if (!errorJuegoPersonalizado) {
    errorJuegoPersonalizado = document.createElement("p");
    errorJuegoPersonalizado.id = "error-personalizado";
    errorJuegoPersonalizado.style.color = "red";
    errorJuegoPersonalizado.style.fontSize = "16px";
    errorJuegoPersonalizado.style.marginTop = "10px";
    formulario.appendChild(errorJuegoPersonalizado);
  }

  if (isNaN(filas) || isNaN(columnas) || isNaN(minas)) {
    errorJuegoPersonalizado.textContent =
      "Todos los valores deben ser numéricos";
    return;
  }

  if (filas < 2 || columnas < 2) {
    errorJuegoPersonalizado.textContent =
      "Filas y columnas deben ser al menos 2";
    return;
  }

  if (filas > 25 || columnas > 25) {
    errorJuegoPersonalizado.textContent = "Máximo permitido: 25 x 25";
    return;
  }

  if (minas < 1) {
    errorJuegoPersonalizado.textContent = "Debe haber al menos una mina";
    return;
  }

  if (minas >= totalCeldas) {
    errorJuegoPersonalizado.textContent =
      "La cantidad de minas debe ser menor al total de celdas";
    return;
  }

  empezarJuegoUI(filas, columnas, minas);
}
