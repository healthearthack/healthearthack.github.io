/* ============================================================
   SAVED BY THE BELL THEME— site.js
   Shared utilities + per-page logic
   ============================================================ */

'use strict';

/* ── TOAST ── */
function showToast(msg, color = 'green') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.borderColor = `var(--${color})`;
  t.style.boxShadow = `0 0 12px var(--${color}), 0 0 30px var(--${color})`;
  t.style.color = `var(--${color})`;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── HIGHLIGHT ACTIVE NAV LINK ── */
function setActiveNav() {
  const path = location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === path ||
      path.includes(a.getAttribute('href').replace('/index.html', '')));
  });
}
document.addEventListener('DOMContentLoaded', setActiveNav);


/* ============================================================
   INDEX PAGE
   ============================================================ */
function initIndex() {
  if (!document.querySelector('.hero')) return;

  // Spawn floating deco emoji
  const emojis = ['📺','⭐','🎸','💥','🌈','✨','🎉','🕹️','🛹','💾','🎀','🏄'];
  const hero = document.querySelector('.hero');
  emojis.forEach((e, i) => {
    const d = document.createElement('div');
    d.className = 'deco';
    d.textContent = e;
    d.style.left = (5 + i * 8.2) % 95 + '%';
    d.style.top  = (10 + i * 13.7) % 80 + '%';
    d.style.animationDelay = (i * 0.4) + 's';
    d.style.opacity = '0.18';
    hero.appendChild(d);
  });
}


/* ============================================================
   STORE PAGE
   ============================================================ */
const PRODUCTS = [
  { id:1, name:'Neon Scrunchie Set', emoji:'🌀', price:9.99,  category:'accessories', desc:'5-pack of radical neon scrunchies, totally tubular.' },
  { id:2, name:'Acid-Wash Jacket',   emoji:'🧥', price:49.99, category:'clothing',    desc:'Pre-distressed denim with hand-painted neon stars.' },
  { id:3, name:'Retro Boombox Tee',  emoji:'📻', price:24.99, category:'clothing',    desc:'100% cotton, oversized fit. Gnarly graphic print.' },
  { id:4, name:'Slap Bracelet',      emoji:'⚡', price:4.99,  category:'accessories', desc:'Metallic holographic. One size slaps all.' },
  { id:5, name:'VHS Sticker Pack',   emoji:'📼', price:6.99,  category:'stickers',    desc:'12 die-cut stickers for your locker or Trapper Keeper.' },
  { id:6, name:'Cassette Tape Bag',  emoji:'🎵', price:19.99, category:'accessories', desc:'Mini crossbody shaped like a cassette. Way cool.' },
  { id:7, name:'Neon Fanny Pack',    emoji:'💛', price:14.99, category:'accessories', desc:'Three pockets. 100% neon yellow. Fanny for life.' },
  { id:8, name:'Radical Snapback',   emoji:'🧢', price:22.99, category:'clothing',    desc:'Embroidered lightning bolt. Adjustable strap.' },
  { id:9, name:'Holographic Pins',   emoji:'🌟', price:3.99,  category:'stickers',    desc:'Set of 6 rainbow foil enamel pins.' },
  {id:10, name:'Pixel Art Poster',   emoji:'🖼️', price:15.99, category:'stickers',    desc:'18×24" glossy print. Unrolls in tubular style.' },
  {id:11, name:'Arcade Keychain',    emoji:'🕹️', price:7.99,  category:'accessories', desc:'Joystick charm on a retractable carabiner.' },
  {id:12, name:'Totally Rad Tote',   emoji:'🛍️', price:18.99, category:'clothing',    desc:'Canvas tote with screen-printed slogan.' },
];

let cart = [];
let activeFilter = 'all';

