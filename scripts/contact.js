/* ── PILLS  */
let selectedType = '';
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('selected'));
    pill.classList.add('selected');
    selectedType = pill.dataset.val;
  });
});

/* ── FORM SUBMIT (simulation) */
const ownerEmail = 'leleader71@gmail.com';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const clearInlineError = (field) => {
  const wrapper = field.closest('.field');
  if (!wrapper) return;
  wrapper.classList.remove('error');
  const errorEl = wrapper.querySelector('.field-error');
  if (errorEl) errorEl.remove();
};

const showInlineError = (field, message) => {
  const wrapper = field.closest('.field');
  if (!wrapper) return;
  wrapper.classList.add('error');
  let errorEl = wrapper.querySelector('.field-error');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    wrapper.appendChild(errorEl);
  }
  errorEl.textContent = message;
};

document.getElementById('submitBtn').addEventListener('click', () => {
  const prenomField = document.getElementById('prenom');
  const nomField = document.getElementById('nom');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');

  const prenom = prenomField.value.trim();
  const nom = nomField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();

  [prenomField, nomField, emailField, messageField].forEach(clearInlineError);

  let hasError = false;
  if (!prenom) {
    showInlineError(prenomField, 'Veuillez saisir un prénom valide.');
    hasError = true;
  }
  if (!email) {
    showInlineError(emailField, 'Veuillez saisir une adresse email correcte.');
    hasError = true;
  } else if (!isValidEmail(email)) {
    showInlineError(emailField, 'Adresse email invalide.');
    hasError = true;
  }
  if (!message) {
    showInlineError(messageField, 'Veuillez indiquer votre message.');
    hasError = true;
  }

  if (hasError) {
    [['prenom', prenom], ['nom', nom], ['email', email], ['message', message]]
      .forEach(([id, val]) => {
        if (!val) {
          const el = document.getElementById(id).closest('.field');
          el.style.animation = 'shake .35s ease';
          setTimeout(() => el.style.animation = '', 400);
        }
      });
    if (email && !isValidEmail(email)) {
      const el = emailField.closest('.field');
      el.style.animation = 'shake .35s ease';
      setTimeout(() => el.style.animation = '', 400);
    }
    return;
  }

  const subject = encodeURIComponent(`Nouveau message de ${prenom} ${nom}`.trim());
  const body = encodeURIComponent(`Email de l'expéditeur : ${email}\nType de demande : ${selectedType || 'Non précisé'}\n\nMessage :\n${message}`);
  const mailtoLink = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;

  document.getElementById('successMsg').textContent = '✓ Message prêt à partir vers la boîte de réception de Synnova.';
  document.getElementById('successMsg').classList.add('show');
  document.getElementById('submitBtn').style.opacity = '.4';
  document.getElementById('submitBtn').style.pointerEvents = 'none';

  const anchor = document.createElement('a');
  anchor.href = mailtoLink;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
});

/* ── SHAKE ANIMATION */
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-6px); }
    40%      { transform: translateX(6px); }
    60%      { transform: translateX(-4px); }
    80%      { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);

/* ── INTERSECTION OBSERVER  */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    io.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.form-wrap, .social-wrap, .bottom-band')
  .forEach(el => io.observe(el));

/* ── FLOATING LABEL behaviour  */
document.querySelectorAll('.field input, .field textarea').forEach(input => {
  const label = input.closest('.field').querySelector('label');
  const update = () => {
    if (input.value) {
      label.style.top    = '8px';
      label.style.fontSize = '.52rem';
      label.style.color  = 'var(--muted)';
    } else {
      label.style.top    = '';
      label.style.fontSize = '';
      label.style.color  = '';
    }
  };
  input.addEventListener('input', update);
  input.addEventListener('blur', update);
});
