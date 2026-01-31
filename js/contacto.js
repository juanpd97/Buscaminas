document.addEventListener('DOMContentLoaded', function() {
  
  var hayErrores = false;

  var formulario = document.getElementById('formulario-contacto');
  
  formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    var nombre = document.getElementById('input-nombre-contacto').value;
    var email = document.getElementById('input-email').value;
    var mensaje = document.getElementById('input-mensaje').value;
    
    document.getElementById('error-nombre-contacto').textContent = '';
    document.getElementById('error-email').textContent = '';
    document.getElementById('error-mensaje').textContent = '';

    var soloLetrasNumeros = /^[a-zA-Z0-9\s]+$/;
    if (nombre === '' || !soloLetrasNumeros.test(nombre)) {
      document.getElementById('error-nombre-contacto').textContent = 'El nombre solo puede contener letras y números';
      hayErrores = true;
    }
    
    var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
      document.getElementById('error-email').textContent = 'Ingrese un email válido';
      hayErrores = true;
    }
    
    if (mensaje.length <= 5) {
      document.getElementById('error-mensaje').textContent = 'El mensaje debe tener más de 5 caracteres';
      hayErrores = true;
    }
    
    if (!hayErrores) {
      var mailtoLink = 'mailto:?subject=Contacto de ' + nombre + '&body=' + mensaje;
      window.location.href = mailtoLink;
      
      formulario.reset();
    }
  });
  
});