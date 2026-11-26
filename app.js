import { PRODUCTS, CATEGORIES } from './data.js';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);

/* ---------- NAV + REVEAL ---------- */
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const countUp = (el) => {
  const end = +el.dataset.count;
  if (reduceMotion) return;
  const t0 = performance.now();
  const tick = (t) => {
    const k = Math.min(1, (t - t0) / 1400);
    el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(e.target);
  }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* ---------- MODAL ---------- */
const modal = $('#modal');
function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  $('#mImg').src = p.img;
  $('#mImg').alt = `${p.line} ${p.name}`;
  $('#mLine').textContent = p.line + (p.award ? ' · ocenený produkt' : '');
  $('#mTitle').textContent = p.name;
  $('#mTag').textContent = p.tagline;
  $('#mDesc').textContent = p.desc;
  const ul = $('#mIngr');
  ul.replaceChildren(...p.ingredients.map(([n, d]) => {
    const li = document.createElement('li');
    const b = document.createElement('b');
    b.textContent = n;
    const span = document.createElement('span');
    span.append(b, ` — ${d}`);
    li.append(span);
    return li;
  }));
  modal.showModal();
}
$('#mClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
$('#mCta').addEventListener('click', () => modal.close());
document.querySelectorAll('.steps li').forEach((li) => {
  li.tabIndex = 0;
  li.setAttribute('role', 'button');
  const open = () => openProduct(+li.dataset.product);
  li.addEventListener('click', open);
  li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
});

/* ---------- PRODUCT CARDS ---------- */
function makeCard(p) {
  const b = document.createElement('button');
  b.className = 'card';
  b.dataset.id = p.id;
  b.setAttribute('aria-label', `${p.line} ${p.name} — zobraziť detail`);
  b.innerHTML = `<div class="face">
      <img src="${p.img}" alt="" loading="lazy" draggable="false">
      ${p.award ? '<span class="award-tag">Ocenené 2024</span>' : ''}
      <div class="label"><small>${p.line}</small><b>${p.name}</b></div>
    </div>`;
  return b;
}

let filter = 'all';
const visible = () => PRODUCTS.filter((p) => filter === 'all' || p.cat === filter);

// chips
const chips = $('#chips');
for (const c of CATEGORIES) {
  const n = c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c.id).length;
  const b = document.createElement('button');
  b.className = 'chip';
  b.dataset.cat = c.id;
  b.setAttribute('aria-pressed', c.id === 'all');
  b.innerHTML = `${c.label}<span class="count">${n}</span>`;
  b.addEventListener('click', () => {
    filter = c.id;
    chips.querySelectorAll('.chip').forEach((x) => x.setAttribute('aria-pressed', x === b));
    buildRing();
    buildGrid();
  });
  chips.append(b);
}

/* ---------- 3D RING CAROUSEL ---------- */
const stage = $('.ring-stage');
const ring = $('#ring');
const now = $('#now');
let items = [], step = 0, radius = 0, angle = 0, target = 0, lastInteract = 0, hovering = false;

