"use strict";
var segundos = 0;
var intervalo = null;
var cronometroIniciado = false;
function actualizarCronometro() {
  cronometro.innerHTML = segundos;
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
