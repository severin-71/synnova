/* ── PILLS  */
let selectedType = '';
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('selected'));
    pill.classList.add('selected');
    selectedType = pill.dataset.val;
  });
});

/* ── FORM SUBMIT — envoi direct via EmailJS API */
const serviceId = 'service_jidgh9s';
const templateId = 'template_eqz5du5';
const publicKey = '2ziUVJ9ofmESic65O';
const emailEndpoint = 'https://api.emailjs.com/api/v1.0/email/send';

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

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const statusMsg = document.getElementById('successMsg');
const submitLabel = submitBtn.querySelector('span:not(.arrow)');

const setStatus = (message, isError = false) => {
  statusMsg.textContent = message;
  statusMsg.classList.toggle('show', Boolean(message));
  statusMsg.classList.toggle('error', isError);
};

const setButtonState = (isSending) => {
  submitBtn.disabled = isSending;
  submitBtn.style.opacity = isSending ? '.4' : '';
  submitBtn.style.pointerEvents = isSending ? 'none' : '';
  submitLabel.textContent = isSending ? 'Envoi de votre message' : 'Envoyer le message';
};

const sendMessage = async (payload) => {
  const response = await fetch(emailEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: payload,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Échec de l’envoi');
  }
  return response.text();
};

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const prenomField = document.getElementById('prenom');
  const nomField = document.getElementById('nom');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');

  const prenom = prenomField.value.trim();
  const nom = nomField.value.trim();
  const email = emailField.value.trim();
  const message = messageField.value.trim();

  [prenomField, nomField, emailField, messageField].forEach(clearInlineError);
  setStatus('', false);

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

  setButtonState(true);
  setStatus('Envoi de votre message...', false);

  try {
    await sendMessage({
      from_name: `${prenom} ${nom}`.trim(),
      from_email: email,
      request_type: selectedType || 'Non précisé',
      message,
        reply_to: email,
    });
    setStatus('✓ Message envoyé — Je vous répondrai sous 48h max. Merci !', false);
    contactForm.reset();
    selectedType = '';
    document.querySelectorAll('.pill').forEach(pill => pill.classList.remove('selected'));
  } catch (error) {
    console.error(error);
    setStatus('Erreur lors de l’envoi. Veuillez réessayer plus tard.', true);
  } finally {
    setButtonState(false);
  }
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
