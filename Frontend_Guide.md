# 📋 TODO LIST DETTAGLIATA – MODERNIZZAZIONE HOMEPAGE

---

## 🎯 HERO SECTION

### Layout & Spacing
- [ ] **Ridefinire la gerarchia verticale**: aumentare padding-top a 120-140px (desktop) per dare più "respiro" premium
- [ ] **Grid asimmetrica 40/60**: portare la colonna testo a 40% e illustrazione a 60% (ora sembra 50/50) per dare maggiore enfasi visiva all'immagine
- [ ] **Implementare un max-width 1200px** con margini laterali min 40px (mobile) e 80px (desktop)
- [ ] **Aggiungere padding-bottom 160px** per separare meglio dalla sezione successiva

### Tipografia & Gerarchia
- [ ] **H1**: portare a 56-64px (desktop) con line-height 1.1 per impatto maggiore
- [ ] **Aggiungere un eyebrow text** sopra l'H1 (12px, uppercase, tracking +0.1em, peso 600) in arancione per il contesto ("SISTEMA DI GESTIONE AGENZIE" o simile)
- [ ] **Sottotitolo**: aumentare dimensione a 18-20px, line-height 1.6, ridurre opacità testo a 0.85 per creare gerarchia secondaria
- [ ] **Limitare larghezza paragrafo a 540px** max (60-75 caratteri per riga) per leggibilità ottimale

### CTA & Interazioni
- [ ] **Spacing tra bottoni**: 16px orizzontale (non di più)
- [ ] **Primary button**: aggiungere hover con scale(1.02) + shadow più pronunciata (0 12px 24px rgba(255,148,51,0.35))
- [ ] **Secondary button**: hover con background rgba(14,42,71,0.06) invece del solo outline
- [ ] **Aggiungere freccia animata** → dentro il primary button (translateX al hover)
- [ ] **Inserire sotto i bottoni** una social proof pill (es. "⭐️ Usato da 500+ agenzie" – 14px, colore neutro, con icona)

### Illustrazione
- [ ] **Aggiungere animazione parallax** leggera allo scroll (movimento 20-30% più lento del contenuto)
- [ ] **Implementare lazy animation al caricamento**: fade-in + translateY(-20px) con delay 0.3s
- [ ] **Aggiungere subtle floating animation** (movimento verticale 10px, durata 6s, ease-in-out infinite) per dare vita

---

## 📊 SEZIONE "I NUMERI PARLANO CHIARO"

### Layout & Struttura
- [ ] **Aggiungere headline centrata** sopra le card (H2, 36-40px) con sottotitolo a 18px
- [ ] **Gap tra card**: standardizzare a 32px (non di più per mantenere coesione visiva)
- [ ] **Card**: aspect-ratio coerente, padding interno 40px (top/bottom) e 32px (left/right)
- [ ] **Aggiungere background pattern** sottile dietro le card (dots/grid a opacità 0.03-0.05)

### Micro-UI Card
- [ ] **Numero**: aumentare a 40-48px, font-weight 700, aggiungere counter animation da 0 al numero finale on-scroll
- [ ] **Aggiungere icona/piccola illustrazione** sopra il numero (24x24px) per contesto visivo
- [ ] **Label sotto**: 15px, line-height 1.5, max 2 righe
- [ ] **Bordo**: mantenere 1.5px, aggiungere gradient nel bordo (da arancione chiaro a arancione scuro) alla card più importante
- [ ] **Hover state**: subtle lift con translateY(-4px) + shadow più pronunciata (0 20px 48px rgba(9,30,66,0.15))

### Animazioni
- [ ] **Stagger animation on-scroll**: ogni card entra con delay incrementale (0.1s, 0.2s, 0.3s)
- [ ] **Transition smooth** per hover: transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

---

## 🎲 SEZIONE "ORA GIOCHIAMO ALLE NOSTRE REGOLE"

### Layout
- [ ] **Invertire ordine mobile**: testo sopra, immagine sotto per gerarchia migliore
- [ ] **Colonna testo**: max-width 560px, allineata verticalmente al centro dell'immagine
- [ ] **Gap tra colonne**: 80px (desktop) per maggiore respiro
- [ ] **Padding sezione**: 120px top/bottom

