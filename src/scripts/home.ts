import { $, $$, RM, toast, copy, onFrame } from './shared';

const desk = () => innerWidth >= 960;

/* carousel */
const car = $('#car'), cards = $$('.tc');
const ids = cards.map((c) => c.querySelector<HTMLElement>('[data-open]')!.dataset.open!);
const prog = $('#carProg i'), prev = $<HTMLButtonElement>('#carPrev'), next = $<HTMLButtonElement>('#carNext');
function carIdx() {
  const l = car.scrollLeft;
  if (l > car.scrollWidth - car.clientWidth - 8) return cards.length - 1;
  let best = 0, bd = 1e9;
  cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft - cards[0].offsetLeft - l); if (d < bd) { bd = d; best = i; } });
  return best;
}
function carUpd() {
  const w = car.clientWidth / car.scrollWidth;
  prog.style.width = w * 100 + '%';
  prog.style.transform = `translateX(${car.scrollLeft / car.scrollWidth / w * 100}%)`;
  prev.disabled = car.scrollLeft < 8;
  next.disabled = car.scrollLeft > car.scrollWidth - car.clientWidth - 8;
}
function carGo(i: number) {
  i = Math.max(0, Math.min(cards.length - 1, i));
  car.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: RM ? 'auto' : 'smooth' });
}
car.addEventListener('scroll', () => requestAnimationFrame(carUpd), { passive: true });
addEventListener('resize', carUpd);
prev.onclick = () => carGo(carIdx() - 1);
next.onclick = () => carGo(carIdx() + 1);
carUpd();

/* therapy modal: morphs out of the tapped card and back into it */
const mo = $('#mo'), moP = $('#moP'), moS = $('#moS'), moBg = $('#moBg'), moX = $('#moX');
let src: HTMLElement | null = null, curId: string | null = null, closing = false, lastFocus: HTMLElement | null = null;
const art = (id: string) => $(`#moSrc [data-th="${id}"]`);
function fill(id: string) {
  const a = art(id);
  curId = id;
  moS.innerHTML = a.innerHTML;
  mo.setAttribute('aria-label', a.dataset.name!);
  moP.scrollTop = 0;
}
function openMo(id: string, from: HTMLElement | null) {
  lastFocus = document.activeElement as HTMLElement;
  fill(id);
  mo.classList.add('open');
  document.documentElement.style.overflow = 'hidden';
  src = from;
  moX.focus({ preventScroll: true });
  if (RM || !from) return;
  const p = moP.getBoundingClientRect(), r = from.getBoundingClientRect(), R = desk() ? 32 : 0;
  moP.style.transition = 'none';
  moP.style.transform = `translateY(${r.top - p.top}px)`;
  moP.style.clipPath = `inset(0px ${p.right - r.right}px ${Math.max(0, p.height - r.height)}px ${r.left - p.left}px round 28px)`;
  moP.offsetHeight;
  moP.style.transition = '';
  moP.style.transform = 'none';
  moP.style.clipPath = `inset(0px 0px 0px 0px round ${R}px)`;
}
function closeMo() {
  if (!mo.classList.contains('open') || closing) return;
  closing = true;
  const done = () => {
    mo.classList.remove('open');
    moP.style.transition = 'none'; moP.style.transform = ''; moP.style.clipPath = ''; moP.style.opacity = ''; moBg.style.opacity = '';
    moP.offsetHeight; moP.style.transition = '';
    document.documentElement.style.overflow = '';
    curId = null; closing = false;
    lastFocus?.focus({ preventScroll: true });
  };
  if (RM) { done(); return; }
  let t = src;
  if (curId && (!t || !t.isConnected || !t.closest('.tc,.ff-trc'))) t = cards[ids.indexOf(curId)];
  if (t?.classList.contains('tc')) {
    // jump (no snap) so the source card is on screen for the morph back
    car.style.scrollSnapType = 'none'; car.scrollLeft = t.offsetLeft - cards[0].offsetLeft; car.offsetHeight; car.style.scrollSnapType = '';
  }
  const p = moP.getBoundingClientRect();
  let r: { left: number; top: number; width: number; height: number; right: number; bottom: number } | undefined = t?.getBoundingClientRect();
  const vis = r && r.width > 0 && r.top >= -r.height * .5 && r.bottom <= innerHeight + r.height * .5 && r.left >= -r.width * .5 && r.right <= innerWidth + r.width * .5;
  if (!vis) {
    const w = Math.min(340, innerWidth * .8), hh = Math.min(480, innerHeight * .6);
    r = { left: (innerWidth - w) / 2, top: (innerHeight - hh) / 2, width: w, height: hh, right: (innerWidth + w) / 2, bottom: (innerHeight + hh) / 2 };
    moP.style.opacity = '0';
  }
  moP.scrollTop = 0;
  const cl = Math.max(0, r!.left - p.left), cr = Math.max(0, p.right - r!.right), cb = Math.max(0, p.height - r!.height);
  moP.style.transition = 'transform .55s cubic-bezier(.3,.7,.2,1),clip-path .55s cubic-bezier(.3,.7,.2,1),opacity .45s ease';
  moP.style.transform = `translateY(${r!.top - p.top}px)`;
  moP.style.clipPath = `inset(0px ${cr}px ${cb}px ${cl}px round 28px)`;
  moBg.style.opacity = '0';
  let fin = false;
  const end = () => { if (!fin) { fin = true; done(); } };
  moP.addEventListener('transitionend', function h(e) { if (e.target !== moP || e.propertyName !== 'transform') return; moP.removeEventListener('transitionend', h); end(); });
  setTimeout(end, 700);
}
document.addEventListener('click', (e) => {
  const el = e.target as HTMLElement;
  const o = el.closest<HTMLElement>('[data-open]');
  if (o) { e.preventDefault(); openMo(o.dataset.open!, o.closest<HTMLElement>('.tc') || o); return; }
  const nx = el.closest<HTMLElement>('[data-next]');
  if (nx) {
    const id = nx.dataset.next!;
    moS.style.opacity = '0';
    setTimeout(() => { fill(id); moS.style.opacity = '1'; src = cards[ids.indexOf(id)]; }, 220);
    return;
  }
  if (el.closest('[data-close]')) closeMo();
});
moBg.onclick = closeMo;
moX.onclick = closeMo;
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMo(); });

