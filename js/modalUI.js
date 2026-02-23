"use strict";

function mostrarModal(titulo, mensaje, botones) {
  var elModal = document.getElementById("modal-juego");
  var elTitulo = document.getElementById("modal-titulo");
  var elCuerpo = document.getElementById("modal-cuerpo");
  var elContenedorBotones = document.getElementById("modal-botones");

  elTitulo.innerText = titulo;
  elCuerpo.innerHTML = "<p>" + mensaje + "</p>";
  elContenedorBotones.innerHTML = "";

  for (var i = 0; i < botones.length; i++) {
    var btn = document.createElement("button");
    btn.innerText = botones[i].texto;
    btn.className = "btn-modal";
    btn.onclick = (function (accion) {
      return function () {
        elModal.style.display = "none";
        if (accion) accion();
      };
    })(botones[i].click);
    elContenedorBotones.appendChild(btn);
  }

  elModal.style.display = "block";
}

function modalDerrota() {
  mostrarModal("¡GAME OVER!", "Pisaste una mina", [
    {
      texto: "Reiniciar",
      click: function () {
        empezarJuegoUI(
          configuracionJuego.x,
          configuracionJuego.y,
          configuracionJuego.cantMinas,
          dificultad,
        );
      },
    },
    {
      texto: "Inicio",
      click: function () {
        mostrarPantalla("pantalla-inicio");
      },
    },
  ]);
}

function modalMenuJuego() {
  pausarCronometro();
  mostrarModal("MENÚ", "", [
    {
      texto: "Continuar",
      click: function () {
        iniciarCronometro();
      },
    },
    {
      texto: "opciones",
      click: function () {
        modalOpciones();
      },
    },
    {
      texto: "Salir",
      click: function () {
        mostrarPantalla("pantalla-inicio");
      },
    },
  ]);
}

function modalVictoria() {
  var elModal = document.getElementById("modal-juego");

  mostrarModal(
    "¡VICTORIA!",
    '<input type="text" id="input-nombre" placeholder="Ingresa tu nombre">' +
      '<p id="error-nombre"></p>',
    [
      {
        texto: "Registrar",
        click: function () {
          var inputNombre = document.getElementById("input-nombre");
          var nombre = inputNombre.value.trim();
          var errorMsg = document.getElementById("error-nombre");

          // Limpiar mensaje de error anterior
          errorMsg.innerText = "";

          // Validación: no vacío
          if (nombre.length === 0) {
            errorMsg.innerText = "El nombre no puede estar vacío.";
            elModal.style.display = "block";
            inputNombre.focus();
            return;
          }

          // Validación: mínimo 3 caracteres
          if (nombre.length < 3) {
            errorMsg.innerText = "El nombre debe tener al menos 3 caracteres.";
            elModal.style.display = "block";
            inputNombre.focus();
            return;
          }

          // Validación: máximo 20 caracteres
          if (nombre.length > 20) {
            errorMsg.innerText =
              "El nombre no puede tener más de 20 caracteres.";
            elModal.style.display = "block";
            inputNombre.focus();
            return;
          }

          // Validación: solo letras, números y espacios
          var soloValidos = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$/;
          if (!soloValidos.test(nombre)) {
            errorMsg.innerText =
              "El nombre solo puede contener letras, números y espacios.";
            elModal.style.display = "block";
            return;
          }

          // console.log(nombre, " - ",segundos,'-',dificultad);
          guardarPartida(nombre, segundos, dificultad);
          return;
        },
      },
      {
        texto: "Menu principal",
        click: function () {
          mostrarPantalla("pantalla-inicio");
        },
      },
    ],
  );

  document.getElementById("input-nombre").focus();
}

function modalOpciones() {
  mostrarModal("OPCIONES", "", [
    {
      texto: "Graficos",
      click: function () {
        cambiarGraficos();
        modalOpciones();
      },
    },
    {
      texto: "Modo oscuro",
      click: function () {
        modoOscuro();
        modalOpciones();
      },
    },
    {
      texto: "Volver",
      click: function () {
        modalMenuJuego();
      },
    },
  ]);
}
