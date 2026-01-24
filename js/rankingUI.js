function guardarPartida(nombre, tiempo, dificultad) {
    var fechaActual = new Date();
    
    var nuevaPartida = {
        nombre: nombre,
        duracion: tiempo,
        modo: dificultad,
        fecha: fechaActual.toLocaleDateString(),
        hora: fechaActual.toLocaleTimeString()
    };

    var historialPartidas = localStorage.getItem("historialPartidas");
    var historial = historialPartidas ? JSON.parse(historialPartidas) : [];

    
    historial.push(nuevaPartida);
    localStorage.setItem("historialPartidas", JSON.stringify(historial));
}



function mostrarRanking() {
    var historialPartidas = localStorage.getItem("historialPartidas");
    var historial = historialPartidas ? JSON.parse(historialPartidas) : [];
    var listaRanking = document.getElementById("lista-ranking");
    
    if (historial.length === 0) {
        listaRanking.innerHTML = "<p>No hay partidas guardadas aún.</p>";
        return;
    }
    
    // Ordenar por duración
    historial.sort(function(a, b) {
        return a.duracion - b.duracion;
    });
    
    var tabla = "<table><thead><tr><th>Posición</th><th>Jugador</th><th>Duración</th><th>Modo</th><th>Fecha</th><th>Hora</th></tr></thead><tbody>";
    
    for (var i = 0; i < historial.length; i++) {
        var partida = historial[i];
        tabla += "<tr>";
        tabla += "<td>" + (i + 1) + "</td>";
        tabla += "<td>" + partida.nombre + "</td>";
        tabla += "<td>" + partida.duracion + "</td>";
        tabla += "<td>" + partida.modo + "</td>";
        tabla += "<td>" + partida.fecha + "</td>";
        tabla += "<td>" + partida.hora + "</td>";
        tabla += "</tr>";
    }
    
    tabla += "</tbody></table>";
    listaRanking.innerHTML = tabla;
}