// pwa.js — WiseIntegrate
// Progressive Web App install prompt + service worker registration

(function () {
  'use strict';

  let deferredPrompt = null;

  const banner        = document.getElementById('pwa-banner');
  const installBtn    = document.getElementById('pwa-install-btn');
  const navPwaBtn     = document.getElementById('nav-pwa-btn');
  const dismissBtn    = document.getElementById('pwa-dismiss');

  // ── Capture the install prompt ──────────────────────────
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show banner after 3 seconds if not dismissed before
    if (!sessionStorage.getItem('pwa-banner-dismissed')) {
      setTimeout(() => {
        if (banner) banner.style.display = 'flex';
      }, 3000);
    }
  });

  // ── Handle install trigger ──────────────────────────────
  async function triggerInstall() {
    if (!deferredPrompt) {
      // iOS fallback — show instructions
      showIOSInstructions();
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('[PWA] User accepted the install prompt');
      hideBanner();
    }
    deferredPrompt = null;
  }

  if (installBtn) installBtn.addEventListener('click', triggerInstall);
  if (navPwaBtn)  navPwaBtn.addEventListener('click', triggerInstall);

  // ── Dismiss banner ──────────────────────────────────────
  function hideBanner() {
    if (banner) banner.style.display = 'none';
    sessionStorage.setItem('pwa-banner-dismissed', '1');
  }

  if (dismissBtn) dismissBtn.addEventListener('click', hideBanner);

  // ── iOS install instructions ────────────────────────────
  function showIOSInstructions() {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIOS && isSafari) {
      showToast(
        '📱 Tap the Share button then "Add to Home Screen"',
        'info',
        6000
      );
    } else {
      showToast(
        'Open in Safari on iOS to install, or use Chrome on Android.',
        'info',
        5000
      );
    }
  }

  // ── App installed event ─────────────────────────────────
  window.addEventListener('appinstalled', () => {
    hideBanner();
    showToast('WiseIntegrate installed successfully! ✓', 'success');
  });

  // ── Service Worker registration ─────────────────────────
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(reg => console.log('[SW] Registered:', reg.scope))
        .catch(err => console.warn('[SW] Registration failed:', err));
    });
  }

  // ── Toast helper ────────────────────────────────────────
  window.showToast = function(message, type = 'info', duration = 4000) {
    let toast = document.querySelector('.toast');

    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    const icons = {
      success: 'ti-circle-check',
      error:   'ti-circle-x',
      info:    'ti-info-circle'
    };

    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="ti ${icons[type] || icons.info} toast-icon" aria-hidden="true"></i>
      <span>${message}</span>
    `;

    // Show
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    // Auto hide
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };

})();
