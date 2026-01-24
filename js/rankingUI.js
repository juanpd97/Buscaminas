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