/* faq */
$$('.q button').forEach((b) => (b.onclick = () => {
  const open = b.closest('.q')!.classList.toggle('open');
  b.setAttribute('aria-expanded', String(open));
}));

/* copy */
$('#copyZsr').onclick = (e) => {
  const b = e.currentTarget as HTMLElement, l = b.querySelector('span')!;
  copy('J905864'); b.classList.add('ok'); l.textContent = 'Kopiert'; toast('ZSR-Nummer kopiert');
  setTimeout(() => { b.classList.remove('ok'); l.textContent = 'Kopieren'; }, 2000);
};
$('#copyAddr').onclick = () => { copy('Bärengasse 23, 4800 Zofingen'); toast('Adresse kopiert'); };

/* breathing widget */
const br = $('#breathe'), bt = $('#breathTxt'), btap = $('#breathTap');
let inhale = true;
$('#flower').addEventListener('animationiteration', (e) => {
  if ((e.target as HTMLElement).id !== 'flower') return;
  inhale = !inhale; bt.style.opacity = '0';
  setTimeout(() => { bt.textContent = inhale ? 'Einatmen' : 'Ausatmen'; bt.style.opacity = '1'; }, 200);
});
const tog = () => {
  const p = br.classList.toggle('paused');
  btap.textContent = p ? 'Antippen zum Fortsetzen' : 'Antippen zum Pausieren';
  bt.textContent = p ? 'Pausiert' : inhale ? 'Einatmen' : 'Ausatmen';
};
br.onclick = tog;
br.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } };

/* opening hours, live in Zurich time (data from content.ts via data-hours) */
{
  const week = $('#week'), HOURS: Record<number, [number, number]> = JSON.parse(week.dataset.hours!);
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Zurich' }));
  const d = now.getDay(), m = now.getHours() * 60 + now.getMinutes(), today = HOURS[d];
  const hm = (x: number) => `${String(Math.floor(x / 60)).padStart(2, '0')}:${String(x % 60).padStart(2, '0')}`;
  const names = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const isOpen = !!today && m >= today[0] && m < today[1];
  let k = 0;
  if (!(today && m < today[0])) { k = 1; while (!HOURS[(d + k) % 7]) k++; }
  const nd = (d + k) % 7, at = ' ab ' + hm(HOURS[nd][0]) + ' Uhr';
  const nxt = (k === 0 ? 'heute' : k === 1 ? 'morgen' : names[nd]) + at;
  const day = $(`#week [data-d="${d}"]`);
  day.classList.add('today');
  const [x0, x1] = week.dataset.axis!.split(',').map(Number);
  if (m > x0 && m < x1) day.querySelector('.bar')!.insertAdjacentHTML('beforeend', `<span class="now" style="top:${(m - x0) / (x1 - x0) * 100}%"></span>`);
  const pc = isOpen ? '#34C759' : '#FF9F0A', st = $('#status');
  st.style.setProperty('--pc', pc);
  st.querySelector('span')!.textContent = isOpen ? `Jetzt geöffnet, bis ${hm(today[1])} Uhr` : 'Geschlossen, wieder ' + nxt;
  $('#wgPulse').style.setProperty('--pc', pc);
  $('#wgStatus').textContent = isOpen ? 'Geöffnet' : 'Geschlossen';
  $('#wgSub').textContent = isOpen ? `bis ${hm(today[1])} Uhr` : 'Wieder ' + nxt;
}

