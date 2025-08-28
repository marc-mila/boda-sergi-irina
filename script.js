

// Cuenta regresiva
const countdown = document.getElementById("countdown");
const weddingDate = new Date("2026-06-06T00:00:00");

// Manejo del formulario
document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const asistencia = document.getElementById("asistencia").value;
  const dormir = document.getElementById('dormir') ? document.getElementById('dormir').value : "";

  const respuesta = document.getElementById("respuesta");

  if (!nombre) {
        alert("Por favor, ingresa tu nombre.");
        document.getElementById('nombre').focus();
        return;
    }

    if (!asistencia) {
        alert("Por favor, indica si asistirás.");
        document.getElementById('asistencia').focus();
        return;
    }

    if (!dormir) {
        alert("Por favor, indica si te quedarás a dormir.");
        // Mover scroll al componente de dormir
        document.getElementById('dormir').scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.getElementById('dormir').focus();
        return;
    }

  emailjs.send("service_7wbtrnq", "template_nnx2o8q", {
    nombre: nombre,
    asistencia: asistencia,
    dormir: dormir
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

let isPlaying = false;

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

const galleryImages = [
  'fotos/foto1.jpg',
  'fotos/foto2.jpg',
  'fotos/foto3.jpg',
  'fotos/foto4.jpg',
  'fotos/foto5.jpg',
  'fotos/foto6.jpg',
  'fotos/foto7.jpg',
  'fotos/foto8.jpg',
  'fotos/foto9.jpg',
  'fotos/foto10.jpg',
  'fotos/foto11.jpg',
  'fotos/foto12.jpg',
  'fotos/foto13.jpg',
  'fotos/foto14.jpg',
  'fotos/foto15.jpg',
  'fotos/foto16.jpg'
];

const galleryEls = document.querySelectorAll(".gallery-img");
const dotsContainer = document.getElementById('gallery-dots');
let currentIndex = 0;
let slideInterval;

// Número de imágenes visibles según pantalla
function imagesPerSlide() {
  return window.innerWidth < 768 ? 1 : 3;
}

// Crear los puntitos
function createDots() {
  dotsContainer.innerHTML = '';
  const slides = galleryImages.length; // un dot por cada imagen de inicio
  for (let i = 0; i < slides; i++) {
    const dot = document.createElement('button');
    dot.className = 'w-3 h-3 rounded-full transition-colors';
    if (i === 0) {
      dot.classList.add('scale-125', 'bg-pink-700');
      dot.style.backgroundColor = '#a87d3e';
    } else {
      dot.style.backgroundColor = '#2c3e50';
    }
    dot.setAttribute('data-index', i);
    dotsContainer.appendChild(dot);
  }
}

createDots();

// Actualizar puntitos
function updateDots(index) {
  [...dotsContainer.children].forEach((dot, i) => {
    dot.className = 'w-3 h-3 rounded-full transition-colors';
    if (i === index) {
      dot.classList.add('scale-125', 'bg-pink-700');
      dot.style.backgroundColor = '#a87d3e';
    } else {
      dot.style.backgroundColor = '#2c3e50';
    }
  });
}

// Mostrar imágenes según índice de inicio
function showSlide(startIndex) {
  const perSlide = imagesPerSlide();
  for (let i = 0; i < perSlide; i++) {
    const imgIndex = (startIndex + i) % galleryImages.length;

    galleryEls[i].classList.remove('opacity-100');
    galleryEls[i].classList.add('opacity-0');

    setTimeout(() => {
      galleryEls[i].src = galleryImages[imgIndex];
      galleryEls[i].classList.remove('opacity-0');
      galleryEls[i].classList.add('opacity-100');
    }, 300);
  }

  updateDots(startIndex);
  currentIndex = startIndex;
}

// Iniciar el intervalo de rotación
function startInterval() {
  slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showSlide(currentIndex);
  }, 5000);
}

// Clic en los puntitos
dotsContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const index = parseInt(e.target.getAttribute('data-index'));
    showSlide(index);

    // Resetear el intervalo
    clearInterval(slideInterval);
    startInterval();
  }
});

