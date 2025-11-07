// Sombra del header al hacer scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Añadir clase 'scrolled' al header para estilos CSS
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
  });
}

// Animación de estadísticas al hacer scroll
const statsSection = document.querySelector('.stats');
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
  statNumbers.forEach(stat => {
    const target = parseFloat(stat.dataset.target);
    let current = 0;
    const duration = 1500; // Duración de la animación en ms
    const increment = target / (duration / 10); // Calcular incremento por cada 10ms

    const updateCount = () => {
      if (current < target) {
        current += increment;
        if (current > target) current = target; // Asegura que no se pase del target
        stat.textContent = target % 1 !== 0 ? current.toFixed(1) : Math.floor(current); // Para decimales
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
      }
    };
    requestAnimationFrame(updateCount);
  });
  statsAnimated = true;
}

// Observador para activar la animación de estadísticas
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      animateStats();
    }
  });
}, { threshold: 0.5 }); // La animación se activa cuando el 50% de la sección es visible

if (statsSection) {
  statsObserver.observe(statsSection);
}

// Navegación suave (Smooth scrolling)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });

    // Cerrar menú hamburguesa si está abierto
    const mainNav = document.querySelector('.main-nav');
    if (mainNav && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
    }
  });
});

// Menú hamburguesa para móvil
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mainNav = document.querySelector('.main-nav');

if (hamburgerMenu && mainNav) {
  hamburgerMenu.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
}

// Cerrar menú hamburguesa al hacer clic fuera
document.addEventListener('click', (e) => {
  if (mainNav && hamburgerMenu && !mainNav.contains(e.target) && !hamburgerMenu.contains(e.target) && mainNav.classList.contains('active')) {
    mainNav.classList.remove('active');
  }
});

// Resaltar el enlace de navegación activo al hacer scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.main-nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Ajuste de offset para que el resaltado sea más preciso al hacer scroll
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});
