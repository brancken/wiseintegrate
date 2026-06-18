// form.js — WiseIntegrate
// Assessment form — voice toggle, validation, Supabase submission

(function () {
  'use strict';

  const form        = document.getElementById('assessment-form');
  const voiceToggle = document.getElementById('voice-toggle');
  const modeInput   = document.getElementById('mode-input');

  if (!form) return;

  // ── Voice toggle ────────────────────────────────────────
  if (voiceToggle && modeInput) {
    voiceToggle.addEventListener('click', () => {
      const isVoice = voiceToggle.classList.toggle('active');
      modeInput.value = isVoice ? 'voice' : 'form';
      voiceToggle.setAttribute('aria-pressed', String(isVoice));

      const label = voiceToggle.querySelector('.voice-label');
      if (label) {
        label.textContent = isVoice
          ? '✓ Voice conversation selected'
          : "I'd prefer to answer by voice conversation";
      }
    });

    voiceToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        voiceToggle.click();
      }
    });
  }

  // ── Validation ──────────────────────────────────────────
  function validateField(input) {
    const group = input.closest('.form-group');
    if (!group) return true;

    let valid = true;
    let message = '';

    if (input.required && !input.value.trim()) {
      valid = false;
      message = 'This field is required.';
    } else if (input.type === 'email' && input.value) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(input.value)) {
        valid = false;
        message = 'Please enter a valid email address.';
      }
    }

    if (!valid) {
      group.classList.add('error');
      let errEl = group.querySelector('.error-msg');
      if (!errEl) {
        errEl = document.createElement('span');
        errEl.className = 'error-msg';
        errEl.setAttribute('role', 'alert');
        group.appendChild(errEl);
      }
      errEl.textContent = message;
    } else {
      group.classList.remove('error');
    }

    return valid;
  }

  // Live validation on blur
  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-group.error')) validateField(input);
    });
  });

  // ── Submit ──────────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs  = form.querySelectorAll('input[required]');
    let allValid  = true;

    inputs.forEach(input => {
      if (!validateField(input)) allValid = false;
    });

    if (!allValid) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const origText  = submitBtn.textContent;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Please wait…';

    const data = {
      name:  form.querySelector('#name')?.value.trim(),
      org:   form.querySelector('#org')?.value.trim(),
      email: form.querySelector('#email')?.value.trim(),
      mode:  modeInput?.value || 'form',
      created_at: new Date().toISOString()
    };

    try {
      // Route to assessment page with data as query params
      // Supabase submission happens on the assessment page
      const params = new URLSearchParams({
        name:  data.name,
        org:   data.org,
        email: data.email,
        mode:  data.mode
      });

      window.location.href = `/assessment?${params.toString()}`;

    } catch (err) {
      console.error('Form error:', err);
      submitBtn.disabled  = false;
      submitBtn.textContent = origText;
      if (window.showToast) {
        window.showToast('Something went wrong. Please try again.', 'error');
      }
    }
  });

})();
