(() => {
  'use strict';

  let navigationWarningIssued = false;

  function warnNavigationOnce(message) {
    if (navigationWarningIssued) return;
    navigationWarningIssued = true;
    console.warn(`Apex Tabs navigation: ${message}`);
  }

  function initNavigation() {
    const triggers = document.querySelectorAll('.nav-toggle');

    if (triggers.length !== 1 || !(triggers[0] instanceof HTMLButtonElement)) {
      warnNavigationOnce('expected one native button trigger; ordinary links remain visible.');
      return;
    }

    const trigger = triggers[0];
    if (trigger.dataset.navigationInitialized === 'true') return;

    const controls = (trigger.getAttribute('aria-controls') || '').trim();
    const matchingPanels = Array.from(document.querySelectorAll('[id]')).filter((element) => element.id === controls);

    if (!controls || matchingPanels.length !== 1 || !(matchingPanels[0] instanceof HTMLElement) || matchingPanels[0].children.length === 0) {
      warnNavigationOnce('the controlled panel is missing, duplicated, or empty; ordinary links remain visible.');
      return;
    }

    const panel = matchingPanels[0];
    const links = Array.from(panel.querySelectorAll('a[href]'));
    const breakpoint = window.matchMedia('(min-width: 768px)');
    let isOpen = null;

    function setOpen(nextOpen, options = {}) {
      const { focusFirst = false, returnFocus = false } = options;
      const next = Boolean(nextOpen);
      const stateChanged = isOpen !== next;

      isOpen = next;
      trigger.setAttribute('aria-expanded', String(next));
      trigger.setAttribute('aria-label', next ? 'Close navigation' : 'Open navigation');
      panel.hidden = breakpoint.matches ? false : !next;

      if (!stateChanged) return;
      if (next && focusFirst && links.length > 0) links[0].focus();
      if (!next && returnFocus) trigger.focus();
    }

    function handleBreakpointChange(event) {
      const enteringDesktop = event.matches;
      if (!enteringDesktop && panel.contains(document.activeElement)) trigger.focus();
      setOpen(false, { returnFocus: false });
    }

    trigger.dataset.navigationInitialized = 'true';
    document.documentElement.classList.add('nav-enhanced');
    setOpen(false, { returnFocus: false });

    trigger.addEventListener('click', () => {
      setOpen(!isOpen, { focusFirst: !isOpen, returnFocus: false });
    });

    panel.addEventListener('click', (event) => {
      if (event.target.closest('a[href]')) setOpen(false, { returnFocus: false });
    });

    document.addEventListener('click', (event) => {
      if (!isOpen || trigger.contains(event.target) || panel.contains(event.target)) return;
      setOpen(false, { returnFocus: false });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !isOpen) return;
      event.preventDefault();
      setOpen(false, { returnFocus: true });
    });

    breakpoint.addEventListener('change', handleBreakpointChange);
  }

  function initImageFallbacks() {
    const images = document.querySelectorAll('img[data-local-image]');

    images.forEach((img) => {
      if (img.dataset.fallbackInitialized === 'true') return;
      img.dataset.fallbackInitialized = 'true';
      let handled = false;

      function fail() {
        if (handled) return;
        handled = true;

        const wrapper = img.closest('[data-image-wrapper]');
        const fallback = wrapper ? wrapper.querySelector('.image-fallback') : null;
        const filename = new URL(img.currentSrc || img.src, document.baseURI).pathname.split('/').pop();

        img.hidden = true;
        if (wrapper) wrapper.classList.add('image-unavailable');
        if (fallback) fallback.hidden = false;
        console.warn(`Apex Tabs image unavailable: ${filename}`);
      }

      img.addEventListener('error', fail, { once: true });
      if (img.complete && img.naturalWidth === 0) fail();
    });
  }

  try {
    initNavigation();
  } catch (error) {
    warnNavigationOnce('initialization failed; ordinary links remain visible.');
  }

  try {
    initImageFallbacks();
  } catch (error) {
    console.warn('Apex Tabs image fallbacks could not initialize.');
  }
})();