### Contenuto & Gerarchia
- [ ] **H2**: 36-40px, aggiungere keyword in arancione per enfasi
- [ ] **Bullets**: convertire da lista semplice a card/pill:
  - [ ] Ogni bullet in un box con background azzurrino (#f6f9ff)
  - [ ] Icona checkmark arancione a sinistra (20x20px)
  - [ ] Padding 16px 24px, border-radius 12px
  - [ ] Spacing verticale 12px tra bullets
  - [ ] Testo 16px, weight 500

### Illustrazione
- [ ] **Implementare reveal on-scroll**: fade-in + scale(0.95 to 1)
- [ ] **Aggiungere glow effect** arancione sottile dietro gli elementi in evidenza dell'illustrazione

---

## ⭐ TRE BENEFIT CARD

### Layout Grid
- [ ] **Gap standardizzato**: 32px orizzontale e verticale
- [ ] **Card height**: min-height uguale per tutte (o auto con grid-auto-rows: 1fr)
- [ ] **Responsive**: 1 colonna <768px, 3 colonne >768px con breakpoint preciso

### Struttura Card
- [ ] **Padding interno**: 36px uniformemente
- [ ] **Illustrazione/icona**: dimensione fissa 80x80px, margin-bottom 24px
- [ ] **Contenitore icona**: inserire in un cerchio con background gradient (bianco → azzurrino), dimensione 96x96px, icona centrata
- [ ] **Titolo**: 20-22px, weight 700, margin-bottom 12px, line-height 1.3
- [ ] **Descrizione**: 15px, line-height 1.65, opacità 0.85, max 3 righe (poi ellipsis o expand)

### Visual Design
- [ ] **Bordo superiore colorato**: aggiungere border-top 3px solid con colore univoco per card (blu/arancione/azzurro)
- [ ] **Hover state**: 
  - [ ] Lift animation translateY(-8px)
  - [ ] Shadow: 0 24px 48px rgba(9,30,66,0.12)
  - [ ] Border-top diventa gradient
  - [ ] Icona: subtle scale(1.08)
- [ ] **Background**: micro-gradient radial da centro verso bordi (bianco → #fafcff)

### Accessibilità
- [ ] **Aggiungere focus-visible** ring 2px offset 2px in azzurro
- [ ] **Contrast ratio**: verificare che tutti i testi rispettino WCAG AA (min 4.5:1)

---

## 🔄 SEZIONE "IN COSA CONSISTE IL SISTEMA"

### Layout Alternato
- [ ] **Numerazione visual**: aggiungere numero dello step in grande (80-120px) come watermark di background con opacità 0.05
- [ ] **Connettori tra step**: inserire linea tratteggiata verticale arancione (2px, dash 8px 8px) a lato tra gli step per indicare progressione
- [ ] **Spacing tra step**: 96px verticale
- [ ] **Immagine**: border-radius 24px, shadow: 0 16px 40px rgba(9,30,66,0.1)

### Contenuto Step
- [ ] **Badge numero step**: piccola pill arancione (32x32px, centrata) con numero bianco, posizionata sopra il titolo
- [ ] **Titolo step**: 28-32px, weight 700, margin-top 16px (dal badge)
- [ ] **Descrizione**: max-width 480px, 16px, line-height 1.7
- [ ] **Aggiungere micro-CTA** alla fine della descrizione (link "Scopri di più →" 14px, arancione, underline on hover)

### Animazioni
- [ ] **Scroll-triggered**: fade-in + slideX(-30px) per blocchi a sinistra, slideX(30px) per blocchi a destra
- [ ] **Connettori**: draw animation per le linee tratteggiate (stroke-dashoffset)
- [ ] **Numero watermark**: parallax leggero (movimento opposto allo scroll)

---

## 💰 PRICING SECTION

### Struttura Generale
- [ ] **Section header**: 
  - [ ] Overline 12px uppercase "Pacchetti & Prezzi" centrato
  - [ ] H2 40-48px centrato, margin-top 8px
  - [ ] Sottotitolo 18px, opacità 0.8, max-width 640px centrato, margin-top 16px
  - [ ] Padding-bottom 64px prima delle card

### Pricing Hero Card (principale)
- [ ] **Dimensioni**: max-width 680px, centrata con margin auto
- [ ] **Badge "Best Seller"**: 
  - [ ] Posizione: absolute, top -16px, right 32px
  - [ ] Background: gradient arancione, shadow pronunciata
  - [ ] Padding 8px 20px, font 12px uppercase weight 700
  - [ ] Aggiungere icona stella ⭐️ prima del testo
- [ ] **Padding interno**: 48px
- [ ] **Bordo**: 2px gradient (arancione chiaro → arancione scuro)
- [ ] **Background**: radial gradient dal centro (bianco → #fff8f0)
- [ ] **Prezzo**: 
  - [ ] Dimensione 48-56px, weight 800
  - [ ] Simbolo € più piccolo (70% dimensione)
  - [ ] Aggiungere periodo "/mese" a 18px, opacità 0.6
  - [ ] Centered o allineato left con label sopra "A partire da" (14px)

### Card Pricing Secondarie (3 sotto)
- [ ] **Gap**: 24px tra card
- [ ] **Layout**: grid responsive 3 colonne desktop, 1 colonna mobile
- [ ] **Emphasis variabile**: 
  - [ ] Card "consigliata" con bordo arancione 1.5px
  - [ ] Altre con bordo azzurrino 1px
- [ ] **Struttura interna coerente**:
  - [ ] Padding 32px
  - [ ] Nome piano: 14px uppercase, tracking 0.05em, weight 600, margin-bottom 8px
  - [ ] Prezzo: 32px weight 700, margin-bottom 16px
  - [ ] Lista feature: icone check 16x16 arancione/azzurro, testo 14px, spacing 12px tra item
  - [ ] CTA button: full-width, margin-top 24px

### CTA Buttons
- [ ] **Primary (card consigliata)**: riempimento arancione, hover con scale(1.02)
- [ ] **Secondary (altre)**: outline blu, hover con background azzurrino
- [ ] **Altezza uniforme**: 48px
- [ ] **Testo**: 15px, weight 600

### Features List
- [ ] **Aggiungere tooltip** su feature complesse (icona "i" con hover/focus state)
- [ ] **Limitare a 5-6 feature** visibili, aggiungere "Vedi tutto" collapsible se più lunghe
- [ ] **Icone**: usare sistema consistente (checkmark per included, X o dash per excluded)

---

## ❓ FAQ SECTION

### Layout Grid
- [ ] **Grid**: 2 colonne desktop (gap 32px h, 24px v), 1 colonna mobile
- [ ] **Card tutte same height** nella stessa row (grid-auto-rows: 1fr se possibile, altrimenti min-height strategico)

### Card FAQ
- [ ] **Convertire a Accordion espandibile**:
  - [ ] Stato collapsed: solo titolo + icona "+"
  - [ ] Stato expanded: titolo + contenuto + icona "−"
  - [ ] Transition smooth 0.3s ease per height
- [ ] **Padding**: 24px (collapsed), 24px 24px 32px (expanded)
- [ ] **Titolo**: 
  - [ ] 17-18px weight 600
  - [ ] Cursor pointer
  - [ ] Color blu scuro, hover arancione
  - [ ] Icona +/− a destra, 20x20px
- [ ] **Contenuto**: 
  - [ ] 15px line-height 1.7
  - [ ] Margin-top 16px dal titolo
  - [ ] Opacità 0.85

### Interazioni
- [ ] **Hover card**: subtle border color change (da azzurrino a blu)
- [ ] **Focus**: outline visibile per accessibilità keyboard
- [ ] **Animation**: rotate icona +/− (0deg → 180deg)
- [ ] **Max-height transition** per apertura smooth (usare max-height generoso + overflow hidden)

### Visual
- [ ] **Active/expanded card**: aggiungere background azzurrino #f6f9ff e bordo blu 1.5px
- [ ] **Shadow**: standard per tutte, più pronunciata su expanded (0 12px 32px rgba(9,30,66,0.12))

---

## 📣 CTA PRE-FOOTER

### Layout
- [ ] **Section full-width** con container 1200px interno centrato
- [ ] **Padding verticale**: 80px top/bottom
- [ ] **Contenuto**: centrato, max-width 680px

### Background & Visual
- [ ] **Gradient**: ottimizzare angolatura a 135deg per dinamismo
- [ ] **Aggiungere pattern decorativo**: dots/grid bianco con opacità 0.08 come texture
- [ ] **Border-radius**: 24px per la sezione intera (creare effetto "card" invece di fascia piena)
- [ ] **Ombra**: 0 20px 60px rgba(14,42,71,0.25) per stacco dalla pagina

### Contenuto
- [ ] **Headline**: 
  - [ ] 36-44px, weight 700, color bianco
  - [ ] Line-height 1.2
  - [ ] Margin-bottom 16px
- [ ] **Sottotitolo**: 
  - [ ] 18px, color bianco opacità 0.9
  - [ ] Margin-bottom 32px
- [ ] **Buttons container**: 
  - [ ] Flex row, gap 16px, justify-content center
  - [ ] Wrap su mobile

### CTA Buttons
- [ ] **Primary**: 
  - [ ] Background arancione
  - [ ] Hover: background più chiaro + shadow arancione glow
  - [ ] Height 56px per maggiore prominenza
- [ ] **Secondary**: 
  - [ ] Border bianco 2px, testo bianco
  - [ ] Hover: background bianco, testo blu
  - [ ] Transition 0.3s

---

## 🦶 FOOTER

### Struttura
- [ ] **Padding verticale**: 64px top, 32px bottom
- [ ] **Container**: max-width 1200px centrato
- [ ] **Grid**: 4 colonne desktop (25% each), stack mobile
- [ ] **Gap colonne**: 48px orizzontale

### Colonne Link
- [ ] **Titolo colonna**: 
  - [ ] 14px uppercase, tracking 0.08em, weight 600
  - [ ] Color #ffffff opacità 0.9
  - [ ] Margin-bottom 20px
- [ ] **Link**: 
  - [ ] 15px, color #b8c2d3
  - [ ] Line-height 2 (spacing generoso)
  - [ ] Hover: color bianco + translateX(4px)
  - [ ] Transition 0.2s

### Credits & Bottom Bar
- [ ] **Separare con border-top** 1px #ffffff opacità 0.1, margin-top 48px, padding-top 32px
- [ ] **Layout**: flex row, space-between (copyright a sx, social/legal links a dx)
- [ ] **Testo**: 14px, color #b8c2d3, opacità 0.7
- [ ] **Social icons**: 
  - [ ] Size 20x20px
  - [ ] Color #b8c2d3
  - [ ] Hover: arancione + scale(1.15)
  - [ ] Gap 20px tra icone

### Accessibilità
- [ ] **Focus visible** su tutti i link
- [ ] **Aria-labels** su icone social
- [ ] **Link "Back to top"** nell'angolo (fixed bottom-right, smooth scroll)

---

## 🎨 SISTEMA DESIGN TOKENS (generale)

### Spacing Scale
- [ ] **Implementare scala 8pt**: 8px, 16px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 120px
- [ ] **Applicare consistentemente** in tutta la pagina (padding, margin, gap)

### Typography Scale
- [ ] **Definire scale modulare** (ratio 1.25 - Major Third):
  - [ ] 12px (xs)
  - [ ] 14px (sm)
  - [ ] 16px (base)
  - [ ] 20px (lg)
  - [ ] 24px (xl)
  - [ ] 32px (2xl)
  - [ ] 40px (3xl)
  - [ ] 48px (4xl)
  - [ ] 64px (5xl)

### Shadow Scale
- [ ] **Definire 4 livelli**:
  - [ ] sm: 0 2px 8px rgba(9,30,66,0.08)
  - [ ] md: 0 8px 24px rgba(9,30,66,0.10)
  - [ ] lg: 0 16px 40px rgba(9,30,66,0.12)
  - [ ] xl: 0 24px 56px rgba(9,30,66,0.15)

### Border Radius Scale
- [ ] **Definire scala**:
  - [ ] sm: 8px
  - [ ] md: 12px
  - [ ] lg: 16px
  - [ ] xl: 24px
  - [ ] full: 9999px (pill)

---

## ⚡ PERFORMANCE & ANIMAZIONI

### Loading & Performance
- [ ] **Implementare skeleton loading** per le card mentre caricano
- [ ] **Lazy load** per immagini below-the-fold (loading="lazy")
- [ ] **Preload** font critici
- [ ] **Ottimizzare illustrazioni**: formato WebP con fallback, dimensioni responsive

### Scroll Animations
- [ ] **Libreria**: usare Intersection Observer API o libreria come AOS/GSAP ScrollTrigger
- [ ] **Threshold**: trigger al 15-20% della viewport per timing naturale
- [ ] **Rispettare prefers-reduced-motion**: disabilitare animazioni per utenti con preferenza accessibilità

### Micro-interazioni
- [ ] **Button press**: subtle scale(0.98) on :active
- [ ] **Card hover**: timing consistente 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- [ ] **Link underline**: animare width da 0 a 100% on hover
- [ ] **Form inputs** (se presenti): focus con border colorato + glow shadow

---

## 📱 RESPONSIVE & MOBILE

### Breakpoints
- [ ] **Definire breakpoint system**:
  - [ ] Mobile: < 640px
  - [ ] Tablet: 640px - 1024px
  - [ ] Desktop: > 1024px
  - [ ] Wide: > 1440px

### Mobile Optimizations
- [ ] **Hero**: stack verticale, illustrazione sotto testo, ridurre H1 a 32-36px
- [ ] **Buttons**: full-width su mobile, stack verticale con gap 12px
- [ ] **Spacing**: ridurre padding sezioni a 64-80px vertical
- [ ] **Card padding**: ridurre a 24px interno
- [ ] **Font sizes**: applicare scale factor 0.85-0.9 per mobile

### Touch Targets
- [ ] **Minimo 44x44px** per tutti gli elementi cliccabili (WCAG)
- [ ] **Spacing tra touch target**: min 8px
- [ ] **Hamburger menu** (se presente): 48x48px

---

## ♿ ACCESSIBILITÀ (WCAG 2.1 AA)

### Contrasto
- [ ] **Verificare tutti i rapporti** con strumento (es. Stark, Contrast Checker)
- [ ] **Testo normale**: min 4.5:1
- [ ] **Testo large (18px+)**: min 3:1
- [ ] **UI components**: min 3:1

### Navigazione Keyboard
- [ ] **Tab order logico** in tutta la pagina
- [ ] **Focus visible** su tutti gli elementi interattivi (outline 2px)
- [ ] **Skip to content** link all'inizio
- [ ] **Accordion FAQ**: gestione ARIA (aria-expanded, aria-controls)

### Semantic HTML
- [ ] **Landmarks**: header, main, section, footer correttamente annidati
- [ ] **Heading hierarchy**: no salti (h1 → h2 → h3, non h1 → h3)
- [ ] **Alt text** descrittivi per tutte le illustrazioni
- [ ] **Aria-label** per icone senza testo

### Screen Reader
- [ ] **Testare con NVDA/JAWS** navigazione completa
- [ ] **Aria-live regions** per notifiche dinamiche se presenti
- [ ] **Lang attribute** su <html>

---

## 🧪 TESTING FINALE

- [ ] **Browser testing**: Chrome, Firefox, Safari, Edge (ultime 2 versioni)
- [ ] **Device testing**: iPhone, Android, iPad, Desktop varie risoluzioni
- [ ] **Lighthouse audit**: punteggio >90 su Performance, Accessibility, Best Practices, SEO
- [ ] **Test con utenti reali**: 5 utenti per feedback UX
- [ ] **A/B test** (se possibile) varianti CTA per ottimizzare conversioni

---

## 📊 METRICHE DI SUCCESSO

- [ ] **Definire KPI**:
  - [ ] Tempo medio sulla pagina
  - [ ] Scroll depth (% utenti che arrivano a pricing/FAQ)
  - [ ] Click-through rate sui CTA
  - [ ] Bounce rate
- [ ] **Implementare analytics** (GA4, Hotjar) per tracciamento
- [ ] **Heatmap** per vedere pattern di interazione

---

**Note finali operative:**
- Procedere sezione per sezione dall'alto verso il basso
- Commitare cambiamenti incrementalmente per facilitare rollback
- Testare ogni sezione su mobile dopo modifiche desktop
- Validare HTML/CSS con W3C Validator
- Documentare componenti riutilizzabili in un design system