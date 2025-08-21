

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
  dot.style.backgroundColor = '#2c3e50'; 
  if (index === 0){
    dot.classList.add('scale-125', 'bg-pink-700');
    dot.style.backgroundColor = '#dcbf6c';
  }
  dot.setAttribute('data-index', index);
  dotsContainer.appendChild(dot);
});

// Actualizar puntitos
function updateDots(index) {
  [...dotsContainer.children].forEach((dot, i) => {
    dot.className = 'w-3 h-3 rounded-full bg-pink-300 hover:bg-pink-500 transition-colors';
    if (i === index) {
      dot.classList.add('scale-125', 'bg-pink-700');
      dot.style.backgroundColor = '#dcbf6c';
    }
    else{
      dot.classList.remove('scale-125', 'bg-pink-700');
      dot.style.backgroundColor = '#2c3e50';
    }
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

function changeLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key]; // usamos innerHTML para permitir <br>
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });
    localStorage.setItem("selectedLang", lang);
}

// Evento clic en banderas
document.querySelectorAll(".lang-switcher img").forEach(flag => {
    flag.addEventListener("click", () => {
        changeLanguage(flag.dataset.lang);
    });
});

// Idioma guardado
window.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("selectedLang") || "es";
    changeLanguage(savedLang);
});

const translations = {
  es: {
    title: "Invitación de Boda de Andrea y Sergi",
    music: "🔊 Música",
    weMarry: "¡Nos Casamos!",
    joinUs: "Acompáñanos a celebrar el amor de <strong>Andrea & Sergi</strong>",
    date: "06 de Junio de 2026",
    place: "Can Vidal Rural, Sant Pau d'Ordal",
    countdownTitle: "¡Faltan...!",
    days: "días", hours: "horas", minutes: "minutos", seconds: "segundos",
    yourName: "Tu nombre",
    willAttendQ: "¿Asistirás?",
    yesAttend: "Preparad@ para celebrar",
    noAttend: "Me sabe mal, no podré asistir",
    confirm: "Confirmar asistencia",
    where: "¿Dónde es?",
    gallery: "Nuestra historia en imágenes",
    playlistTitle: "¡Ayúdanos a crear la Playlist de la Boda! 🎵",
    playlistText: "Haz clic en el link para añadir tus canciones favoritas a nuestra playlist colaborativa en Spotify.",
    playlistBtn: "➕ Agregar canciones en Spotify",
    dressTitle: "Dress Code 👗👔",
    dressText: "Nos gustaría que vinieras con un <strong>look elegante pero cómodo</strong>, con tonos neutros o pastel.",
    dress1: "Evita el blanco (¡es para la novia!)",
    dress2: "Zapatos cómodos para el baile 💃",
    dress3: "Si hace fresco, trae una chaqueta ligera",
    giftsTitle: "Detalles 🎁",
    giftsText: "Tenemos la casa llena de cosas... <strong>pero nos faltan sueños por cumplir!</strong> Si queréis ayudarnos, aquí tenéis nuestros datos",
    footerThanks: "Gracias por acompañarnos en este día tan especial 💕",
  },
  ca: {
    title: "Invitació de Casament d'Andrea i Sergi",
    music: "🔊 Música",
    weMarry: "Ens casem!",
    joinUs: "Acompanya'ns a celebrar l'amor de <strong>Andrea & Sergi</strong>",
    date: "06 de Juny de 2026",
    place: "Can Vidal Rural, Sant Pau d'Ordal",
    countdownTitle: "Falten...!",
    days: "dies", hours: "hores", minutes: "minuts", seconds: "segons",
    yourName: "El teu nom",
    willAttendQ: "Hi assistiràs?",
    yesAttend: "Preparat/ada per celebrar",
    noAttend: "Em sap greu, no podré assistir",
    confirm: "Confirmar assistència",
    where: "On és?",
    gallery: "La nostra història en imatges",
    playlistTitle: "Ajuda'ns a crear la Playlist del Casament! 🎵",
    playlistText: "Fes clic a l'enllaç per afegir les teves cançons preferides a la nostra playlist col·laborativa a Spotify.",
    playlistBtn: "➕ Afegir cançons a Spotify",
    dressTitle: "Dress Code 👗👔",
    dressText: "Ens agradaria que vinguessis amb un <strong>look elegant però còmode</strong>, amb tons neutres o pastel.",
    dress1: "Evita el blanc (és per a la núvia!)",
    dress2: "Sabates còmodes per al ball 💃",
    dress3: "Si refresca, porta una jaqueta lleugera",
    giftsTitle: "Detalls 🎁",
    giftsText: "Tenim la casa plena de coses... <strong>però ens falten somnis per complir!</strong> Si ens voleu ajudar, aquí teniu les nostres dades",
    footerThanks: "Gràcies per acompanyar-nos en aquest dia tan especial 💕",
  }
};