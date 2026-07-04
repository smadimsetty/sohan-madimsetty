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
