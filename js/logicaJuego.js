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

function expandir(tablero, x, y) {
  //verificar si esta abierta
  if (tablero[x][y].abierta === true) {
    return;
  }
  //verificar que este dentro de los limites
  if (tablero[x] === undefined || tablero[x][y] === undefined) {
        return;
    }
  //abro la celda y la verificacion de si es una mina la hago fuera, antes de llamar la funcion
  tablero[x][y].abierta = true;

  cantidad = minasVecinas(tablero, x, y);
  tablero[x][y].minasVecinas = cantidad;

  //si tiene minas vecinas evito que se siga expandiendo  
  if (cantidad !== 0) {
        return;
    }
  
    for (i = x - 1; i <= x + 1; i++) {
        for (j = y - 1; j <= y + 1; j++) {
            if (i === x && j === y) {
                continue;
            }

            expandir(tablero, i, j);
        }
    }
}


function empezarJuego(x,y,cantMinas){
    tablero = crearTablero(x,y);
    cantidadMinas = cantMinas;
    colocarMina(cantidadMinas,tablero);
};

function presionarCelda(x,y){
    console.log(x,y);
    console.log(cantidadMinas);

    if(tablero[x][y].tieneMina){
      console.log('perdiste');  
    } else {
      expandir(tablero,x,y);
    }

    ;
    
};