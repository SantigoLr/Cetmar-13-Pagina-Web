document.addEventListener('DOMContentLoaded', function () {
  const formLogin = document.getElementById('formLogin');

  formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();

    const correo = document.getElementById('Correo').value.trim();
    const contraseña = document.getElementById('Contraseña').value;

    if (!correo || !contraseña) {
      alert('Por favor completa todos los campos.');
      return;
    }

    try {
      const respuesta = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña })
      });

      const data = await respuesta.json();

      if (data.ok) {
        // Guardar al usuario y redirigir
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        window.location.href = '/HTML/inicio.html';
      } else {
        alert(data.mensaje);
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Error al conectar con el servidor.');
    }
  });
});
