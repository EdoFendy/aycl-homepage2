Ecco un file **`design-system.md`** completo che sintetizza tutte le regole UI/UX del tuo sito, organizzato per macro-aree e pronto per essere usato come riferimento per le AI o il tuo team. Ho strutturato il contenuto in modo gerarchico, con regole generali e specifiche, token di design, e principi UX.

---

```markdown
# **Design System – Regole UI/UX**
*Versione 1.0 – [Data]*
*Basato su modernizzazione homepage e principi di coerenza visiva*

---
## 🎨 **1. Fondamenti del Design System**
### **1.1 Principi Guida**
- **Premium & Professionale**: Spaziatura generosa, tipografia pulita, animazioni sottili per un feel "high-end".
- **Gerarchia Visiva**: Enfasi su CTA, numeri, e titoli tramite dimensione, colore (arancione `#FF9433` come accent), e spacing.
- **Coerenza**: Scala 8pt per spacing, sistema modulare per tipografia, shadow e border-radius standardizzati.
- **Accessibilità**: Contrasto WCAG AA, navigazione keyboard, ARIA labels, e preferenze `prefers-reduced-motion`.
- **Mobile-First**: Breakpoint a 640px, touch target ≥44px, font scaling 0.85-0.9 per mobile.

### **1.2 Design Tokens Globali**
#### **Spacing (Scala 8pt)**
| Token       | Valore (px) | Uso Tipico                     |
|-------------|-------------|---------------------------------|
| `spacing-xs`| 8           | Padding interno icone          |
| `spacing-sm`| 16          | Gap tra elementi piccoli        |
| `spacing-md`| 24          | Padding card, margin sezioni    |
| `spacing-lg`| 32          | Gap tra card, padding container |
| `spacing-xl`| 48          | Padding sezioni (mobile)        |
| `spacing-2xl`| 64        | Padding sezioni (desktop)      |
| `spacing-3xl`| 80        | Margini laterali desktop        |
| `spacing-4xl`| 96        | Spazio tra step alternati      |
| `spacing-5xl`| 120       | Padding-top hero section       |

#### **Tipografia (Scala Modulare – Ratio 1.25)**
| Token       | Dimensione (px) | Peso  | Line-Height | Uso Tipico                     |
|-------------|------------------|-------|-------------|---------------------------------|
| `text-xs`   | 12               | 600   | 1.5         | Eyebrow, badge, caption         |
| `text-sm`   | 14               | 500   | 1.6         | Sottotitoli, FAQ, legal text    |
| `text-base` | 16               | 400   | 1.7         | Corpo testo, bullets            |
| `text-lg`   | 20               | 500   | 1.6         | Descrizione card, benefit       |
| `text-xl`   | 24               | 600   | 1.5         | Titoli sezioni minori           |
| `text-2xl`  | 32               | 700   | 1.3         | H2 sezioni                      |
| `text-3xl`  | 40               | 700   | 1.2         | H1 mobile, pricing headline     |
| `text-4xl`  | 48               | 800   | 1.1         | H1 desktop, prezzi              |
| `text-5xl`  | 64               | 800   | 1.1         | Hero headline                   |

#### **Colori**
| Token            | Valore HEX    | Uso Tipico                     |
|------------------|---------------|---------------------------------|
| `primary-500`    | `#FF9433`     | CTA, accent, hover states       |
| `primary-100`    | `#FFF8F0`     | Background gradient             |
| `blue-500`       | `#0E2A47`     | Testo primario, border          |
| `blue-100`       | `#F6F9FF`     | Background card, hover          |
| `gray-500`       | `#6B7C93`     | Testo secondario                |
| `gray-100`       | `#B8C2D3`     | Placeholder, footer text        |
| `white`          | `#FFFFFF`     | Testo su sfondi scuri           |
| `black`          | `#091E2E`     | Testo principale (opacità 0.85) |

#### **Shadow**
| Token       | Valore                          | Uso Tipico                     |
|-------------|---------------------------------|---------------------------------|
| `shadow-sm` | `0 2px 8px rgba(9,30,66,0.08)`  | Card hover, button              |
| `shadow-md` | `0 8px 24px rgba(9,30,66,0.10)` | Card attive, pricing            |
| `shadow-lg` | `0 16px 40px rgba(9,30,66,0.12)`| Sezioni sollevate (CTA footer) |
| `shadow-xl` | `0 24px 56px rgba(9,30,66,0.15)`| Hero, modal                    |

