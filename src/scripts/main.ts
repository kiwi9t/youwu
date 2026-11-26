// Interactions: theme, Overview/Index view, scroll spy + progress, in-place details,
// skill cross-filtering, project category filter, search dialog, contact form.

const root = document.documentElement;
const $ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document) => ctx.querySelector<T & Element>(sel) as T | null;
const $$ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document) => Array.from(ctx.querySelectorAll(sel)) as T[];
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};

function headerOffset() {
  const hdr = $('.hdr');
  return (hdr ? hdr.getBoundingClientRect().height : 0) + 12;
}
function scrollToElement(el: Element) {
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset();
  window.scrollTo({ top, behavior: reduceMotion() ? 'auto' : 'smooth' });
}

/* ---------- Theme ---------- */
const themeBtn = $<HTMLButtonElement>('#theme-toggle');
function syncThemeLabel() {
  const dark = root.classList.contains('theme-dark');
  themeBtn?.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
}
themeBtn?.addEventListener('click', () => {
  const dark = !root.classList.contains('theme-dark');
  root.classList.toggle('theme-dark', dark);
  root.classList.toggle('theme-light', !dark);
  store.set('theme', dark ? 'dark' : 'light');
  syncThemeLabel();
});
syncThemeLabel();

/* ---------- View toggle ---------- */
const viewBtns = $$<HTMLButtonElement>('.seg [data-view]');
function setView(v: string, save = true) {
  root.classList.toggle('view-index', v === 'index');
  root.classList.toggle('view-overview', v !== 'index');
  viewBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
  if (save) store.set('view', v);
}
viewBtns.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view || 'overview')));
setView(root.classList.contains('view-index') ? 'index' : 'overview', false);

/* ---------- Scroll spy + reading progress ---------- */
const progress = $('.progress');
const spyLinks = $$<HTMLAnchorElement>('[data-spy]');
const spyIds = ['about', 'education', 'experience', 'projects', 'skills', 'beyond', 'contact'];
let ticking = false;
function onScroll() {
  ticking = false;
  const max = root.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  if (progress) progress.style.transform = `scaleX(${p.toFixed(4)})`;
  let active = 'top';
  const line = headerOffset() + 40;
  spyIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < line) active = id;
  });
  if (p > 0.995) active = 'contact';
  spyLinks.forEach((a) => {
    const on = a.dataset.spy === active;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

/* ---------- In-place details (one open at a time) ---------- */
const toggles = $$<HTMLButtonElement>('[data-open]');
let openId: string | null = null;
function setOpen(id: string | null, trigger?: HTMLButtonElement) {
  openId = id;
  toggles.forEach((btn) => {
    const on = btn.dataset.open === id;
    const panel = document.getElementById(btn.getAttribute('aria-controls') || '');
    btn.setAttribute('aria-expanded', String(on));
    btn.firstChild && (btn.firstChild.textContent = on ? 'Hide details' : 'Show details');
    if (!panel) return;
    if (on) {
      if (panel.hidden) {
        panel.hidden = false;
        panel.classList.remove('is-opening');
        void panel.offsetWidth;
        panel.classList.add('is-opening');
      }
    } else {
      panel.hidden = true;
      panel.classList.remove('is-opening');
    }
  });
  if (id && trigger) {
    const host = trigger.closest('.item');
    if (host) {
      const r = host.getBoundingClientRect();
      if (r.top < headerOffset() || r.bottom > window.innerHeight) scrollToElement(host);
    }
  }
}
toggles.forEach((btn) => btn.addEventListener('click', () => {
  const id = btn.dataset.open || null;
  setOpen(openId === id ? null : id, btn);
  if (openId === null) btn.focus();
}));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && openId && !(document.getElementById('search') as HTMLDialogElement)?.open) {
    const visible = toggles.find((b) => b.dataset.open === openId && b.offsetParent !== null);
    setOpen(null);
    visible?.focus();
  }
});

/* ---------- Project category filter ---------- */
const grid = $('.proj-grid');
const catBtns = $$<HTMLButtonElement>('[data-cat]');
function setCat(cat: string) {
  catBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === cat)));
  const match = (el: HTMLElement) => cat === 'All' || (el.dataset.cats || '').split('|').includes(cat);
  let n = 0;
  $$<HTMLElement>('.proj').forEach((card) => {
    const show = match(card);
    card.hidden = !show;
    card.classList.remove('is-feature');
    if (show) { if (n === 0) card.classList.add('is-feature'); n++; }
  });
  $$<HTMLElement>('#projects .index-row').forEach((row) => { row.hidden = !match(row); });
  if (n === 2) $$<HTMLElement>('.proj.is-feature').forEach((c) => c.classList.remove('is-feature'));
  if (grid) grid.dataset.n = String(n);
  setOpen(null);
}
catBtns.forEach((b) => b.addEventListener('click', () => setCat(b.dataset.cat || 'All')));

