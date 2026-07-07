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
  closeModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
