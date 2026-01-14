'use strict'


var btnJugar = document.getElementById('btn-jugar');
btnJugar.addEventListener('click', () => {
    document.getElementById('pantalla-inicio').classList.remove('pantalla-activa');
    document.getElementById('pantalla-dificultad').classList.add('pantalla-activa');
});

var btnVolverInicio = document.getElementById('btn-volver-inicio');
btnVolverInicio.addEventListener('click', () => {
    document.getElementById('pantalla-inicio').classList.add('pantalla-activa');
    document.getElementById('pantalla-dificultad').classList.remove('pantalla-activa');
});

var btnRanking = document.getElementById('btn-ranking');
btnRanking.addEventListener('click', () => {
    document.getElementById('pantalla-inicio').classList.remove('pantalla-activa');
    document.getElementById('pantalla-ranking').classList.add('pantalla-activa');
});

var btnVolverInicio = document.getElementById('btn-volver-inicio-desde-ranking');
btnVolverInicio.addEventListener('click', () => {
    document.getElementById('pantalla-inicio').classList.add('pantalla-activa');
    document.getElementById('pantalla-ranking').classList.remove('pantalla-activa');
});




// Funciones para dibujar el tablero

var btnFacil = document.getElementById('btn-facil');
btnFacil.addEventListener('click', () => {
    document.getElementById('pantalla-dificultad').classList.remove('pantalla-activa');
    document.getElementById('pantalla-juego').classList.add('pantalla-activa');

    //dibujarTablero('facil');
});

var btnMedio = document.getElementById('btn-medio');
btnMedio.addEventListener('click', () => {
    document.getElementById('pantalla-dificultad').classList.remove('pantalla-activa');
    document.getElementById('pantalla-juego').classList.add('pantalla-activa');

    //dibujarTablero('medio');
});

var btnDificil = document.getElementById('btn-dificil');
btnDificil.addEventListener('click', () => {
    document.getElementById('pantalla-dificultad').classList.remove('pantalla-activa');
    document.getElementById('pantalla-juego').classList.add('pantalla-activa');

    //dibujarTablero('dificil');
});

var btnDificultadPersonalizada = document.getElementById('btn-dificultad-personalizada');
btnDificultadPersonalizada.addEventListener('click', () => {
    document.getElementById('pantalla-dificultad').classList.remove('pantalla-activa');
    document.getElementById('pantalla-personalizado').classList.add('pantalla-activa');
});

var btnVolverDificultadDesdePersonalizado = document.getElementById('btn-volver-dificultad-desde-personalizado');
btnVolverDificultadDesdePersonalizado.addEventListener('click', () => {
    document.getElementById('pantalla-dificultad').classList.add('pantalla-activa');
    document.getElementById('pantalla-personalizado').classList.remove('pantalla-activa');
});





function dibujarTablero(dificultad) {
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = ''; // Limpiar el tablero antes de dibujar

    let filas, columnas;
    if (dificultad === 'facil') {
        filas = 8;
        columnas = 8;
    } else if (dificultad === 'medio') {
        filas = 16;
        columnas = 16;
    } else if (dificultad === 'dificil') {
        filas = 16;
        columnas = 30;
    }

    tablero.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
    tablero.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;

    for (let i = 0; i < filas * columnas; i++) {
        const celda = document.createElement('div');
        celda.classList.add('celda');
        tablero.appendChild(celda);
    }
}   
