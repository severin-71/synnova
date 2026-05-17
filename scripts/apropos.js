// Animation d'apparition des blocs zigzag au scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.bloc-zigzag').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.8s ease';
  observer.observe(el);
});

// Quand visible
document.addEventListener('scroll', () => {
  document.querySelectorAll('.bloc-zigzag').forEach(el => {
    if (el.classList.contains('visible')) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
});

// Animation de la section valeurs au scroll
const valeursObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

const valeursSection = document.querySelector('.valeurs');
if (valeursSection) {
  valeursSection.style.opacity = 0;
  valeursSection.style.transform = 'translateY(30px)';
  valeursSection.style.transition = 'all 0.8s ease';
  valeursObserver.observe(valeursSection);
}

// Appliquer l'animation quand visible
document.addEventListener('scroll', () => {
  const valeurs = document.querySelector('.valeurs');
  if (valeurs && valeurs.classList.contains('visible')) {
    valeurs.style.opacity = 1;
    valeurs.style.transform = 'translateY(0)';
    valeurs.style.border = '1px solid #ff006e';
  }
});