function renderProducts() {
  const grid = document.getElementById('storeGrid');
  if (!grid) return;
  const filtered = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeFilter);
  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.05}s">
      <div class="product-img">${p.emoji}</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-footer">
          <span class="price">$${p.price.toFixed(2)}</span>
          <button class="add-btn" onclick="addToCart(${p.id})">+ Add</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  cart.push(product);
  updateCartBadge();
  showToast(`${product.emoji} Added to cart!`, 'green');
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = `🛒 Cart (${cart.length})`;
}

function initStore() {
  if (!document.getElementById('storeGrid')) return;

  renderProducts();

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts();
    });
  });

  document.getElementById('cartBadge')?.addEventListener('click', () => {
    if (cart.length === 0) { showToast('Your cart is empty!', 'pink'); return; }
    const list = [...new Set(cart.map(p => p.name))].map(n => {
      const count = cart.filter(p => p.name === n).length;
      return count > 1 ? `${n} ×${count}` : n;
    }).join(', ');
    showToast(`🛒 ${list}`, 'yellow');
  });
}


/* ============================================================
   GAME PAGE — Neon Dodge (canvas game)
   ============================================================ */
function initGame() {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Size canvas
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = Math.min(canvas.offsetWidth * 0.55, 420);
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#FF2D78','#FFE000','#5CE1E6','#7ED957','#BF5FFF','#FF914D'];

  let player, bullets, stars, score, lives, frame, raf, gameRunning, gameOver;

  function reset() {
    player = { x: canvas.width / 2, y: canvas.height - 50, r: 14, speed: 5, color: '#FFE000' };
    bullets = [];
    stars   = Array.from({length:60}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      s: Math.random() * 0.5 + 0.2,
    }));
    score = 0; lives = 3; frame = 0; gameOver = false; gameRunning = false;
  }
  reset();

  // Input
  const keys = {};
  let touchX = null;
  window.addEventListener('keydown', e => keys[e.key] = true);
  window.addEventListener('keyup',   e => keys[e.key] = false);
  canvas.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, {passive:true});
  canvas.addEventListener('touchmove',  e => {
    if (touchX === null) return;
    const dx = e.touches[0].clientX - touchX;
    player.x = Math.max(player.r, Math.min(canvas.width - player.r, player.x + dx));
    touchX = e.touches[0].clientX;
  }, {passive:true});

  function spawnBullet() {
    const x = Math.random() * (canvas.width - 20) + 10;
    const speed = 2.5 + score * 0.008;
    bullets.push({ x, y: -10, r: 8 + Math.random() * 6, speed, color: COLORS[Math.floor(Math.random()*COLORS.length)] });
  }

  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function drawNeonCircle(x, y, r, color) {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur  = 18;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function drawText(text, x, y, color, size = 20, font = 'Permanent Marker') {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur  = 14;
    ctx.fillStyle   = color;
    ctx.font        = `${size}px '${font}', cursive`;
    ctx.textAlign   = 'center';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function loop() {
    if (!gameRunning) return;
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Stars
    stars.forEach(s => {
      s.y += s.s;
      if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fill();
    });

    // Move player
    if ((keys['ArrowLeft']  || keys['a']) && player.x - player.r > 0)             player.x -= player.speed;
    if ((keys['ArrowRight'] || keys['d']) && player.x + player.r < canvas.width)  player.x += player.speed;
    if ((keys['ArrowUp']    || keys['w']) && player.y - player.r > 0)             player.y -= player.speed;
    if ((keys['ArrowDown']  || keys['s']) && player.y + player.r < canvas.height) player.y += player.speed;

    // Spawn
    const spawnRate = Math.max(18, 60 - Math.floor(score / 5));
    if (frame % spawnRate === 0) spawnBullet();

    // Bullets
    bullets.forEach(b => b.y += b.speed);
    bullets = bullets.filter(b => b.y < canvas.height + 20);

    // Collision
    bullets.forEach(b => {
      if (dist(b, player) < b.r + player.r - 4) {
        lives--;
        bullets = bullets.filter(x => x !== b);
        if (lives <= 0) { gameOver = true; gameRunning = false; drawGameOver(); cancelAnimationFrame(raf); return; }
        showToast('Ouch! 💥', 'pink');
      }
    });

    // Draw bullets
    bullets.forEach(b => drawNeonCircle(b.x, b.y, b.r, b.color));

    // Draw player (ship)
    ctx.save();
    ctx.shadowColor = player.color;
    ctx.shadowBlur  = 22;
    ctx.fillStyle   = player.color;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - player.r - 4);
    ctx.lineTo(player.x - player.r, player.y + player.r);
    ctx.lineTo(player.x + player.r, player.y + player.r);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // HUD
    score++;
    document.getElementById('scoreVal').textContent = score;
    document.getElementById('livesVal').textContent = '❤️'.repeat(lives);

    raf = requestAnimationFrame(loop);
  }

  function drawStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fill();
    });
    drawText('NEON DODGE', canvas.width/2, canvas.height/2 - 30, '#7ED957', 38);
    drawText('Press SPACE or tap START', canvas.width/2, canvas.height/2 + 20, '#5CE1E6', 16, 'Nunito');
  }

  function drawGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawText('GAME OVER', canvas.width/2, canvas.height/2 - 30, '#FF2D78', 42);
    drawText(`Score: ${score}`, canvas.width/2, canvas.height/2 + 20, '#FFE000', 24);
    drawText('Press SPACE or tap RESTART', canvas.width/2, canvas.height/2 + 60, '#5CE1E6', 14, 'Nunito');
  }

  drawStartScreen();

  // Start / restart
  function startGame() {
    reset();
    gameRunning = true;
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!gameRunning) startGame();
    }
  });

  document.getElementById('startBtn')?.addEventListener('click', () => {
    if (!gameRunning) startGame();
  });
}


