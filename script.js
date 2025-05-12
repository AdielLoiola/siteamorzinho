let heartsActive = false;

function criarCoracao() {
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.className = 'coracao';
  const xStart = Math.random() * window.innerWidth;
  heart.style.setProperty('--x', `${Math.random() > 0.5 ? '+' : '-'}${20 + Math.random() * 20}vw`);
  heart.style.left = `${xStart}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4500);
}

function startHearts() {
  if (heartsActive) return;
  heartsActive = true;
  const interval = setInterval(criarCoracao, 300);
  setTimeout(() => clearInterval(interval), 18000);
}

// Disparadores de animação
const obs = new IntersectionObserver(entries =>
  entries.forEach(e => e.isIntersecting && startHearts()), { threshold: 0.4 });
obs.observe(document.getElementById('hero'));

window.addEventListener('scroll', () => {
  if (window.scrollY > 150) startHearts();
});

document.addEventListener('click', () => startHearts(), { once: true });

// Fullscreen simplificado da galeria
function toggleOverlay(src, caption) {
  const o = document.createElement('div');
  o.className = 'overlay';
  o.innerHTML = `
    <div class="overlay-content">
      <img src="${src}" alt="${caption}"/>
      <p class="overlay-caption">${caption}</p>
      <div class="close-btn">&times;</div>
    </div>`;
  document.body.append(o);
  requestAnimationFrame(() => o.classList.add('active'));
  const remove = () => {
    o.classList.remove('active');
    setTimeout(() => o.remove(), 400);
  };
  o.addEventListener('click', e => e.target === o && remove());
  o.querySelector('.close-btn').addEventListener('click', remove);
}

document.querySelectorAll('.polaroid').forEach(p =>
  p.addEventListener('click', () =>
    toggleOverlay(p.querySelector('img').src, p.querySelector('p').textContent)
  )
);