function buildRing() {
  items = visible();
  ring.replaceChildren(...items.map(makeCard));
  const n = items.length;
  const w = ring.offsetWidth || 220;
  step = 360 / n;
  radius = n < 3 ? w * 0.75 : Math.max(w * 0.9, (w + 30) / (2 * Math.tan(Math.PI / n)));
  [...ring.children].forEach((card, i) => {
    card.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`;
    card.addEventListener('click', (e) => {
      if (dragMoved) { e.preventDefault(); return; }
      if (i === frontIndex()) openProduct(items[i].id); else goTo(i);
    });
    card.addEventListener('focus', () => { if (card.matches(':focus-visible')) goTo(i); });
  });
  angle = target = 0;
  updateFront(true);
}
const mod = (a, n) => ((a % n) + n) % n;
const frontIndex = () => mod(Math.round(angle / step), items.length);
function goTo(i) {
  // nearest rotation to card i
  const cur = Math.round(target / step);
  const delta = mod(i - cur + items.length / 2, items.length) - items.length / 2;
  target = (cur + Math.round(delta)) * step;
  lastInteract = performance.now();
}
let lastFront = -1;
function updateFront(force) {
  const f = frontIndex();
  if (f === lastFront && !force) return;
  lastFront = f;
  [...ring.children].forEach((c, i) => c.classList.toggle('is-front', i === f));
  const p = items[f];
  if (p) now.innerHTML = `<small>${p.line}</small>${p.name}`;
}

$('#prev').addEventListener('click', () => { target = (Math.round(target / step) - 1) * step; lastInteract = performance.now(); });
$('#next').addEventListener('click', () => { target = (Math.round(target / step) + 1) * step; lastInteract = performance.now(); });
$('#carousel').addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { $('#prev').click(); }
  if (e.key === 'ArrowRight') { $('#next').click(); }
});
stage.addEventListener('pointerenter', () => (hovering = true));
stage.addEventListener('pointerleave', () => (hovering = false));

// drag
let dragging = false, dragX = 0, dragStart = 0, dragMoved = false;
stage.addEventListener('pointerdown', (e) => {
  dragging = true; dragMoved = false; dragX = dragStart = e.clientX;
});
addEventListener('pointermove', (e) => {
  if (!dragging) return;
  if (!dragMoved && Math.abs(e.clientX - dragStart) > 6) { dragMoved = true; stage.classList.add('dragging'); }
  if (dragMoved) { target -= (e.clientX - dragX) * 0.22; angle = target; }
  dragX = e.clientX;
  lastInteract = performance.now();
});
addEventListener('pointerup', () => {
  if (!dragging) return;
  dragging = false;
  stage.classList.remove('dragging');
  if (dragMoved) target = Math.round(target / step) * step;
  setTimeout(() => (dragMoved = false), 0);
});

let ringVisible = true;
new IntersectionObserver(([e]) => (ringVisible = e.isIntersecting)).observe(stage);
let lastT = performance.now();
function ringLoop(t) {
  requestAnimationFrame(ringLoop);
  const dt = Math.min(0.1, (t - lastT) / 1000) * 60; // frames @60 Hz
  lastT = t;
  if (!ringVisible || !items.length) return;
  const idle = !dragging && !hovering && t - lastInteract > 3500 && !reduceMotion && !stage.contains(document.activeElement);
  if (idle) target += 0.06 * dt;
  angle += (target - angle) * (reduceMotion ? 1 : 1 - Math.pow(1 - 0.09, dt));
  ring.style.transform = `translateZ(${-radius}px) rotateX(-7deg) rotateY(${-angle}deg)`;
  updateFront();
}

/* ---------- GRID VIEW ---------- */
const grid = $('#grid');
function buildGrid() {
  grid.replaceChildren(...visible().map((p) => {
    const c = makeCard(p);
    c.addEventListener('click', () => openProduct(p.id));
    if (!reduceMotion) {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) translateZ(10px)`;
      });
      c.addEventListener('pointerleave', () => (c.style.transform = ''));
    }
    return c;
  }));
}
const toggle = $('#viewToggle');
toggle.addEventListener('click', () => {
  const toGrid = grid.hidden;
  grid.hidden = !toGrid;
  $('#carousel').hidden = toGrid;
  toggle.setAttribute('aria-pressed', toGrid);
  toggle.textContent = toGrid ? 'Zobraziť ako 3D karusel' : 'Zobraziť ako mriežku';
});

buildRing();
buildGrid();
requestAnimationFrame(ringLoop);
addEventListener('resize', () => { const a = target; buildRing(); target = angle = a; });

/* ---------- MEDAL TILT ---------- */
const medal = $('#medal');
if (!reduceMotion) {
  $('#ocenenia').addEventListener('pointermove', (e) => {
    const r = medal.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / innerWidth;
    const y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
    medal.style.transform = `perspective(800px) rotateY(${x * 40}deg) rotateX(${-y * 40}deg)`;
    medal.style.setProperty('--sx', `${50 - x * 120}%`);
    medal.style.setProperty('--sy', `${50 - y * 120}%`);
  });
}