/* ---------- Skill cross-filtering ---------- */
const tagBtns = $$<HTMLButtonElement>('[data-tag]');
const tagStatus = $('.tag-status');
const tagText = $('#tag-text');
let activeTag: string | null = null;
function setTag(tag: string | null, scroll = false) {
  activeTag = tag;
  tagBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tag === tag)));
  const items = $$<HTMLElement>('.item[data-tags]');
  let first: HTMLElement | null = null;
  const matched = new Set<string>();
  items.forEach((el) => {
    const m = !!tag && (el.dataset.tags || '').split('|').includes(tag);
    el.classList.toggle('is-match', m);
    el.classList.toggle('is-dim', !!tag && !m);
    if (m) {
      matched.add(el.dataset.item || '');
      if (!first && el.offsetParent !== null && !el.hidden) first = el;
    }
  });
  if (tagStatus && tagText) {
    tagStatus.hidden = !tag;
    const n = matched.size;
    tagText.textContent = tag ? `${n} ${n === 1 ? 'item uses' : 'items use'} ${tag}. Matches are outlined in Experience and Projects.` : '';
  }
  if (scroll && first) scrollToElement(first);
}
tagBtns.forEach((b) => b.addEventListener('click', () => {
  const t = b.dataset.tag || null;
  const fromSkills = !!b.closest('#skills');
  if (activeTag !== t && fromSkills && t) setCat('All');
  setTag(activeTag === t ? null : t, fromSkills && activeTag !== t);
}));
$('#tag-clear')?.addEventListener('click', () => setTag(null));

/* ---------- Search ---------- */
type Entry = { label: string; kind: string; href: string; open?: string };
const dialog = $<HTMLDialogElement>('#search');
const input = $<HTMLInputElement>('#q');
const list = $('#results');
const empty = $('#search-empty');
const index: Entry[] = JSON.parse($('#search-index')?.textContent || '[]');
let results: Entry[] = index;
let sel = 0;
const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const kbd = $('#kbd-hint');
if (kbd && !isMac) kbd.textContent = 'Ctrl K';

function render() {
  if (!list || !empty || !input) return;
  const q = input.value.trim().toLowerCase();
  results = q ? index.filter((r) => r.label.toLowerCase().includes(q) || r.kind.toLowerCase().includes(q)) : index;
  sel = Math.min(sel, Math.max(0, results.length - 1));
  list.innerHTML = '';
  results.forEach((r, i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'result';
    a.href = r.href;
    a.id = 'r-' + i;
    a.setAttribute('role', 'option');
    a.setAttribute('aria-selected', String(i === sel));
    const l = document.createElement('span'); l.textContent = r.label;
    const k = document.createElement('span'); k.className = 'kind'; k.textContent = r.kind;
    a.append(l, k);
    a.addEventListener('click', (e) => { e.preventDefault(); go(r); });
    li.append(a);
    list.append(li);
  });
  input.setAttribute('aria-activedescendant', results.length ? 'r-' + sel : '');
  empty.hidden = results.length > 0;
  empty.textContent = results.length ? '' : `No results for “${input.value.trim()}”. Try a project name or a section like Education.`;
}
function openSearch() {
  if (!dialog || !input) return;
  input.value = '';
  sel = 0;
  render();
  dialog.showModal();
  input.focus();
}
function closeSearch() { dialog?.close(); }
function go(r: Entry) {
  closeSearch();
  const target = document.querySelector(r.href);
  if (r.open) {
    if (r.kind === 'Project') setCat('All');
    setOpen(r.open);
    const btn = toggles.find((b) => b.dataset.open === r.open && b.offsetParent !== null);
    const host = btn?.closest('.item');
    if (host) { scrollToElement(host); history.replaceState(null, '', r.href); return; }
  }
  if (target) { scrollToElement(target); history.replaceState(null, '', r.href); }
}
$('#search-open')?.addEventListener('click', openSearch);
$('#search-close')?.addEventListener('click', closeSearch);
dialog?.addEventListener('click', (e) => { if (e.target === dialog) closeSearch(); });
input?.addEventListener('input', () => { sel = 0; render(); });
input?.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(results.length - 1, sel + 1); render(); $('#r-' + sel)?.scrollIntoView({ block: 'nearest' }); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); render(); $('#r-' + sel)?.scrollIntoView({ block: 'nearest' }); }
  else if (e.key === 'Enter') { e.preventDefault(); if (results[sel]) go(results[sel]); }
});
document.addEventListener('keydown', (e) => {
  const t = e.target as HTMLElement;
  const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dialog?.open ? closeSearch() : openSearch(); }
  else if (e.key === '/' && !typing && !dialog?.open) { e.preventDefault(); openSearch(); }
});

/* ---------- In-page anchors respect the sticky header ---------- */
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
  if (!a || a.closest('#search')) return;
  const id = a.getAttribute('href') || '';
  if (id.length < 2) return;
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  scrollToElement(el);
  history.pushState(null, '', id);
});

/* ---------- Contact form ---------- */
const form = $<HTMLFormElement>('#contact-form');
const status = $('#form-status');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form || !status) return;
  const data = new FormData(form);
  if (data.get('_gotcha')) return;
  const endpoint = form.dataset.endpoint;
  if (!endpoint) {
    const subject = encodeURIComponent(`Hello from ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\n${data.get('name')} (${data.get('email')})`);
    window.location.href = `mailto:${form.dataset.email}?subject=${subject}&body=${body}`;
    status.textContent = 'Your email app should open with the message filled in.';
    return;
  }
  const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  btn.disabled = true;
  status.textContent = 'Sending…';
  try {
    const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(String(res.status));
    form.reset();
    status.textContent = 'Message sent. Thanks for reaching out.';
  } catch {
    status.textContent = `Message not sent. Please email ${form.dataset.email} instead.`;
  } finally {
    btn.disabled = false;
  }
});
