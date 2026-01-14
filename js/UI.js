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