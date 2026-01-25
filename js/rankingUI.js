function guardarPartida(nombre, tiempo, modo) {
  var fechaActual = new Date();

  var nuevaPartida = {
    nombre: nombre,
    duracion: tiempo,
    dificultad: modo,
    fecha: fechaActual.toLocaleDateString(),
    hora: fechaActual.toLocaleTimeString(),
    timestamp: fechaActual.getTime(),
  };

  var historialPartidas = localStorage.getItem("historialPartidas");
  var historial = historialPartidas ? JSON.parse(historialPartidas) : [];

  historial.push(nuevaPartida);
  localStorage.setItem("historialPartidas", JSON.stringify(historial));
}

var ordenActual = {
  columna: null,
  ascendente: true,
};

var filtroDificultad = "todas";

function mostrarRanking(columna) {
  if (!columna) {
    columna = "duracion";
  }

  var historialPartidas = localStorage.getItem("historialPartidas");
  var historialOriginal = historialPartidas
    ? JSON.parse(historialPartidas)
    : [];
  var listaRanking = document.getElementById("lista-ranking");

  /* ---- NO HAY PARTIDAS ---- */
  if (historialOriginal.length === 0) {
    listaRanking.innerHTML = "<p>No hay partidas guardadas</p>";
    return;
  }

  /* ---- COPIA PARA TRABAJAR ---- */
  var historial = historialOriginal.slice(0);

  /* ---- FILTRAR POR DIFICULTAD ---- */
  if (filtroDificultad !== "todas") {
    var filtrado = [];
    for (var i = 0; i < historial.length; i++) {
      if (historial[i].dificultad === filtroDificultad) {
        filtrado.push(historial[i]);
      }
    }
    historial = filtrado;
  }

  /* ---- ORDENAR ---- */
  historial.sort(function (a, b) {
    var valorA = a[columna];
    var valorB = b[columna];

    if (typeof valorA === "string") {
      valorA = valorA.toLowerCase();
      valorB = valorB.toLowerCase();
    }

    if (valorA < valorB) return ordenActual.ascendente ? -1 : 1;
    if (valorA > valorB) return ordenActual.ascendente ? 1 : -1;
    return 0;
  });

  /* ---- CONSTRUIR TABLA ---- */
  var tabla = "";
  tabla += "<table>";
  tabla += "<thead>";
  tabla += "<tr>";

  tabla += "<th onclick=\"ordenarPor('nombre')\">Jugador</th>";
  tabla += "<th onclick=\"ordenarPor('duracion')\">Duración</th>";

  /* ---- COLUMNA MODO CON SELECT ---- */
  tabla += "<th>";
  tabla += "Modo:";
  tabla += '<select id="filtro-dificultad" onchange="cambiarFiltro()">';
  tabla += '<option value="todas">Todas</option>';
  tabla += '<option value="facil">Fácil</option>';
  tabla += '<option value="medio">Medio</option>';
  tabla += '<option value="dificil">Difícil</option>';
  tabla += '<option value="personalizado">Personalizado</option>';
  tabla += "</select>";
  tabla += "</th>";

  tabla += "<th onclick=\"ordenarPor('timestamp')\">Fecha</th>";
  tabla += "<th onclick=\"ordenarPor('hora')\">Hora</th>";

  tabla += "</tr>";
  tabla += "</thead>";
  tabla += "<tbody>";

  /* ---- CUERPO DE LA TABLA ---- */
  if (historial.length === 0) {
    tabla += "<tr>";
    tabla += '<td colspan="5" style="text-align:center;">';
    tabla += "No hay partidas guardadas para este modo";
    tabla += "</td>";
    tabla += "</tr>";
  } else {
    for (var j = 0; j < historial.length; j++) {
      var p = historial[j];
      tabla += "<tr>";
      tabla += "<td>" + p.nombre + "</td>";
      tabla += "<td>" + p.duracion + "</td>";
      tabla += "<td>" + p.dificultad + "</td>";
      tabla += "<td>" + p.fecha + "</td>";
      tabla += "<td>" + p.hora + "</td>";
      tabla += "</tr>";
    }
  }

  tabla += "</tbody></table>";
  listaRanking.innerHTML = tabla;

  /* ---- RESTAURAR VALOR DEL SELECT ---- */
  var select = document.getElementById("filtro-dificultad");
  if (select) {
    select.value = filtroDificultad;
  }
}

function ordenarPor(columna) {
  if (ordenActual.columna === columna) {
    ordenActual.ascendente = !ordenActual.ascendente;
  } else {
    ordenActual.columna = columna;
    ordenActual.ascendente = true;
  }

  mostrarRanking(columna);
}

function cambiarFiltro() {
  var select = document.getElementById("filtro-dificultad");
  filtroDificultad = select.value;
  mostrarRanking(ordenActual.columna);
}
