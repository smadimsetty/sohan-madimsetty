function setupDisclosure(toggleId, panelId) {
  const toggle = document.getElementById(toggleId);
  const panel = document.getElementById(panelId);

  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.contains('is-open');
    setDisclosureState(toggle, panel, !isOpen);
  });

  return { toggle, panel };
}

function setDisclosureState(toggle, panel, open) {
  if (open) {
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('is-open'));
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    panel.addEventListener('transitionend', function handler() {
      panel.hidden = true;
      panel.removeEventListener('transitionend', handler);
    });
  }
}

const experience = setupDisclosure('experienceToggle', 'experiencePanel');
const interests = setupDisclosure('interestsToggle', 'interestsPanel');

const contactBtn = document.getElementById('contactBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const contactModal = document.getElementById('contactModal');

function openModal() {
  modalBackdrop.hidden = false;
  modalCloseBtn.focus();
  document.addEventListener('keydown', handleModalKeydown);
}

function closeModal() {
  modalBackdrop.hidden = true;
  document.removeEventListener('keydown', handleModalKeydown);
  contactBtn.focus();
}

function handleModalKeydown(e) {
  if (e.key === 'Escape') {
    closeModal();
    return;
  }
  if (e.key === 'Tab') {
    const focusable = contactModal.querySelectorAll('a, button');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

contactBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});

const homeBtn = document.getElementById('homeBtn');
homeBtn.addEventListener('click', () => {
  setDisclosureState(experience.toggle, experience.panel, false);
  setDisclosureState(interests.toggle, interests.panel, false);
  closeModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
