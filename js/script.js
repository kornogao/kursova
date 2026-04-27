// ─── FAQ ───
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── PROGRESS BAR ───
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
});

// ─── STAGGERED REVEAL ───
document.querySelectorAll('.why-grid, .teacher-cards-grid, .reviews-grid').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i * 80) + 'ms'; });
});

// ─── NAV MOBILE ───
document.querySelector('.menu-toggle').addEventListener('click', function() {
  const links = document.querySelector('.nav-links');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
    this.textContent = '☰';
  } else {
    links.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:68px;left:0;right:0;background:#fff;padding:24px;gap:20px;box-shadow:0 8px 32px rgba(0,0,0,0.1);z-index:99;';
    this.textContent = '✕';
  }
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ─── CHECKLIST ───
function toggleCheck(el) {
  el.classList.toggle('done');
}

// ─── INTERACTIVE ROUTE ───
let routeAnswers = [];
let currentRouteStep = 0;
const totalRouteSteps = 5;

function pickOpt(el, stepIdx, value) {
  el.closest('.route-options').querySelectorAll('.route-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  routeAnswers[stepIdx] = value;
  document.getElementById('routeNav').style.display = 'flex';
}

function updateRouteDots() {
  const dots = document.querySelectorAll('.route-dot');
  dots.forEach((d, i) => {
    d.classList.remove('done','current');
    if (i < currentRouteStep) d.classList.add('done');
    else if (i === currentRouteStep) d.classList.add('current');
  });
}

function nextRouteStep() {
  if (routeAnswers[currentRouteStep] === undefined) return;
  document.getElementById('rs' + currentRouteStep).classList.remove('active');
  currentRouteStep++;
  if (currentRouteStep >= totalRouteSteps) {
    document.getElementById('routeProgress').style.display = 'none';
    document.getElementById('routeNav').style.display = 'none';
    buildRouteResult();
    document.getElementById('rsResult').classList.add('active');
  } else {
    document.getElementById('rs' + currentRouteStep).classList.add('active');
    document.getElementById('routeNav').style.display = 'none';
    updateRouteDots();
  }
}

function buildRouteResult() {
  const grade = routeAnswers[0];
  const level = routeAnswers[1];
  const time = routeAnswers[2];
  const subject = routeAnswers[3];
  const goal = routeAnswers[4];

// SVG іконки
  const SVG_SPROUT = `<svg xmlns="http://www.w3.org/2000/svg" width="94" height="74" viewBox="0 0 24 24" fill="none" stroke="#E8A900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sprout-icon lucide-sprout"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/></svg>`;
  const SVG_FIRE   = `<svg xmlns="http://www.w3.org/2000/svg" width="94" height="74" viewBox="0 0 24 24" fill="none" stroke="#E8A900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame-icon lucide-flame"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></svg>`;

  let icon = '🎯', title = '', desc = '', tags = [];

  if (grade === '10 клас') {
    icon = SVG_SPROUT; 
    title = 'Тобі ідеально підходить курс PRO для 10 класу';
    desc = '2 роки — це твоя перевага! Без поспіху, без стресу, з глибоким засвоєнням матеріалу. Ти встигнеш пройти все, закріпити та здати НМТ на максимум.';
    tags = ['PRO 10 клас', '2 роки підготовки', '5 предметів'];
  } else {
    icon = SVG_FIRE; 
    title = 'Тобі ідеально підходить курс PRO для 11 класу';
    desc = '6–9 місяців системної підготовки з куратором 24/7. Ми знаємо, як за короткий час дати максимальний результат — це підтверджують 147 учнів з 200 балами.';
    tags = ['PRO 11 клас', '6-9 місяців', 'Гарантія +55 балів'];
  }

  if (level === 'нульовий') tags.push('Старт з основ');
  if (level === 'хороший') tags.push('Шліфування до максимуму');
  if (time === '2год+') tags.push('Інтенсивний режим');
  if (goal === 'бюджет') tags.push('Ціль — бюджет');
  if (subject === 'медицина') tags.push('Медичний профіль');
  if (subject === 'техніка') tags.push('Технічний профіль');
  if (subject === 'мови') tags.push('Мовний профіль');

  document.getElementById('resultIcon').innerHTML = icon;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultDesc').textContent = desc;

  const tagsEl = document.getElementById('resultTags');
  tagsEl.innerHTML = tags.map(t => `<span class="route-tag">${t}</span>`).join('');
}

function restartRoute() {
  routeAnswers = [];
  currentRouteStep = 0;
  document.getElementById('routeProgress').style.display = 'flex';
  document.querySelectorAll('.route-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.route-opt').forEach(o => o.classList.remove('selected'));
  document.getElementById('rs0').classList.add('active');
  document.getElementById('routeNav').style.display = 'none';
  updateRouteDots();
}

// ─── FORM ───
function submitForm() {
  const name = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  if (!name || !phone) {
    alert('Будь ласка, заповніть ім\'я та телефон');
    return;
  }
  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('formSuccess').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── HERO PARTICLES ───
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.closest('.hero');

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const GOLD = [232, 169, 0];
  const ORANGE = [255, 107, 44];

  const particles = Array.from({ length: 55 }, () => createParticle());

  function createParticle(fromScratch) {
    const color = Math.random() > 0.4 ? GOLD : ORANGE;
    return {
      x: Math.random() * canvas.width,
      y: fromScratch ? canvas.height + 10 : Math.random() * canvas.height,
      r: Math.random() * 2.8 + 0.8,
      alpha: Math.random() * 0.45 + 0.08,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.55 + 0.15),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.018 + 0.006,
      wobbleAmp: Math.random() * 1.2 + 0.3,
      color,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
    };
  }

  function drawParticle(p) {
    const twinkle = 0.7 + 0.3 * Math.sin(p.twinklePhase);
    const a = p.alpha * twinkle;
    const [r, g, b] = p.color;
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
    grd.addColorStop(0, `rgba(${r},${g},${b},${a})`);
    grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      p.wobble += p.wobbleSpeed;
      p.twinklePhase += p.twinkleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * p.wobbleAmp;
      p.y += p.vy;
      if (p.y < -10) {
        Object.assign(p, createParticle(true));
        p.x = Math.random() * canvas.width;
      }
      drawParticle(p);
    }
    requestAnimationFrame(tick);
  }
  tick();
})();


function animateSpan(el, target, suffix) {
  let start = 0;
  const duration = 1600;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('uk') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const numberObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.number-val span').forEach(span => {
        const raw = span.textContent.replace(/[^0-9]/g, '');
        if (raw) {
          const suffix = span.textContent.replace(/[0-9]/g, '');
          animateSpan(span, parseInt(raw), suffix);
        }
      });
      numberObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.numbers-row').forEach(r => numberObserver.observe(r));