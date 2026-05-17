
// Fade-in au scroll pour les sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .moment-item, .galerie-grid img').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

const titreAnim = document.getElementById("titre-anim");
const paraAnim = document.getElementById("para-anim");
const imageAnim = document.getElementById("image-anim");
let showAnim = true;
titreAnim.addEventListener("click", () => {
  if (showAnim) {
    paraAnim.textContent = "Donner voix et rythme aux événements qui comptent.";
    imageAnim.src = "./images/slide2.webp";
    imageAnim.style.display = "block";
    imageAnim.style.width = "100%";
    imageAnim.style.height = "300px";
    imageAnim.style.borderRadius = "16px";
    titreAnim.textContent = "∧";
    showAnim = false;
  }else {
    paraAnim.textContent = "";
    imageAnim.style.display = "none";
    titreAnim.textContent = "∨";
    showAnim = true;
  };
});

const titreCom = document.getElementById("titre-com");
const paraCom = document.getElementById("para-com");
const imageCom = document.getElementById("image-com");
let showCom = true;
titreCom.addEventListener("click", () => {
  if (showCom) {
    paraCom.textContent = "Créer des ponts entre les idées et les publics.";
    imageCom.src = "./images/formation.webp";
    imageCom.style.display = "block";
    imageCom.style.width = "100%";
    imageCom.style.height = "300px";
    imageCom.style.borderRadius = "16px";
    titreCom.textContent = "∧";
    showCom = false;
  }else {
    paraCom.textContent = "";
    imageCom.style.display = "none";
    titreCom.textContent = "∨";
    showCom = true;
  };
});

const titreActrice = document.getElementById("titre-actrice");
const paraActrice = document.getElementById("para-actrice");
const imageActrice = document.getElementById("image-actrice");
let showActrice = true;
titreActrice.addEventListener("click", () => {
  if (showActrice) {
    paraActrice.textContent = "Incarner des histoires qui résonnent et inspirent.";
    imageActrice.src = "./images/cinema.webp";
    imageActrice.style.display = "block";
    imageActrice.style.width = "100%";
    imageActrice.style.height = "300px";
    imageActrice.style.borderRadius = "16px";
    titreActrice.textContent = "∧";
    showActrice = false;
  }else {
    titreActrice.textContent = "∨";
    paraActrice.textContent = "";
    imageActrice.style.display = "none";
    showActrice = true;
  };
});

const titreEntre = document.getElementById("titre-entre");
const paraEntre = document.getElementById("para-entre");
const imageEntre = document.getElementById("image-entre");
let showEntre = true;
titreEntre.addEventListener("click", () => {
  if (showEntre) {
    paraEntre.textContent = "Bâtir des projets qui allient sens et ambition.";
    imageEntre.src = "./images/Screenshot_20260515-125926.webp";
    imageEntre.style.display = "block";
    imageEntre.style.width = "100%";
    imageEntre.style.height = "300px";
    imageEntre.style.borderRadius = "16px";
    titreEntre.textContent = "∧";
    showEntre = false;
  }else {
    titreEntre.textContent = "∨";
    paraEntre.textContent = "";
    imageEntre.style.display = "none";
    showEntre = true;
  };
});

const images = [
  "./images/wb.jpg",
  "./images/slide4.webp",
  "./images/13.jpg",
  "./images/synnova.jpg"
]
let imgGalerie = document.getElementById("img-galerie");
let index = 0;
setInterval(() => {
  imgGalerie.src = images[index];
  index = (index + 1) % images.length;
  if (index > 3) index = 0;
}, 3000);