"use strict";

var tablero;
var cantidadMinas;

function crearTablero(x, y) {
  var tablero = [];

  for (var i = 0; i < x; i++) {
    tablero[i] = [];
    for (var j = 0; j < y; j++) {
      var casilla = {
        tieneMina: false,
        abierta: false,
        bandera: false,
        minasVecinas: 0,
      };

      tablero[i][j] = casilla;
    }
  }

  return tablero;
}

function colocarMina(cantMinas, tablero) {
  var x, y;
  var minasColocadas = 0;

  while (minasColocadas < cantMinas) {
    x = Math.floor(Math.random() * tablero.length);
    y = Math.floor(Math.random() * tablero[0].length);

    if (tablero[x][y].tieneMina === false) {
      tablero[x][y].tieneMina = true;
      minasColocadas++;
    }
  }
}

function minasVecinas(tablero, x, y) {
  //i
  var contador = 0;

  for (var i = x - 1; i <= x + 1; i++) {
    for (var j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) {
        continue;
      }

      if (tablero[i] === undefined || tablero[i][j] === undefined) {
        continue;
      }

      if (tablero[i][j].tieneMina === true) {
        contador++;
      }
    }
  }

  return contador;
}

function expandir(tablero, x, y, celdasReveladas) {
  var cantidad;

  // checkear Límites
  if (tablero[x] === undefined || tablero[x][y] === undefined) {
    return;
  }

  //checkear que no sea mina
  if (tablero[x][y].tieneMina) {
    return;
  }

  //checkae que no tenga bandera
  if (tablero[x][y].bandera === true) {
    return;
  }

  // no reabrir
  if (tablero[x][y].abierta) {
    return;
  }

  //abrir celda y agregar al vector para luego la UI sepa que casillas abrir
  tablero[x][y].abierta = true;
  celdasReveladas.push({ x: x, y: y });

  cantidad = minasVecinas(tablero, x, y);
  tablero[x][y].minasVecinas = cantidad;

  if (cantidad !== 0) {
    return;
  }

  // expandir casillas vecinas
  for (var i = x - 1; i <= x + 1; i++) {
    for (var j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) continue;
      expandir(tablero, i, j, celdasReveladas);
    }
  }
}

function empezarJuego(x, y, cantMinas) {
  tablero = crearTablero(x, y);
  cantidadMinas = cantMinas;
  colocarMina(cantidadMinas, tablero);
}

function presionarCelda(x, y) {
  var celdasReveladas = [];

  if (tablero[x][y].bandera !== true) {
    if (tablero[x][y].tieneMina) {
      return { estado: "gameOver" };
    }

    if (tablero[x][y].bandera === false) {
      expandir(tablero, x, y, celdasReveladas);

      return {
        estado: "siguienteTurno",
        casillasARevelar: celdasReveladas,
      };
    }
  }
  return {};
}

function bandera(x, y) {
  tablero[x][y].bandera = !tablero[x][y].bandera;
  return !tablero[x][y].bandera;
}
function abierta(x, y) {
  return tablero[x][y].abierta;
}
