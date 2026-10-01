export const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector(s) as T;
export const $$ = <T extends HTMLElement = HTMLElement>(s: string) => [...document.querySelectorAll(s)] as T[];
export const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* toast + clipboard */
let tt: number;
export function toast(m: string) {
  const t = $('#toast');
  t.querySelector('span')!.textContent = m;
  t.classList.add('show');
  clearTimeout(tt);
  tt = window.setTimeout(() => t.classList.remove('show'), 1900);
}
export async function copy(txt: string) {
  try { await navigator.clipboard.writeText(txt); } catch {
    const a = document.createElement('textarea'); a.value = txt; document.body.appendChild(a); a.select();
    try { document.execCommand('copy'); } catch {}
    a.remove();
  }
}

/* reveal on scroll */
export const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .14, rootMargin: '0px 0px -8% 0px' });
$$('.rv,.bento,.car-track,.cvx,.week').forEach((el) => io.observe(el));

/* liquid glass tab bar */
const tbW = $('#tb'), tbB = $('#tbBar'), lens = $('#tbLens'), tbs = [...tbB.querySelectorAll('a')];
const MAP: Record<string, string> = { top: 'top', finder: 'top', therapien: 'therapien', specials: 'therapien', kasse: 'kasse', ueber: 'ueber', kontakt: 'kontakt' };
const secs = Object.keys(MAP).map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
const onePage = secs.length > 0;
let act: string | null = null, lensT: number, lock = 0, drag = false;
export const setLock = (ms: number) => { lock = Date.now() + ms; };

function lensTo(a: HTMLElement | undefined, st: boolean) {
  if (!a) return;
  lens.style.width = a.offsetWidth + 'px';
  lens.style.transform = 'translateX(' + a.offsetLeft + 'px)';
  if (st && !RM) { lens.classList.add('stretch'); clearTimeout(lensT); lensT = window.setTimeout(() => lens.classList.remove('stretch'), 230); }
}
function setTab(id: string | null, force = false) {
  if (id === act && !force) return;
  act = id;
  const a = tbs.find((t) => t.dataset.t === id);
  tbs.forEach((t) => { t.classList.toggle('on', t === a); t.toggleAttribute('aria-current', t === a); });
  if (a) lensTo(a, !force); else lens.style.width = '0';
}
function follow(e: PointerEvent) {
  const r = tbB.getBoundingClientRect(), w = tbs[0].offsetWidth;
  lens.style.width = w + 'px';
  lens.style.transform = 'translateX(' + Math.max(5, Math.min(r.width - w - 5, e.clientX - r.left - w / 2)) + 'px)';
}
export function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  setLock(1100);
  const behavior: ScrollBehavior = RM ? 'auto' : 'smooth';
  if (id === 'top') scrollTo({ top: 0, behavior }); else el.scrollIntoView({ behavior });
  history.replaceState(null, '', id === 'top' ? location.pathname : '#' + id);
}
tbB.addEventListener('pointerdown', (e) => { drag = true; tbB.classList.add('drag'); tbB.setPointerCapture(e.pointerId); follow(e); });
tbB.addEventListener('pointermove', (e) => { if (drag) follow(e); });
tbB.addEventListener('pointerup', (e) => {
  if (!drag) return;
  drag = false; tbB.classList.remove('drag');
  const r = tbB.getBoundingClientRect();
  const a = tbs[Math.max(0, Math.min(tbs.length - 1, Math.floor((e.clientX - r.left) / (r.width / tbs.length))))];
  setTab(a.dataset.t!, true); lensTo(a, true);
  navigator.vibrate?.(6);
  if (onePage) goTo(a.dataset.t!); else location.href = a.href;
});
tbB.addEventListener('pointercancel', () => { drag = false; tbB.classList.remove('drag'); setTab(act, true); });
// pointer taps are handled above; keyboard activation (detail 0) follows the href
tbB.addEventListener('click', (e) => { if (e.detail) e.preventDefault(); });
// bar width changes when the call button shrinks (mini), so re-measure the lens on every size change
new ResizeObserver(() => setTab(act, true)).observe(tbB);
document.fonts?.ready.then(() => setTab(act, true));

/* scroll loop: tab bar mini + scroll spy, plus page hooks */
const root = document.documentElement;
const hooks: ((y: number, H: number) => void)[] = [];
export const onFrame = (fn: (y: number, H: number) => void) => { hooks.push(fn); fn(scrollY, innerHeight); };
let lastY = scrollY, tick = false;
function frame() {
  tick = false;
  const y = scrollY, H = innerHeight;
  root.classList.toggle('end', y > root.scrollHeight - H * 2);
  if (y > lastY + 6 && y > 240) tbW.classList.add('mini'); else if (y < lastY - 6 || y < 240) tbW.classList.remove('mini');
  lastY = y;
  if (onePage && Date.now() > lock && !drag) {
    let cur = 'top';
    secs.forEach((s) => { if (s.getBoundingClientRect().top < H * .4) cur = MAP[s.id]; });
    setTab(cur);
  }
  hooks.forEach((f) => f(y, H));
}
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(frame); } }, { passive: true });
frame();