/* hero tilt */
const hm = $('#heroM'), ph = $('#ph'), badges = $$('.badge');
if (matchMedia('(hover:hover)').matches && !RM) {
  hm.addEventListener('pointermove', (e) => {
    const r = hm.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    ph.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    ph.style.setProperty('--mx', (x + .5) * 100 + '%');
    ph.style.setProperty('--my', (y + .5) * 100 + '%');
    badges.forEach((b) => { const dp = +b.dataset.depth!; b.style.translate = `${x * dp}px ${y * dp}px`; });
  });
  hm.addEventListener('pointerleave', () => { ph.style.transform = ''; badges.forEach((b) => (b.style.translate = '')); });
}

/* scroll-linked: statement scrub, insurance steps, about parallax */
const sc = $('#scrub'), scW = [...sc.children], steps = $('#steps'), stepEls = $$('.step'), fillEl = $('#stepsFill'), par = $('#par');
onFrame((_, H) => {
  const r = sc.getBoundingClientRect();
  const n = Math.round(Math.min(1, Math.max(0, (H * .85 - r.top) / (r.height + H * .3))) * scW.length * 1.05);
  scW.forEach((w, i) => w.classList.toggle('lit', i < n));
  const sr = steps.getBoundingClientRect();
  fillEl.style.setProperty('--p', String(Math.min(1, Math.max(0, (H * .6 - sr.top) / (sr.height - 40)))));
  stepEls.forEach((s) => s.classList.toggle('lit', s.getBoundingClientRect().top < H * .62));
  const pr = par.parentElement!.getBoundingClientRect();
  if (pr.bottom > 0 && pr.top < H && !RM) par.style.transform = `translateY(${(pr.top / H - .5) * -70 - 40}px)`;
});

/* body finder (Straehl v4 model): figure stays put, inspector docks to the viewport on mobile */
const ff = $('#ff'), card = $('#ffCard'), stage = $('#ffStage');
const dock = $('#ffDock'), dockInsp = $('#ffDockInsp'), sideInsp = $('#ffSideInsp');
const ORDER = $$('.ff-pk').map((b) => b.dataset.pick!);
const zoneViews: Record<string, string[]> = {};
$$('.ff .zone').forEach((z) => { const v = z.closest<HTMLElement>('.ff-fig')!.dataset.fig!; (zoneViews[z.dataset.z!] ||= []).push(v); });
const isGen = (id: string) => !zoneViews[id];
const wideMq = matchMedia('(min-width:960px)');
const vib = () => navigator.vibrate?.(8);
let view = 'front', fAct: string | null = null, preview: string | null = null, dir = 'fwd', shown: string | null = null, io: IntersectionObserver | null = null, ioT = 0;