// Ajustar al cambiar tamaño de pantalla
window.addEventListener('resize', () => {
  createDots();
  showSlide(currentIndex);
});

// Inicializar la galería
showSlide(0);
startInterval();


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

const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");
  const modal = document.getElementById("giftModal");

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

const translations = {
  es: {
    title: "Invitación de Boda de Andrea y Sergi",
    music: "🔇 Música",
    weMarry: "¡Nos Casamos!",
    joinUs: "Acompáñanos a celebrar el amor de <strong>Andrea & Sergi</strong>",
    date: "📅 06 de Junio de 2026",
    place: "📍 Can Vidal Rural, Sant Pau d'Ordal",
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
    playlistBtn: "Spotify",
    dressTitle: "Dress Code 👗👔",
    dressText: "Nos gustaría que vinieras con un <strong>look elegante pero cómodo</strong>, con vibes primaverales ☀️🌴",
    dress1: "Evita el blanco (¡es para la novia!)",
    dress2: "Zapatos cómodos para el baile 💃",
    dress3: "Si hace fresco, trae una chaqueta ligera",
    sleepTitle: "¿Quieres quedarte a dormir? 💤🏕️",
    sleep1: "Si te quedas, tenemos una sorpresita para ti...",
    sleep2: "Te llegará un whatsapp con más información para confirmar tu estancia.",
    willSleepQ: "¿Te quedarás?",
    yesSleep: "Me quedaré a dormir",
    noSleep: "No me quedaré a dormir",
    giftsTitle: "Detalles 🎁",
    giftsText1: "Tenemos la casa llena de cosas... <strong>pero nos faltan sueños por cumplir!</strong>",
    giftsText2: "Si queréis ayudarnos, aquí tenéis nuestros datos",
    giftsDetails: "Formas de regalar",
    infoText: "📞 Si tienes dudas, necesitas más información o quieres contactarnos sobre alguna alergia o intolerancia, contáctanos a los siguientes telefonos",
    contactInfo: "🤵🏻: 661109275 / 👰🏼‍♀️: 658197440",
    footerThanks: "Gracias por acompañarnos en este día tan especial 💕",
  },
  ca: {
    title: "Invitació de Casament d'Andrea i Sergi",
    music: "🔇 Música",
    weMarry: "Ens casem!",
    joinUs: "Acompanya'ns a celebrar l'amor de <strong>Andrea & Sergi</strong>",
    date: "📅 06 de Juny de 2026",
    place: "📍 Can Vidal Rural, Sant Pau d'Ordal",
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
    playlistBtn: "Spotify",
    dressTitle: "Dress Code 👗👔",
    dressText: "Ens agradaria que vinguessis amb un <strong>look elegant però còmode</strong>, amb vibes primaverals ☀️🌴",
    dress1: "Evita el blanc (és per a la núvia!)",
    dress2: "Sabates còmodes pel ball 💃",
    dress3: "Si refresca, porta una jaqueta lleugera",
    sleepTitle: "Vols quedar-te a dormir? 💤🏕️",
    sleep1: "Si et quedes, tenim una sorpreseta per a tu...",
    sleep2: "T'arribarà un whatsapp amb més informació per confirmar la teva estada.",
    willSleepQ: "Et quedaràs?",
    yesSleep: "Em quedaré a dormir",
    noSleep: "No em quedaré a dormir",
    giftsTitle: "Detalls 🎁",
    giftsText1: "Tenim la casa plena de coses... <strong>però ens falten somnis per complir!</strong>",
    giftsText2: "Si ens voleu ajudar, aquí teniu les nostres dades",
    giftsDetails: "Formes de regalar",
    infoText: "📞 Si tens dubtes, necessites més informació o vols contactar-nos sobre alguna al·lèrgia o intolerància, contacta'ns als següents telèfons",
    contactInfo: "🤵🏻: 661109275 / 👰🏼‍♀️: 658197440",
    footerThanks: "Gràcies per acompanyar-nos en aquest dia tan especial 💕",
  }
};