// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const list = document.querySelector('#nav-list');
if (toggle && list) {
  toggle.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Compteurs animés (KPI)
const counters = document.querySelectorAll('.count');
const animateCounter = (el) => {
  const target = parseFloat(el.getAttribute('data-target')) || 0;
  const isInt = Number.isInteger(target);
  const duration = 1200; // ms
  const start = performance.now();
  const step = (t) => {
    const p = Math.min((t - start) / duration, 1);
    const val = target * (0.15 + 0.85 * p); // ease‑in
    el.textContent = isInt ? Math.round(val) : (Math.round(val * 10) / 10).toFixed(1);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

// Observer pour déclencher animations + nav active
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      if (e.target.id === 'key-findings') {
        counters.forEach((c) => {
          if (!c.dataset.done) { animateCounter(c); c.dataset.done = '1'; }
        });
      }
      const id = e.target.id;
      document.querySelectorAll('.site-nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
}, { threshold: 0.35 });

document.querySelectorAll('section').forEach(sec => io.observe(sec));

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (ev) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { ev.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
