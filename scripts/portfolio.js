/* ── FILTER */
const filterBtns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.masonry-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    items.forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ── INTERSECTION OBSERVER */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay);
    io.unobserve(el);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.event-row, .presse-card, .cta-band')
  .forEach(el => io.observe(el));

/* ── CAROUSEL TÉMOIGNAGES  */
const track = document.getElementById('track');
const cards = track.querySelectorAll('.temoignage-card');
const dotsEl = document.getElementById('dots');
let current = 0;

// build dots
cards.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(d);
});

function goTo(n) {
  current = (n + cards.length) % cards.length;
  const cardW = cards[0].offsetWidth + 2; // gap = 2px
  track.style.transform = `translateX(-${current * cardW}px)`;
  document.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === current)
  );
}

document.getElementById('prev').addEventListener('click', () => goTo(current - 1));
document.getElementById('next').addEventListener('click', () => goTo(current + 1));

// auto-play
let autoplay = setInterval(() => goTo(current + 1), 5000);
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
track.parentElement.addEventListener('mouseleave', () => {
  autoplay = setInterval(() => goTo(current + 1), 5000);
});

// recalculate on resize
window.addEventListener('resize', () => goTo(current));

