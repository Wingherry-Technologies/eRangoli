  // ── Eye toggles ──────────────────────────────────────────────
  function setupEye(toggleId, inputId, openId, closedId) {
    const btn = document.getElementById(toggleId);
    const inp = document.getElementById(inputId);
    const open = document.getElementById(openId);
    const closed = document.getElementById(closedId);
    btn.addEventListener('click', () => {
      const show = inp.type === 'password';
      inp.type = show ? 'text' : 'password';
      open.style.display   = show ? 'none'  : 'block';
      closed.style.display = show ? 'block' : 'none';
    });
  }
  setupEye('toggleNew',     'newPassword',     'eyeNewOpen',  'eyeNewClosed');
  setupEye('toggleConfirm', 'confirmPassword', 'eyeConfOpen', 'eyeConfClosed');

  // ── Validation helpers ────────────────────────────────────────
  const rules = {
    len:     v => v.length >= 8,
    upper:   v => /[A-Z]/.test(v),
    lower:   v => /[a-z]/.test(v),
    num:     v => /[0-9]/.test(v),
    special: v => /[^A-Za-z0-9]/.test(v),
  };

  const newPw  = document.getElementById('newPassword');
  const confPw = document.getElementById('confirmPassword');
  const pwRules = document.getElementById('pwRules');
  const matchMsg = document.getElementById('matchMsg');
  const strengthFill = document.getElementById('strengthFill');
  const submitBtn = document.getElementById('submitBtn');

  const strengthColors = ['#C0202A','#e07b30','#e0b830','#5aab6e','#2E7D4F'];
  const strengthWidths  = ['20%','40%','60%','80%','100%'];

  function updateRules(val) {
    let met = 0;
    for (const [key, fn] of Object.entries(rules)) {
      const el = document.getElementById('rule-' + key);
      const ok = fn(val);
      el.classList.toggle('met', ok);
      if (ok) met++;
    }
    // strength
    strengthFill.style.width    = val.length ? strengthWidths[met - 1] || '5%' : '0%';
    strengthFill.style.background = val.length ? strengthColors[met - 1] : '';
    return met === 5;
  }

  function updateMatch() {
    const a = newPw.value, b = confPw.value;
    if (!b) { matchMsg.textContent = ''; matchMsg.className = 'match-msg'; return false; }
    if (a === b) {
      matchMsg.innerHTML = '✔ Passwords match';
      matchMsg.className = 'match-msg ok';
      confPw.classList.remove('input-error'); confPw.classList.add('input-success');
      return true;
    } else {
      matchMsg.innerHTML = '✖ Passwords don\'t match';
      matchMsg.className = 'match-msg error';
      confPw.classList.add('input-error'); confPw.classList.remove('input-success');
      return false;
    }
  }

  newPw.addEventListener('focus', () => pwRules.classList.add('visible'));
  newPw.addEventListener('input', () => {
    updateRules(newPw.value);
    const allMet = updateRules(newPw.value);
    if (confPw.value) updateMatch();
    newPw.classList.remove('input-error','input-success');
    if (newPw.value && allMet) newPw.classList.add('input-success');  // ← add this line
  });
  confPw.addEventListener('input', updateMatch);

  // ── Ripple effect ─────────────────────────────────────────────
  submitBtn.addEventListener('click', function(e) {
    const r = submitBtn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const size = Math.max(r.width, r.height);
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
    submitBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });

  // ── Form submit ───────────────────────────────────────────────
  document.getElementById('resetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const val = newPw.value;
    const allRulesMet = updateRules(val);
    const matched = updateMatch();

    if (!val) {
      newPw.classList.add('input-error');
      pwRules.classList.add('visible');
      return;
    }
    if (!allRulesMet) {
      newPw.classList.add('input-error');
      pwRules.classList.add('visible');
      return;
    }
    if (!confPw.value || !matched) {
      confPw.classList.add('input-error');
      confPw.focus();
      return;
    }

    // success!
    submitBtn.disabled = true;
    submitBtn.textContent = 'Resetting…';
    setTimeout(showSuccess, 600);
  });

  // ── Success + particles ───────────────────────────────────────
  function spawnParticles() {
    const container = document.getElementById('particles');
    const colors = ['#C9A84C','#e84040','#ffffff','#f5c842'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size = Math.random() * 8 + 4;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${30 + Math.random()*40}%;
        top:${40 + Math.random()*20}%;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        animation-delay:${Math.random()*0.8}s;
        animation-duration:${1.5 + Math.random()}s;
      `;
      container.appendChild(p);
      setTimeout(() => p.remove(), 3000);
    }
  }

  function showSuccess() {
    spawnParticles();
    const overlay = document.getElementById('successOverlay');
    overlay.classList.add('show');
    // redirect after 3s
    setTimeout(() => {
      // Replace with actual login URL
      window.location.href = '../html/vendorlogin.html';
    }, 3300);
  }