#### **Border Radius**
| Token         | Valore (px) | Uso Tipico                     |
|---------------|-------------|---------------------------------|
| `radius-sm`   | 8           | Badge, pill                    |
| `radius-md`   | 12          | Card, input                     |
| `radius-lg`   | 16          | Button, container               |
| `radius-xl`   | 24          | Sezioni, immagini              |
| `radius-full` | 9999        | Pill, avatar                   |

---
## 🖥️ **2. Regole UI per Componenti**
### **2.1 Layout & Griglia**
- **Container**: `max-width: 1200px`, margini laterali `40px (mobile)` / `80px (desktop)`.
- **Griglia**:
  - **Desktop**: 12 colonne (gap `32px`).
  - **Mobile**: 1 colonna (stack verticale).
- **Sezioni**:
  - Padding verticale: `64px (mobile)` / `120px (desktop)`.
  - Separazione tra sezioni: `80px-160px` (usare `spacing-4xl` o `spacing-5xl`).

### **2.2 Tipografia & Testo**
- **Titoli**:
  - **H1**: `text-5xl` (desktop), `text-3xl` (mobile), `line-height: 1.1`, max-width `600px`.
  - **H2**: `text-3xl`, `line-height: 1.2`, margine inferiore `spacing-md`.
  - **Eyebrow**: `text-xs`, uppercase, `tracking: 0.1em`, colore `primary-500`.
- **Corpo Testo**:
  - `text-base` o `text-lg`, `line-height: 1.6-1.7`, opacità `0.85` per gerarchia secondaria.
  - Larghezza massima: `540px` (60-75 caratteri/riga).
- **Link**:
  - Colore: `blue-500`, hover `primary-500`.
  - Underline: animato (da `0` a `100%` width su hover).

### **2.3 Bottoni (CTA)**
| Tipo          | Stile                          | Hover/Active                     | Uso Tipico               |
|---------------|--------------------------------|----------------------------------|--------------------------|
| **Primary**   | `bg-primary-500`, `text-white` | `scale(1.02)`, shadow `shadow-md`| Hero, pricing            |
| **Secondary** | `border-blue-500`, `text-blue-500` | `bg-blue-100`                | Alternative CTA         |
| **Tertiary**  | `text-blue-500`, no border     | `underline`, `translateX(4px)` | Link testuali            |

- **Dimensione**: Altezza `48px` (standard), `56px` (CTA footer).
- **Icone**: Freccia `→` nei primary button (animata su hover con `translateX`).
- **Spacing**: Gap `16px` tra bottoni (orizzontale), `12px` (mobile, stack verticale).

### **2.4 Card**
- **Struttura**:
  - Padding interno: `spacing-lg` (desktop), `spacing-md` (mobile).
  - Bordo: `1px solid #E5E9F2`, `1.5px` per card importanti (gradient `primary-500`).
  - Ombra: `shadow-sm` (default), `shadow-md` (hover).