function paintZones() {
  const hi = fAct && !isGen(fAct) ? fAct : preview;
  $$('.ff .zone').forEach((z) => z.classList.toggle('is-active', z.dataset.z === hi));
  $$('.ff svg.body').forEach((s) => s.classList.toggle('has-active', !!hi));
  $$('.ff-pk').forEach((b) => b.classList.toggle('on', b.dataset.pick === preview));
}
function renderInsp() {
  const docked = !!fAct && !wideMq.matches;
  const box = wideMq.matches ? sideInsp : dockInsp;
  (wideMq.matches ? dockInsp : sideInsp).replaceChildren();
  dock.hidden = !docked;
  document.body.classList.toggle('ff-docked', docked);
  if (!fAct) { box.replaceChildren(); shown = null; return; }
  if (shown !== fAct || !box.childElementCount) {
    const tpl = $<HTMLTemplateElement>(`#ffz-${fAct}`), node = tpl.content.cloneNode(true) as DocumentFragment;
    node.querySelector('.ff-it')!.classList.add(dir);
    box.replaceChildren(node);
    box.setAttribute('aria-label', tpl.dataset.name!);
    shown = fAct;
  }
  // auto close when the figure card scrolls mostly out of view (mobile only)
  io?.disconnect(); clearTimeout(ioT);
  if (docked) {
    io = new IntersectionObserver(([e]) => { if (e.intersectionRatio < .25) { fAct = null; render(); } }, { threshold: [0, .25] });
    ioT = window.setTimeout(() => io!.observe(card), 900);
  }
}
function render(viewChanged = false) {
  ff.dataset.view = view;
  ff.classList.toggle('has', !!fAct);
  ff.classList.toggle('gen', !!fAct && isGen(fAct));
  $$('.ff-seg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === view)));
  if (viewChanged) {
    $$('.ff-fig').forEach((f) => (f.hidden = f.dataset.fig !== view));
    // re-run the stagger like a remount
    for (const sel of ['.ff-pk', '.ff-chip.z']) {
      let k = 0;
      $$(sel).forEach((b) => { b.hidden = true; void b.offsetWidth; const on = b.dataset.pv!.split(' ').includes(view); b.hidden = !on; if (on) b.style.setProperty('--i', String(k++)); });
    }
  }
  $$('.ff-chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.pick === fAct)));
  const on = $$('.ff-chip.z').find((c) => c.dataset.pick === fAct && !c.hidden), row = on?.parentElement;
  if (on && row) row.scrollTo({ left: on.offsetLeft - row.offsetLeft - 20, behavior: RM ? 'auto' : 'smooth' });
  paintZones();
  renderInsp();
}
function pick(id: string) {
  vib();
  ff.classList.add('touched');
  dir = 'fwd';
  preview = null;
  fAct = fAct === id ? null : id;
  render();
}
function pickAny(id: string) {
  if (!isGen(id) && !zoneViews[id].includes(view)) { view = zoneViews[id][0]; render(true); }
  pick(id);
}
function step(d: number) {
  if (!fAct || isGen(fAct)) return;
  vib();
  const list = ORDER.filter((id) => zoneViews[id].includes(view)), i = list.indexOf(fAct);
  dir = d > 0 ? 'fwd' : 'bwd';
  fAct = list[(i + d + list.length) % list.length];
  render();
}
function sw(v: string) {
  if (v === view) return;
  vib();
  view = v;
  if (fAct && !isGen(fAct) && !zoneViews[fAct].includes(v)) fAct = null;
  render(true);
}
function close() { vib(); fAct = null; render(); }

function onClick(e: Event) {
  const el = e.target as Element;
  const v = el.closest<HTMLElement>('[data-v]'); if (v) return sw(v.dataset.v!);
  const z = el.closest<HTMLElement>('.zone'); if (z) return pick(z.dataset.z!);
  const p = el.closest<HTMLElement>('[data-pick]'); if (p) return pickAny(p.dataset.pick!);
  const s = el.closest<HTMLElement>('[data-step]'); if (s) return step(+s.dataset.step!);
  if (el.closest('[data-ffclose]')) close();
}
ff.addEventListener('click', onClick);
dock.addEventListener('click', onClick);
ff.addEventListener('keydown', (e) => {
  const z = (e.target as Element).closest?.('.zone') as HTMLElement | null;
  if (z && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pick(z.dataset.z!); }
});
// desktop: hovering or focusing a picker item previews the zone on the figure
const pkg = $('.ff-pk-g');
pkg.addEventListener('pointerover', (e) => { const b = (e.target as Element).closest<HTMLElement>('.ff-pk'); if (b && !fAct) { preview = b.dataset.pick!; paintZones(); } });
pkg.addEventListener('pointerleave', () => { preview = null; paintZones(); });
pkg.addEventListener('focusin', (e) => { const b = (e.target as Element).closest<HTMLElement>('.ff-pk'); if (b && !fAct) { preview = b.dataset.pick!; paintZones(); } });
pkg.addEventListener('focusout', () => { preview = null; paintZones(); });

stage.addEventListener('pointerdown', (e) => {
  if (!(e.target as Element).closest('.zone')) return;
  const r = stage.getBoundingClientRect(), s = document.createElement('span');
  s.className = 'ff-rip';
  s.style.left = e.clientX - r.left + 'px';
  s.style.top = e.clientY - r.top + 'px';
  stage.appendChild(s);
  setTimeout(() => s.remove(), 900);
});

// docked header gestures: drag down > 80px closes, swipe sideways > 60px steps zones
let g: { x: number; y: number; dx: number; dy: number } | null = null;
dockInsp.addEventListener('pointerdown', (e) => {
  const grip = (e.target as Element).closest<HTMLElement>('.ff-grip');
  if (!grip || (e.target as Element).closest('button,a')) return;
  g = { x: e.clientX, y: e.clientY, dx: 0, dy: 0 };
  dockInsp.style.transition = 'none';
  grip.setPointerCapture(e.pointerId);
});
dockInsp.addEventListener('pointermove', (e) => {
  if (!g) return;
  const dx = e.clientX - g.x, dy = e.clientY - g.y;
  g.dx = dx; g.dy = dy;
  const side = Math.abs(dx) > Math.abs(dy) && fAct && !isGen(fAct) ? dx * .35 : 0;
  dockInsp.style.transform = `translate(${side}px,${dy > 0 ? dy : dy / 5}px)`;
});
const release = () => {
  if (!g) return;
  const { dx, dy } = g;
  g = null;
  dockInsp.style.transition = ''; dockInsp.style.transform = '';
  if (dy > 80) close();
  else if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
};
dockInsp.addEventListener('pointerup', release);
dockInsp.addEventListener('pointercancel', release);
wideMq.addEventListener('change', () => { shown = null; renderInsp(); });
