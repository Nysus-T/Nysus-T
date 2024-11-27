document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cambiar opacidad del hero al desplazarse
window.addEventListener('scroll', function() {
    const hero = document.getElementById('hero');
    const body = document.body;

    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollY < heroHeight) {
        const opacity = 1 - (scrollY / heroHeight);
        hero.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    } else {
        hero.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    }
});

// Validación del formulario con mejor manejo de errores
document.querySelector('form').addEventListener('submit', function(e) {
    const nombre = document.querySelector('input[name="nombre"]').value.trim();
    const correo = document.querySelector('input[name="email"]').value.trim();
    const mensaje = document.querySelector('textarea[name="mensaje"]').value.trim();

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!nombre || !correo || !mensaje) {
        alert('Por favor, llena todos los campos.');
        e.preventDefault();
    } else if (!emailRegex.test(correo)) {
        alert('Por favor, ingresa un correo válido.');
        e.preventDefault();
    } else {
        alert('¡Gracias por contactarnos!');
    }
});

// Carrusel de imágenes
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let index = 0;

function updateCarousel() {
    const totalImages = document.querySelectorAll('.carousel img').length;
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

nextBtn.addEventListener('click', function() {
    const totalImages = document.querySelectorAll('.carousel img').length;
    index = (index + 1) % totalImages;
    updateCarousel();
});

prevBtn.addEventListener('click', function() {
    const totalImages = document.querySelectorAll('.carousel img').length;
    index = (index - 1 + totalImages) % totalImages;
    updateCarousel();
});

// Efecto de escala al pasar el cursor sobre imágenes del carrusel
document.querySelectorAll('.carousel img').forEach(img => {
    img.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    img.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Cargar ofertas desde un archivo JSON
document.addEventListener('DOMContentLoaded', function() {
    fetch('ofertas.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.offers-container');
            container.innerHTML = '';
            data.offers.forEach(offer => {
                const card = document.createElement('div');
                card.className = 'offer-card';
                card.innerHTML = `
                    <h3>${offer.title}</h3>
                    <p>${offer.description}</p>
                    <p><strong>Validez:</strong> ${offer.validity}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al cargar ofertas:', error);
            const container = document.querySelector('.offers-container');
            container.innerHTML = '<p>Error al cargar las ofertas. Inténtalo más tarde.</p>';
        });
});

// Galería deslizante infinita
let galleryindex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');
const totalItems = galleryItems.length;
const galleryContainer = document.querySelector('.gallery');

function slideGallery() {
    galleryindex++;
    if (galleryindex >= totalItems / 2) {
        galleryindex = 0;
        galleryContainer.style.transition = 'none';
        galleryContainer.style.transform = `translateX(0)`;
    } else {
        galleryContainer.style.transition = 'transform 0.5s ease-in-out';
    }

    const offset = -galleryindex * (100 / (totalItems / 2));
    galleryContainer.style.transform = `translateX(${offset}%)`;
}

setInterval(slideGallery, 3000);
