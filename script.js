

// Cuenta regresiva
const countdown = document.getElementById("countdown");
const weddingDate = new Date("2026-06-06T00:00:00");

// Manejo del formulario
document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const asistencia = document.getElementById("asistencia").value;
  const respuesta = document.getElementById("respuesta");

  emailjs.send("service_7wbtrnq", "template_nnx2o8q", {
    nombre: nombre,
    asistencia: asistencia
  })
  .then(() => {
    respuesta.textContent = `¡Gracias, ${nombre}! Hemos recibido tu confirmación 💌`;
    respuesta.classList.remove("text-red-600");
    respuesta.classList.add("text-green-600");
  }, (error) => {
    console.error("Error al enviar con EmailJS:", error);
    respuesta.textContent = "Hubo un error al enviar tu confirmación. Inténtalo más tarde.";
    respuesta.classList.remove("text-green-600");
    respuesta.classList.add("text-red-600");
  });

  this.reset();
});

// 🎵 Música de fondo
const bgMusic = document.getElementById("bg-music");
const toggleMusicBtn = document.getElementById("toggleMusic");

let isPlaying = true;

toggleMusicBtn.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    toggleMusicBtn.textContent = "🔇 Música";
  } else {
    bgMusic.play();
    toggleMusicBtn.textContent = "🔊 Música";
  }
  isPlaying = !isPlaying;
});

// 🎞️ Galería rotativa automática
const galleryImages = [
  'fotos/1.jpg',
  'fotos/2.jpg',
  'fotos/3.jpg'
];

let currentImageIndex = 0;
const galleryEl = document.getElementById('gallery-image');
const dotsContainer = document.getElementById('gallery-dots');

// Crear los puntitos
galleryImages.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.className = 'w-3 h-3 rounded-full bg-pink-300 hover:bg-pink-500 transition-colors';
  if (index === 0) dot.classList.add('scale-125', 'bg-pink-700');
  dot.setAttribute('data-index', index);
  dotsContainer.appendChild(dot);
});

// Actualizar puntitos
function updateDots(index) {
  [...dotsContainer.children].forEach((dot, i) => {
    dot.className = 'w-3 h-3 rounded-full bg-pink-300 hover:bg-pink-500 transition-colors';
    if (i === index) dot.classList.add('scale-125', 'bg-pink-700');
  });
}

// Cambiar imagen
function showImage(index) {
  galleryEl.classList.remove('opacity-100');
  galleryEl.classList.add('opacity-0');

  setTimeout(() => {
    currentImageIndex = index;
    galleryEl.src = galleryImages[currentImageIndex];
    galleryEl.classList.remove('opacity-0');
    galleryEl.classList.add('opacity-100');
    updateDots(currentImageIndex);
  }, 300);
}

// Clic en los puntitos
dotsContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const index = parseInt(e.target.getAttribute('data-index'));
    showImage(index);
  }
});

// Rotación automática
setInterval(() => {
  let nextIndex = (currentImageIndex + 1) % galleryImages.length;
  showImage(nextIndex);
}, 5000);

// ⏳ Cuenta atrás para la boda
function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = '<p class="text-xl text-pink-700 font-bold">¡Ya estamos casados! 💍</p>';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// 📩 Enviar sugerencia musical
const musicForm = document.getElementById('music-form');
const musicMessage = document.getElementById('music-message');
const nombreMusic = document.getElementById("nombreMusic").value;
const suggestion = document.getElementById("suggestion").value;
const respuestaMusic = document.getElementById("respuestaMusic");

musicForm.addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.send('service_7wbtrnq', 'template_icx5zlw', {
    nombre: nombreMusic,
    suggestion: suggestion
  })
  .then(() => {
    respuestaMusic.textContent = `¡Gracias, ${nombreMusic}! Hemos recibido tu sugerencia`;
    respuestaMusic.classList.remove("text-red-600");
    respuestaMusic.classList.add("text-green-600");
  }, (error) => {
    console.error("Error al enviar con EmailJS:", error);
    respuestaMusic.textContent = "Hubo un error al enviar tu sugerencia. Inténtalo más tarde.";
    respuestaMusic.classList.remove("text-green-600");
    respuestaMusic.classList.add("text-red-600");
  });

  this.reset();
});

