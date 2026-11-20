// animations.js — WiseIntegrate
// Scroll-triggered reveal animations using IntersectionObserver

(function () {
  'use strict';

  // Add reveal class to key elements automatically
  const autoRevealSelectors = [
    '.card',
    '.sector-card',
    '.step',
    '.quote-block',
    '.section-header',
    '.assessment-card',
    '.footer-col'
  ];

  autoRevealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger siblings
      el.style.setProperty('--reveal-delay', (i * 0.1) + 's');
    });
  });

  // Assessment grid sides
  const assessCopy = document.querySelector('.assessment-copy');
  const assessCard = document.querySelector('.assessment-card');
  if (assessCopy) assessCopy.classList.add('reveal-left');
  if (assessCard) assessCard.classList.add('reveal-right');

  // ── IntersectionObserver ────────────────────────────────
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => observer.observe(el));

})();
