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

function mostrarRanking(columna) {
  if (!columna) {
    columna = "duracion";
  }
  var historialPartidas = localStorage.getItem("historialPartidas");
  var historial = historialPartidas ? JSON.parse(historialPartidas) : [];
  var listaRanking = document.getElementById("lista-ranking");

  if (historial.length === 0) {
    listaRanking.innerHTML = "<p>No hay partidas guardadas</p>";
    return;
  }

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

  var tabla = `
        <table>
            <thead>
                <tr>
                    <th onclick="ordenarPor('nombre')">Jugador</th>
                    <th onclick="ordenarPor('duracion')">Duración</th>
                    <th onclick="ordenarPor('dificultad')">Modo</th>
                    <th onclick="ordenarPor('timestamp')">Fecha</th>
                    <th onclick="ordenarPor('hora')">Hora</th>
                </tr>
            </thead>
            <tbody>
    `;

  for (var i = 0; i < historial.length; i++) {
    var p = historial[i];
    tabla += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.duracion}</td>
                <td>${p.dificultad}</td>
                <td>${p.fecha}</td>
                <td>${p.hora}</td>
            </tr>
        `;
  }

  tabla += "</tbody></table>";
  listaRanking.innerHTML = tabla;
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
