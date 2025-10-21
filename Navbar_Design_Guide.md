0) Obiettivi e vincoli

Mantieni colori di brand (navy/blu + arancione).

Navigazione chiara, accessibile, veloce: desktop con barra sticky compatta; mobile con drawer a tutta altezza, focus-trap e tap target ≥ 44px.

Evita CLS, garantisci 60fps, contrasto WCAG AA.

1) Design tokens (CSS variables)

Crea/aggiorna un file :root con i token usati in header/nav.
(Sostituisci i valori con i tuoi esatti esadecimali se già definiti)

:root{
  /* colori brand (esistenti) */
  --navy-900:#0F2746; --navy-800:#173B6D; --navy-200:#D5DFEC;
  --blue-050:#F6F9FF; --blue-100:#EEF5FF;
  --orange-500:#FFA43A; --orange-050:#FFF4E7;

  /* sfondi/contorni */
  --bg-nav: #ffffffF2; /* bianco 95% opaco per blur */
  --border-soft: color-mix(in oklab, var(--navy-800) 14%, transparent);
  --ring: color-mix(in oklab, #60a5fa 70%, white 30%);

  /* tipografia/metriche */
  --fz-nav: 15px; --lh-nav: 1.4; --fz-overline: 11.5px;
  --radius-12: 12px; --radius-16: 16px; --radius-pill: 999px;

  /* ombre */
  --shadow-raise: 0 10px 30px rgba(9,30,66,.08), 0 2px 8px rgba(9,30,66,.05);
  --shadow-sticky: 0 4px 16px rgba(9,30,66,.06);

  /* timing */
  --ease: cubic-bezier(.2,.8,.2,1);
  --dur-1: 160ms; --dur-2: 240ms;
}

2) Struttura HTML semantica

Standardizza header e drawer. Evita div anonimi.

<a class="skip-link" href="#main">Salta al contenuto</a>

<header id="site-header" class="header" role="banner">
  <div class="nav-wrap" role="navigation" aria-label="Principale">
    <a class="brand" href="/" aria-label="All You Can Leads">
      <!-- logo svg -->
    </a>

    <button class="nav-toggle" aria-expanded="false" aria-controls="mobile-drawer">
      <span class="sr-only">Apri menù</span>
      <!-- icona hamburger -->
    </button>

    <ul class="nav-list">
      <!-- max 6 voci principali -->
      <li><a class="nav-link" href="/pacchetti" aria-current="page">Pacchetti</a></li>
      <li><a class="nav-link" href="/come-funziona">Come funziona</a></li>
      <li><a class="nav-link" href="/risultati">Risultati</a></li>
      <li><a class="nav-link" href="/faq">FAQ</a></li>
    </ul>

    <div class="nav-cta">
      <a class="btn-primary" href="/contatti">Contattaci ora</a>
      <button class="lang-switch" aria-haspopup="listbox" aria-expanded="false">IT</button>
    </div>
  </div>
</header>

<!-- Drawer mobile -->
<aside id="mobile-drawer" class="drawer" aria-hidden="true">
  <div class="drawer-header">
    <span class="overline">Pacchetti</span>
    <button class="drawer-close" aria-label="Chiudi menù">×</button>
  </div>

  <!-- blocco grande con le 4 opzioni pacchetti come nella tua UI -->
  <nav class="drawer-section" aria-label="Pacchetti">
    <a class="drawer-item" href="/pacchetti#setup">
      <i class="ic ic-setup" aria-hidden="true"></i>
      <div>
        <span class="item-title">Set-Up Fee</span>
        <span class="item-sub">Partnership a lungo termine…</span>
      </div>
    </a>
    <a class="drawer-item" href="/pacchetti#drive-test">…</a>
    <a class="drawer-item" href="/pacchetti#performance">…</a>
    <a class="drawer-item" href="/pacchetti#subscription">…</a>
  </nav>

  <nav class="drawer-section" aria-label="Naviga">
    <a class="nav-row" href="/">Home <span class="kbd">Apri</span></a>
    <a class="nav-row" href="/pacchetti">Pacchetti <span class="hint">Scopri i nostri pacchetti</span></a>
    <a class="nav-row" href="/come-funziona">Come Funziona <span class="hint">Metodo AYCL</span></a>
    <a class="nav-row" href="/contatti">Contattaci ora <span class="hint">Parla con noi</span></a>
  </nav>
