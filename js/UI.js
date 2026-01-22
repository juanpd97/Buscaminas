"use strict";
var contadorMinasRestantes;
var jugando;
var configuracionJuego = {
  x: 0,
  y: 0,
  cantMinas: 0,
};

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
});
// ------------------------------------
function empezarJuegoUI(x, y, cantMinas) {
  configuracionJuego = { x: x, y: y, cantMinas: cantMinas };
  mostrarPantalla("pantalla-juego");
  empezarJuego(x, y, cantMinas);
  dibujarTablero(x, y);
  inicializarContadorBanderas(cantMinas);
  jugando = true;
  reiniciarCronometro();
}

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
      break;

    case "sinCambio":
      break;
    case "victoria":
      revelarCasillasUI(resultado.casillasARevelar);
      console.log("ganaste :)");
      jugando = false;
      pausarCronometro();
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

//------ cronometro
var segundos = 0;
var intervalo = null;
var cronometroIniciado = false;
function actualizarCronometro() {
  cronometro.innerHTML = "Tiempo: " + segundos;
}

function iniciarCronometro() {
  cronometroIniciado = true;
  if (!intervalo) {
    intervalo = setInterval(function () {
      segundos++;
      actualizarCronometro();
    }, 1000);
  }
}

function pausarCronometro() {
  clearInterval(intervalo);
  intervalo = null;
}

function reiniciarCronometro() {
  pausarCronometro();
  segundos = 0;
  cronometroIniciado = false;
  actualizarCronometro();
}

// ---- personalizado
function jugarPersonalizado() {
  var inputFilas = document.getElementById("input-filas");
  var inputColumnas = document.getElementById("input-columnas");
  var inputMinas = document.getElementById("input-minas");

  var filas = parseInt(inputFilas.value, 10);
  var columnas = parseInt(inputColumnas.value, 10);
  var minas = parseInt(inputMinas.value, 10);

  var totalCeldas = filas * columnas;

  if (minas >= totalCeldas) {
    alert("La cantidad de minas debe ser menor al total de celdas");
    return;
  }
  if (isNaN(filas) || isNaN(columnas) || isNaN(minas)) {
    alert("Todos los valores deben ser numéricos");
    return;
  }
  if (filas < 2 || columnas < 2) {
    alert("Filas y columnas deben ser al menos 5");
    return;
  }

  if (filas > 20 || columnas > 20) {
    alert("Máximo permitido: 20 x 20");
    return;
  }
  if (minas < 1) {
    alert("Debe haber al menos una mina");
    return;
  }

  empezarJuegoUI(filas, columnas, minas);
}
