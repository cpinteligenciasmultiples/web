let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 3000);

document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita la recarga
  
    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const messageDiv = document.getElementById('form-message');
    const formData = new FormData(form);
  
    // Validación extra (opcional)
    const nombre = formData.get('nombre').trim();
    const email = formData.get('email').trim();
    const mensaje = formData.get('mensaje').trim();
  
    if (!nombre || !email || !mensaje) {
      showMessage('Por favor completa todos los campos.', 'error');
      return;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showMessage('Correo electrónico no válido.', 'error');
      return;
    }
  
    // Cambiar botón mientras se envía
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Enviando...';
    submitBtn.disabled = true;
    messageDiv.style.display = 'none';
  
    try {
      const response = await fetch('https://formspree.io/f/mjgerqdb', { // <-- CAMBIA POR TU ENDPOINT
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
  
      if (response.ok) {
        showMessage('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
        form.reset(); // Limpiar formulario
      } else {
        const data = await response.json();
        if (data.errors) {
          showMessage('Error: ' + data.errors.map(e => e.message).join(', '), 'error');
        } else {
          showMessage('Hubo un problema al enviar. Intenta de nuevo.', 'error');
        }
      }
    } catch (error) {
      showMessage('Error de conexión. Verifica tu internet.', 'error');
    } finally {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    }
  });
  
  function showMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.style.display = 'block';
    messageDiv.textContent = text;
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
  }

  // Seleccionar todos los botones "Leer más"
document.querySelectorAll('.btn-mas').forEach(button => {
    button.addEventListener('click', function() {
      // Obtener el ID del detalle desde data-target
      const targetId = this.getAttribute('data-target');
      const detalle = document.getElementById(targetId);
      
      // Alternar clase 'mostrar' en el detalle
      detalle.classList.toggle('mostrar');
      
      // Cambiar texto del botón
      if (detalle.classList.contains('mostrar')) {
        this.textContent = 'Leer menos';
      } else {
        this.textContent = 'Leer más';
      }
    });
  });