</aside>

<div class="drawer-scrim" hidden></div>

3) Stili CSS essenziali

Applica estetica moderna: sticky + blur, spazi corretti, stati coerenti.

/* skip */
.skip-link{position:absolute;left:-9999px;top:auto}
.skip-link:focus{left:16px;top:12px;background:#fff;padding:8px 12px;border-radius:var(--radius-12);box-shadow:var(--shadow-raise)}

/* header sticky con blur */
.header{
  position:sticky; top:0; z-index:1000;
  background: var(--bg-nav);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-soft);
  transition: box-shadow var(--dur-1) var(--ease), background var(--dur-1) var(--ease);
}
.header.is-scrolled{ box-shadow: var(--shadow-sticky); }

.nav-wrap{
  max-width:1200px; margin:0 auto; padding:10px 20px;
  display:flex; align-items:center; gap:16px;
}

/* lista desktop */
.nav-list{ display:flex; gap:20px; margin-left:auto; }
.nav-link{
  font-size:var(--fz-nav); line-height:var(--lh-nav); font-weight:600;
  color:var(--navy-900); padding:10px 12px; border-radius:10px;
}
.nav-link:hover{ background:var(--blue-050); }
.nav-link:focus-visible{ outline:2px solid var(--ring); outline-offset:2px; }
.nav-link[aria-current="page"]{ color:var(--navy-800); box-shadow:inset 0 -2px 0 var(--navy-800); }

/* CTA & lingua */
.btn-primary{
  background:var(--orange-500); color:#fff; border-radius:var(--radius-pill);
  padding:10px 16px; font-weight:700; box-shadow: var(--shadow-raise);
  transition: transform var(--dur-1) var(--ease), filter var(--dur-1) var(--ease);
}
.btn-primary:hover{ filter:brightness(1.03); }
.btn-primary:active{ transform: translateY(1px); }

