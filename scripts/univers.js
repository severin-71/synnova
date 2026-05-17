  /* ── Intersection Observer : animations au scroll ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), parseInt(delay));
      observer.unobserve(el);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.page-intro, .card, .galerie-section, .cta-band')
    .forEach(el => observer.observe(el));

  /* ── Smooth hover tilt léger sur les cards ── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `translateY(-4px) rotateX(${-y*3}deg) rotateY(${x*3}deg) scale(1.005)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
  }