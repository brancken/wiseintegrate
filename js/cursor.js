// cursor.js — WiseIntegrate
// Custom cursor: glowing moon + soft orb follower

(function () {
  'use strict';

  // Only run on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const orb  = document.getElementById('cursor-orb');
  const moon = document.getElementById('cursor-moon');
  if (!orb || !moon) return;

  let mouseX = window.innerWidth  / 2;
  let mouseY = window.innerHeight / 2;
  let orbX   = mouseX;
  let orbY   = mouseY;
  let rafId  = null;

  // Moon tracks cursor exactly (via CSS transition 0.06s)
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    moon.style.left = mouseX + 'px';
    moon.style.top  = mouseY + 'px';
  });

  // Orb follows with lerp (smooth lag)
  function animateOrb() {
    const ease = 0.072;
    orbX += (mouseX - orbX) * ease;
    orbY += (mouseY - orbY) * ease;
    orb.style.left = orbX + 'px';
    orb.style.top  = orbY + 'px';
    rafId = requestAnimationFrame(animateOrb);
  }
  animateOrb();

  // Hover reaction — grow moon + intensify glow
  const interactiveSelectors = [
    'a', 'button',
    '.card', '.sector-card',
    '.step', '.voice-option',
    '.link-arrow', '.nav-links a',
    '.mobile-link', '.footer-col a',
    'input', 'textarea'
  ].join(', ');

  function onEnter() {
    moon.classList.add('cursor-hover');
  }
  function onLeave() {
    moon.classList.remove('cursor-hover');
  }

  // Use event delegation for performance
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) onEnter();
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) onLeave();
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    moon.style.opacity = '0';
    orb.style.opacity  = '0';
  });
  document.addEventListener('mouseenter', () => {
    moon.style.opacity = '1';
    orb.style.opacity  = '1';
  });

})();