- **Hover State**:
  - `translateY(-4px)` (card numeri), `translateY(-8px)` (benefit).
  - Transizione: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`.
- **Aspect Ratio**: Coerente all’interno della stessa sezione (es. pricing card `1:1.2`).

### **2.5 Illustrazioni & Media**
- **Formato**: WebP con fallback PNG, `loading="lazy"` per below-the-fold.
- **Animazioni**:
  - **Parallax**: Movimento `20-30%` più lento dello scroll (hero).
  - **Reveal**: `fade-in + scale(0.95 to 1)` on-scroll (sezioni "Ora giochiamo").
  - **Floating**: `translateY(±10px)` infinito, `duration: 6s` (elementi decorativi).
- **Border Radius**: `radius-xl` (24px) per immagini.

### **2.6 Animazioni & Micro-interazioni**
- **Scroll-Triggered**:
  - Libreria: Intersection Observer o GSAP ScrollTrigger.
  - Threshold: `15-20%` della viewport.
  - Disabilitare se `prefers-reduced-motion`.
- **Stati**:
  - **Hover**: `scale(1.02)` (button), `translateY(-4px)` (card).
  - **Active**: `scale(0.98)` (button press).
  - **Focus**: `outline: 2px solid blue-500`, `offset: 2px`.
- **Transizioni**: `0.3s cubic-bezier(0.4, 0, 0.2, 1)` (standard).

---
## 🎭 **3. Regole UX**
### **3.1 Gerarchia Visiva**
1. **Eyebrow** → **H1** → **Sottotitolo** → **CTA** → **Social Proof** (hero).
2. **Numeri in evidenza** → **Titolo sezione** → **Descrizione** → **Card** (sezioni dati).
3. **Contrasto**: Usare colore (`primary-500`), dimensione, e spacing per guidare l’attenzione.

### **3.2 Accessibilità (WCAG 2.1 AA)**
- **Contrasto**:
  - Testo normale: ≥`4.5:1`.
  - Testo large (≥18px): ≥`3:1`.
- **Navigazione**:
  - Tab order logico.
  - `skip-to-content` link.
  - ARIA labels per icone e accordion (es. `aria-expanded`).
- **Focus Visible**: `outline: 2px solid blue-500` su tutti gli elementi interattivi.

### **3.3 Responsive Design**
| Breakpoint  | Range (px)   | Regole Chiave                                  |
|-------------|--------------|------------------------------------------------|
| **Mobile**  | < 640        | Stack verticale, font `0.85x`, padding ridotto |
| **Tablet**  | 640–1024     | Griglia 2 colonne (es. FAQ), spacing `spacing-md` |
| **Desktop** | > 1024       | Layout finale, spacing `spacing-lg`            |
| **Wide**    | > 1440       | Margini laterali `120px`, font `1x`           |

### **3.4 Performance**
- **Immagini**: Compressione WebP, `srcset` per responsive, `loading="lazy"`.
- **Font**: Preload critici (`@font-face` con `font-display: swap`).
- **Animazioni**: Ottimizzare con `will-change: transform` e `transform: translateZ(0)`.
- **Lazy Load**: Per sezioni below-the-fold (es. pricing secondario).

---
## 🛠 **4. Componenti Riutilizzabili**
### **4.1 Hero Section**
```html
<div class="hero">
  <div class="container">
    <p class="eyebrow">SISTEMA DI GESTIONE AGENZIE</p>
    <h1>Titolo principale <span class="highlight">parola chiave</span></h1>
    <p class="subtitle">Sottotitolo con opacità 0.85 e max-width 540px.</p>
    <div class="cta-group">
      <button class="btn-primary">CTA Primario →</button>
      <button class="btn-secondary">CTA Secondario</button>
    </div>
    <div class="social-proof">⭐ Usato da 500+ agenzie</div>
  </div>
  <div class="illustration" data-parallax="0.2">
    <img src="hero.webp" alt="Descrizione" loading="lazy">
  </div>
</div>
```

### **4.2 Pricing Card (Primaria)**
```html
<div class="pricing-card featured">
  <div class="badge">⭐ Best Seller</div>
  <div class="price">
    <span class="currency">€</span>49<span class="period">/mese</span>
  </div>
  <h3>Pacchetto Premium</h3>
  <ul class="features">
    <li><icon-check /> Feature inclusiva</li>
    <li><icon-info tooltip="Dettagli" /> Feature con tooltip</li>
  </ul>
  <button class="btn-primary">Acquista Ora</button>
</div>
```

### **4.3 Accordion FAQ**
```html
<div class="accordion">
  <button class="accordion-header" aria-expanded="false" aria-controls="faq-1">
    <span>Domanda frequente?</span>
    <icon-plus />
  </button>
  <div id="faq-1" class="accordion-content" hidden>
    <p>Risposta dettagliata con opacità 0.85 e line-height 1.7.</p>
  </div>
</div>
```

---
## 📊 **5. Metriche di Successo & Testing**
### **5.1 KPI**
| Metrica               | Obiettivo       | Strumento          |
|-----------------------|-----------------|--------------------|
| Tempo sulla pagina    | > 2 minuti      | Google Analytics  |
| Scroll depth          | 80% a pricing   | Hotjar            |
| CTR CTA               | > 5%            | GA4                |
| Bounce rate           | < 40%           | GA4                |

### **5.2 Testing**
- **Browser**: Chrome, Firefox, Safari, Edge (ultime 2 versioni).
- **Device**: iPhone (SE/13), Android (Pixel 5), iPad, Desktop (1920px/2560px).
- **Strumenti**:
  - **Lighthouse**: Punteggio >90 (Performance, Accessibility, SEO).
  - **Screen Reader**: NVDA/JAWS per navigazione.
  - **A/B Test**: Varianti CTA (es. "Prova Gratis" vs "Scopri di Più").

---
## 📝 **6. Note Operative**
1. **Implementazione**:
   - Usare **CSS custom properties** per i token (es. `--spacing-lg: 32px`).
   - **Componenti**: Creare libreria riutilizzabile (es. React/Vue/Svelte).
   - **Animazioni**: Preferire GSAP o Framer Motion per complessità.
2. **Manutenzione**:
   - Aggiornare questo documento con nuove sezioni/componenti.
   - Validare con [W3C Validator](https://validator.w3.org/).
3. **Collaborazione**:
   - Condividere con team frontend/design per allineamento.
   - Usare questo file come riferimento per **AI generative** (es. "Genera una card pricing seguendo le regole in `design-system.md`").