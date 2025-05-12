// Novo sistema de corações com Intersection Observer
let heartsActive = false;

function criarCoracao() {
    const coracao = document.createElement('div');
    coracao.innerHTML = '❤️';
    coracao.className = 'coracao';

    const startX = Math.random() * window.innerWidth;
    coracao.style.left = `${startX}px`;

    document.body.appendChild(coracao);

    setTimeout(() => coracao.remove(), 5000);
}

function startHearts() {
    if(heartsActive) return;
    heartsActive = true;

    const interval = setInterval(() => {
        for(let i = 0; i < 3; i++) {
            criarCoracao();
        }
    }, 500);

    setTimeout(() => clearInterval(interval), 20000);
}

// Observador para a seção principal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            startHearts();
        }
    });
}, { threshold: 0.3 });

observer.observe(document.querySelector('.frase-aniversario'));

// Fallback para scroll
window.addEventListener('scroll', () => {
    if(window.scrollY > 200 && !heartsActive) {
        startHearts();
    }
});

// Sistema de Fullscreen
document.querySelectorAll('.polaroid').forEach(polaroid => {
    polaroid.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const content = document.createElement('div');
        content.className = 'overlay-content';

        const img = new Image();
        img.src = polaroid.querySelector('img').src;
        img.alt = polaroid.querySelector('img').alt;

        const caption = document.createElement('div');
        caption.className = 'overlay-caption';
        caption.textContent = polaroid.querySelector('p').textContent;

        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';

        content.appendChild(img);
        content.appendChild(caption);
        overlay.appendChild(content);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);

        setTimeout(() => overlay.classList.add('active'), 10);

        const close = () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 500);
        };

        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', (e) => e.target === overlay && close());
        document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
    });
});