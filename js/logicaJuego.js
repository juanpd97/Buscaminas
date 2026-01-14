'use strict'



function crearTablero(x,y){

    var tablero = [];

    for(var i=0; i<x ;i++){
        tablero[i]=[]
        for(var j=0; j<y; j++){

            var casilla = {
                tieneMina: false,
                abierta: false,
                bandera: false,
                minasVecinas: 0
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

function expandir(tablero,x,y){

    if(tablero[x][y].abierta === true){
        return;
    }
    
    if (tablero[x][y].cantMinas !== 0) {
        tablero[x][y].abierta = true;

    } else {

        for(var i= x-1 ; i<= x+1 ; i++){
            for(var j = y-1; j<= y+1; j++){
                if (i === x && j === y) {
                    continue;
                }

                if (tablero[i] === undefined || tablero[i][j] === undefined) {
                    continue;
                } 

                expandir(tablero,i,j);
                
            }
        }

    }   

}