.lang-switch{ border:1.5px solid var(--border-soft); border-radius:12px; padding:8px 10px; background:#fff; }

/* hamburger visibile < 992px */
.nav-toggle{ display:none; }
@media (max-width: 991.98px){
  .nav-list, .nav-cta .lang-switch{ display:none; }
  .nav-toggle{ display:inline-flex; margin-left:auto; border:1px solid var(--border-soft); border-radius:10px; padding:8px }
}

/* drawer */
.drawer{
  position:fixed; inset:0 0 0 auto; width:min(100vw, 480px);
  transform: translateX(100%); transition: transform var(--dur-2) var(--ease);
  background:#fff; overflow:auto; z-index:1100; padding:20px 20px 40px;
  border-left:1px solid var(--border-soft);
}
.drawer[aria-hidden="false"]{ transform:none; }
.drawer-header{ display:flex; justify-content:space-between; align-items:center; padding:4px 0 16px; position:sticky; top:0; background:#fff; }
.overline{ font-size:var(--fz-overline); letter-spacing:.08em; color:var(--navy-800); text-transform:uppercase; }

.drawer-section{ margin:20px 0; background:var(--blue-100); border:1px solid var(--border-soft); border-radius:var(--radius-16); padding:12px }
.drawer-item{
  display:flex; gap:14px; padding:14px; border-radius:12px; background:#fff; border:1px solid transparent;
}
.drawer-item + .drawer-item{ margin-top:8px; }
.drawer-item:hover{ border-color:var(--border-soft); background:var(--blue-050); }
.item-title{ font-weight:700; color:var(--navy-900); }
.item-sub{ display:block; font-size:14px; color:#4d5e75; }

.nav-row{
  display:flex; justify-content:space-between; align-items:center;
  padding:14px 16px; border-radius:12px; color:var(--navy-900);
}
.nav-row:hover{ background:#fff; outline:1px solid var(--border-soft); }
.hint{ color:#7b8aa3; font-size:13px }
.kbd{ font-size:12px; color:#7b8aa3 }

.drawer-scrim{
  position:fixed; inset:0; background:rgba(2,12,28,.36); backdrop-filter: blur(2px);
  z-index:1090;
}

/* focus ring consistente */
a:focus-visible, button:focus-visible{ outline:2px solid var(--ring); outline-offset:2px }

/* ridurre motion */
@media (prefers-reduced-motion: reduce){
  .drawer{ transition:none }
  .btn-primary{ transition:none }
}

4) Comportamenti JS (accessibilità + interazioni)

Implementa toggling, focus-trap, gestione escape, lock dello scroll, evidenza link attivo.

// utility
const $ = sel => document.querySelector(sel);
const header = $('#site-header');
const toggle = $('.nav-toggle');
const drawer = $('#mobile-drawer');
const scrim  = document.querySelector('.drawer-scrim');

let lastFocus = null;

// sticky shadow on scroll
let lastY=0;
addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y>2);
  lastY = y;
}, {passive:true});

// open/close
function openDrawer(){
  lastFocus = document.activeElement;
  drawer.setAttribute('aria-hidden','false');
  toggle.setAttribute('aria-expanded','true');
  scrim.hidden = false;
  document.documentElement.style.overflow='hidden'; // lock scroll
  // focus first focusable
  const first = drawer.querySelector('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
  first?.focus();
  trapFocus(true);
}
function closeDrawer(){
  drawer.setAttribute('aria-hidden','true');
  toggle.setAttribute('aria-expanded','false');
  scrim.hidden = true;
  document.documentElement.style.overflow='';
  trapFocus(false);
  lastFocus?.focus();
}
toggle?.addEventListener('click', () => openDrawer());
$('.drawer-close')?.addEventListener('click', closeDrawer);
scrim?.addEventListener('click', closeDrawer);
addEventListener('keydown', (e) => {
  if(e.key==='Escape' && drawer.getAttribute('aria-hidden')==='false') closeDrawer();
});

// focus trap
function trapFocus(enable){
  function cycle(e){
    if(!enable) return;
    if(e.key!=='Tab') return;
    const nodes = drawer.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
    if(!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length-1];
    if(e.shiftKey && document.activeElement===first){ last.focus(); e.preventDefault(); }
    else if(!e.shiftKey && document.activeElement===last){ first.focus(); e.preventDefault(); }
  }
  enable ? drawer.addEventListener('keydown', cycle) : drawer.removeEventListener('keydown', cycle);
}

// evidenzia voce corrente (se non usi framework router)
document.querySelectorAll('.nav-link, .nav-row').forEach(a=>{
  if(a.getAttribute('href') && location.pathname.startsWith(new URL(a.href, location.origin).pathname)){
    a.setAttribute('aria-current','page');
  }
});

5) Migliorie specifiche al contenuto del drawer (da screenshot)

Mantieni due blocchi:
(A) “Pacchetti” con 4 card grandi (icona 36–40px a sx, titolo 16–17px bold, sottotitolo 14px, spaziatura 14–16px, fondo bianco dentro contenitore azzurrino chiaro).
(B) “Naviga” con righe semplici + hint a destra (micro-descrizione).

Usa gli stessi colori delle icone (duotone blu/arancio).

Tap target per ogni riga/card: min-height 48px (meglio 56px).

Stato attivo: bordo 1px blu chiaro + background --blue-050.

Tipografia: “PACCHETTI” e “NAVIGA” come overline (uppercase, 11–12px, tracking +0.08em).

6) Requisiti di accessibilità (WCAG)

Contrasto minimo 4.5:1 per voci nav e 3:1 per overline/hint.

role="navigation" e aria-label per nav principale e sezioni del drawer.

aria-expanded sul bottone hamburger; aria-hidden sul drawer; focus ring sempre visibile tastiera.

Supporto prefers-reduced-motion (già incluso).

“Salta al contenuto” visibile al focus.

7) Performance

Header e icone in SVG inline (no PNG pesanti); icone con currentColor dove possibile.

Precarica il logo (<link rel="preload" as="image" href="/logo.svg">).

Drawer renderizzato ma off-canvas (no mount/unmount reflow); usa transform non left/right per animare.

8) Criteri di accettazione (QA)

Desktop

Barra sticky con blur e ombra al scroll; nessun layout shift.

Voci nav cliccabili, focus visibile; aria-current presente sulla pagina attiva.

Mobile

Tocco su hamburger apre drawer in ≤240ms; body non scrolla sotto; scrim cliccabile chiude.

Tabulazione è intrappolata nel drawer; Esc chiude; ritorno del focus al trigger.

Ogni voce ha tap target ≥ 44×44 px; lettura a colori/contrasti OK.

Lighthouse

A11y ≥ 95, Best Practices ≥ 95, Performance invariata o migliore.