/* ============================================================
   CV PAGE — Drag & Drop
   ============================================================ */
function initCV() {
  const zone = document.getElementById('dropzone');
  if (!zone) return;

  const preview  = document.getElementById('cvPreview');
  const fileName = document.getElementById('cvFileName');
  const fileSize = document.getElementById('cvFileSize');
  const fileInput = document.getElementById('cvInput');
  const removeBtn = document.getElementById('removeCV');
  let droppedFile = null;

  function handleFile(file) {
    if (!file) return;
    const allowed = ['application/pdf','application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'];
    if (!allowed.some(t => file.type === t) && !file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      showToast('Please drop a PDF, DOC, DOCX, or TXT file!', 'pink');
      return;
    }
    droppedFile = file;
    fileName.textContent = file.name;
    fileSize.textContent = (file.size / 1024).toFixed(1) + ' KB';
    preview.classList.add('show');
    zone.style.borderColor = 'var(--green)';
    zone.querySelector('h3').textContent = 'CV Uploaded! ✅';
    showToast('CV uploaded! Looking rad 📄', 'green');
  }

  zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    handleFile(e.dataTransfer.files[0]);
  });

  fileInput?.addEventListener('change', () => handleFile(fileInput.files[0]));

  removeBtn?.addEventListener('click', () => {
    droppedFile = null;
    preview.classList.remove('show');
    zone.style.borderColor = 'var(--purple)';
    zone.querySelector('h3').textContent = 'Drop your CV here';
    if (fileInput) fileInput.value = '';
    showToast('CV removed', 'pink');
  });

  document.getElementById('downloadCV')?.addEventListener('click', () => {
    if (!droppedFile) return;
    const url = URL.createObjectURL(droppedFile);
    const a = document.createElement('a');
    a.href = url; a.download = droppedFile.name; a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('shareCV')?.addEventListener('click', () => {
    showToast('Link copied to clipboard! 🔗', 'blue');
  });
}


/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', () => {
  initIndex();
  initStore();
  initGame();
  initCV();
});
