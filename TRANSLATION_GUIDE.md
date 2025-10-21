# Guida alle Traduzioni - Layout Stabile

## Problema
Quando i testi cambiano lunghezza tra le diverse lingue (IT, EN, ES), il layout del sito può variare troppo, creando un'esperienza utente inconsistente.

## Soluzioni Implementate

### 1. Classi CSS Utility

Abbiamo aggiunto delle classi utility in `app/globals.css` per gestire i testi multilingua:

#### Text Clamping (Limitazione Righe)
```css
.text-clamp-1  /* Limita a 1 riga */
.text-clamp-2  /* Limita a 2 righe */
.text-clamp-3  /* Limita a 3 righe */
.text-clamp-4  /* Limita a 4 righe */
```

**Quando usare:**
- Titoli brevi → `.text-clamp-1` o `.text-clamp-2`
- Descrizioni card → `.text-clamp-2` o `.text-clamp-3`
- Paragrafi introduttivi → `.text-clamp-3` o `.text-clamp-4`

#### Altezze Minime Card
```css
.card-min-h-sm  /* min-height: 280px */
.card-min-h-md  /* min-height: 360px */
.card-min-h-lg  /* min-height: 480px */
```

**Quando usare:**
- Card semplici → `.card-min-h-sm`
- Card con feature list → `.card-min-h-md`
- Card hero/featured → `.card-min-h-lg`

#### Larghezze Fisse
```css
.btn-fixed-sm  /* min-width: 120px */
.btn-fixed-md  /* min-width: 160px */
.btn-fixed-lg  /* min-width: 200px */
```

### 2. Componenti già Ottimizzati

#### Site Header
- ✅ Titoli menu limitati a 1 riga
- ✅ Descrizioni card limitati a 2 righe
- ✅ Card Drive Test con clamp

#### Pagina Pacchetti
- ✅ Titoli card limitati a 2 righe
- ✅ Descrizioni brevi limitate a 2-3 righe

## Best Practices per le Traduzioni

### 1. Lunghezza dei Testi

Cerca di mantenere lunghezze simili tra le lingue:

**✅ BUONO:**
```json
{
  "it": "Strategia personalizzata per il tuo business",
  "en": "Personalized strategy for your business",
  "es": "Estrategia personalizada para tu negocio"
}
```
Tutte circa 40-45 caratteri, layout stabile.

**❌ EVITARE:**
```json
{
  "it": "Strategia",
  "en": "Comprehensive and personalized business development strategy",
  "es": "Estrategia"
}
```
Troppe differenze di lunghezza causano problemi.

### 2. Quando Applicare text-clamp

**Sempre su:**
- Titoli nelle card (`<h2>`, `<h3>`)
- Descrizioni brevi nelle card
- Caption e sottotitoli
- Testi nei menu dropdown

**Mai su:**
- Paragrafi di contenuto principale
- Testi legali/privacy policy
- FAQ (devono essere complete)
- Footer links

### 3. Esempio di Implementazione

```tsx
// ❌ PRIMA (layout instabile)
<h3 className="text-xl font-bold text-navy">
  {t("card.title")}
</h3>
<p className="text-sm text-gray-600">
  {t("card.description")}
</p>

// ✅ DOPO (layout stabile)
<h3 className="text-xl font-bold text-navy text-clamp-2">
  {t("card.title")}
</h3>
<p className="text-sm text-gray-600 text-clamp-3">
  {t("card.description")}
</p>
```

### 4. Testing tra Lingue

Quando aggiungi o modifichi una traduzione:

1. **Switcha tra tutte le lingue** (IT → EN → ES → IT)
2. **Verifica che:**
   - Le card mantengano le stesse altezze
   - I bottoni non cambino dimensione
   - Il menu non si espanda/contragga
   - Le griglie rimangano allineate

3. **Controlla su mobile e desktop**

### 5. Linee Guida per Caratteri

Raccomandazioni per lunghezza massima:

| Elemento | Caratteri Max (consigliato) |
|----------|----------------------------|
| Titolo Hero | 60-70 |
| Titolo Card | 40-50 |
| Descrizione Card Breve | 100-120 |
| Badge/Tag | 15-20 |
| Bottone CTA | 20-30 |
| Menu Item | 15-25 |

## Come Aggiungere Nuove Traduzioni

### Step 1: Scrivi il testo in tutte le lingue
```json
{
  "it": "Testo italiano qui",
  "en": "English text here", 
  "es": "Texto español aquí"
}
```

### Step 2: Verifica lunghezze
```bash
# IT: 18 caratteri
# EN: 17 caratteri  ✅ Simili, OK
# ES: 18 caratteri
```

### Step 3: Applica le classi appropriate
```tsx
<p className="text-clamp-2">{t("nuovo.testo")}</p>
```

### Step 4: Testa visivamente
- Switcha tra le lingue
- Verifica che il layout sia stabile

## Troubleshooting

### Problema: Il testo viene tagliato troppo presto
**Soluzione:** Usa un `.text-clamp-` con numero più alto o riduci la lunghezza della traduzione

### Problema: Le card hanno altezze diverse
**Soluzione:** Aggiungi `.card-min-h-md` alla card o usa `.text-clamp-` sui testi interni

### Problema: I bottoni si allargano/stringono
**Soluzione:** Aggiungi `.btn-fixed-md` al bottone

### Problema: Il menu si sposta quando cambio lingua
**Soluzione:** Verifica che i nav items abbiano `.text-clamp-1` sui label

## Strumenti Utili

### Conta Caratteri Online
- [charactercountonline.com](https://charactercountonline.com/)
- [lettercount.com](https://www.lettercount.com/)

### Testing Visivo
1. Apri il browser DevTools
2. Switcha ripetutamente tra lingue
3. Usa il CSS overview per vedere se ci sono variazioni di layout

## Conclusione

Seguendo queste linee guida, il sito manterrà un layout stabile e professionale indipendentemente dalla lingua selezionata. L'utente avrà un'esperienza consistente e il design rimarrà pulito e ordinato.