/* ---------- HERO 3D (Three.js) ---------- */
initHero().catch((err) => {
  console.warn('3D scéna sa nenačítala, zobrazujem obrázok.', err);
  $('#scene').hidden = true;
  $('.hero-fallback').hidden = false;
});

async function initHero() {
  const THREE = await import('three');
  const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
  const canvas = $('#scene');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(-4, 5, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fe3ff, 3);
  rim.position.set(5, 2, -4);
  scene.add(rim);

  const world = new THREE.Group();
  scene.add(world);
  const bottle = new THREE.Group();
  world.add(bottle);

  // label texture (front at u = 0.5)
  const lc = document.createElement('canvas');
  lc.width = 1440; lc.height = 1000;
  const g = lc.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 1440, 0);
  grad.addColorStop(0, '#e9eef3'); grad.addColorStop(0.5, '#ffffff'); grad.addColorStop(1, '#e9eef3');
  g.fillStyle = grad; g.fillRect(0, 0, 1440, 1000);
  const cx = 720;
  g.textAlign = 'center';
  g.fillStyle = '#8b97a3';
  await document.fonts.load('400 34px Jost').catch(() => {});
  g.font = '400 34px Jost, sans-serif';
  g.fillText('HYALURON', cx, 150); g.fillText('COLLAGEN', cx, 192);
  // real brand logo (white PNG) tinted grey for the label
  const logo = new Image();
  logo.src = 'img/logo.png';
  await Promise.all([logo.decode(), document.fonts.load('400 40px Jost'), document.fonts.load('500 40px Jost')]).catch(() => {});
  if (logo.naturalWidth) {
    const t = document.createElement('canvas');
    t.width = 300; t.height = 280;
    const tg = t.getContext('2d');
    tg.drawImage(logo, 0, 0, 300, 280);
    tg.globalCompositeOperation = 'source-in';
    tg.fillStyle = '#6f7b86';
    tg.fillRect(0, 0, 300, 280);
    g.drawImage(t, cx - 150, 225);
  }
  g.fillStyle = '#7b8792'; g.font = '400 62px Jost, sans-serif'; g.fillText('HYDRO CARE', cx, 580);
  g.fillStyle = '#2eb5d8'; g.font = '500 78px Jost, sans-serif'; g.fillText('serum', cx, 662);
  g.fillStyle = '#3c4650'; g.font = '600 34px Jost, sans-serif'; g.fillText('the RITUAL', cx, 830);
  g.strokeStyle = '#2eb5d8'; g.lineWidth = 2; g.beginPath(); g.moveTo(cx - 120, 850); g.lineTo(cx + 120, 850); g.stroke();
  g.fillStyle = '#9aa5af'; g.font = '400 24px Jost, sans-serif'; g.fillText('ANTI-AGEING SKINCARE', cx, 900);
  const labelTex = new THREE.CanvasTexture(lc);
  labelTex.colorSpace = THREE.SRGBColorSpace;
  labelTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const R = 0.62, H = 2.7;
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(R, R, H, 128, 1, true, -Math.PI, Math.PI * 2),
    new THREE.MeshPhysicalMaterial({ map: labelTex, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.12 })
  );
  bottle.add(body);
  const white = new THREE.MeshPhysicalMaterial({ color: 0xf4f7fa, roughness: 0.3, clearcoat: 1 });
  const base = new THREE.Mesh(new THREE.CircleGeometry(R, 64), white);
  base.rotation.x = Math.PI / 2; base.position.y = -H / 2;
  bottle.add(base);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.98, R, 0.12, 96),
    new THREE.MeshPhysicalMaterial({ color: 0xdfe6ee, metalness: 1, roughness: 0.18 }));
  collar.position.y = H / 2 + 0.06;
  bottle.add(collar);
  const cap = new THREE.Mesh(
    new THREE.CapsuleGeometry(R * 0.99, 0.62, 12, 96),
    new THREE.MeshPhysicalMaterial({ color: 0xeaf6ff, transmission: 0.92, roughness: 0.38, thickness: 0.8, ior: 1.45, clearcoat: 1 })
  );
  cap.scale.y = 0.75;
  cap.position.y = H / 2 + 0.12 + 0.62 * 0.75 / 2 + R * 0.75 - 0.32;
  bottle.add(cap);
  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.5, 32), white);
  nozzle.position.y = H / 2 + 0.38;
  bottle.add(nozzle);
  bottle.rotation.z = -0.12;

  // orbit rings
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xbdeeff, transparent: true, opacity: 0.35 });
  const orbits = [2.0, 2.5].map((r, i) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.008, 8, 200), ringMat);
    m.rotation.set(Math.PI / 2.3 + i * 0.3, i * 0.6, 0);
    world.add(m);
    return m;
  });

  // water droplets
  const dropMat = new THREE.MeshPhysicalMaterial({ color: 0xdff6ff, transmission: 1, roughness: 0.02, thickness: 1.2, ior: 1.33, clearcoat: 1, attenuationColor: new THREE.Color(0x7fd3ff), attenuationDistance: 2 });
  const dropGeo = new THREE.SphereGeometry(1, 48, 32);
  const drops = [];
  const rand = (a, b) => a + Math.random() * (b - a);
  for (let i = 0; i < 11; i++) {
    const m = new THREE.Mesh(dropGeo, dropMat);
    const s = rand(0.1, 0.42);
    m.scale.setScalar(s);
    const a = (i / 11) * Math.PI * 2;
    const d = rand(1.6, 2.9);
    m.position.set(Math.cos(a) * d, rand(-1.8, 1.9), Math.sin(a) * d * 0.7);
    m.userData = { y: m.position.y, ph: rand(0, 6), sp: rand(0.4, 0.9) };
    world.add(m);
    drops.push(m);
  }

  // particles
  const pc = document.createElement('canvas');
  pc.width = pc.height = 64;
  const pg = pc.getContext('2d');
  const rg = pg.createRadialGradient(32, 32, 0, 32, 32, 32);
  rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
  pg.fillStyle = rg; pg.fillRect(0, 0, 64, 64);
  const N = 700;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = rand(-12, 12); pos[i * 3 + 1] = rand(-7, 7); pos[i * 3 + 2] = rand(-8, 3);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.07, map: new THREE.CanvasTexture(pc), transparent: true, opacity: 0.55, depthWrite: false }));
  scene.add(points);

  // layout
  let mobile = false;
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    mobile = w < 720;
    const a = camera.aspect;
    world.position.set(mobile ? 0.3 : Math.min(3.0, 1.55 * a), mobile ? 1.35 : 0, 0);
    world.scale.setScalar(mobile ? 0.46 : Math.max(0.68, Math.min(1, a / 1.8)));
  }
  resize();
  addEventListener('resize', resize);

  // input
  const mouse = { x: 0, y: 0 };
  addEventListener('pointermove', (e) => {
    mouse.x = e.clientX / innerWidth - 0.5;
    mouse.y = e.clientY / innerHeight - 0.5;
  }, { passive: true });

  let heroVisible = true;
  new IntersectionObserver(([e]) => (heroVisible = e.isIntersecting)).observe(canvas);

  const clock = new THREE.Clock();
  let rotY = 0;
  function frame() {
    requestAnimationFrame(frame);
    if (!heroVisible) return;
    const t = clock.getElapsedTime();
    const sp = Math.min(1, scrollY / innerHeight);
    if (!reduceMotion) {
      rotY += 0.0045;
      bottle.rotation.y = rotY + sp * 2.4;
      bottle.position.y = Math.sin(t * 0.9) * 0.12;
      world.rotation.y += (mouse.x * 0.6 - world.rotation.y) * 0.05;
      world.rotation.x += (mouse.y * 0.3 - world.rotation.x) * 0.05;
      orbits[0].rotation.z = t * 0.15;
      orbits[1].rotation.z = -t * 0.1;
      for (const d of drops) d.position.y = d.userData.y + Math.sin(t * d.userData.sp + d.userData.ph) * 0.25;
      points.rotation.y = t * 0.02;
      points.position.y = (t * 0.08) % 2;
      camera.position.y = -sp * 2.2;
    }
    renderer.render(scene, camera);
  }
  frame();
}
