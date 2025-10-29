# 🔍 DEBUG PRODOTTI SBAGLIATI - PASSI PRECISI

## ❌ Problema Attuale

Nello screenshot vedi:
- **Prodotto mostrato**: Performance - Starter €1199 (con sconto -20% da €1500)
- **Prodotto atteso**: Prodotto da €3000 selezionato dal seller

Questo significa che sta usando il **prodotto fallback** invece del **prodotto WooCommerce**.

---

## 🧪 TEST DA FARE ORA

### Step 1: Riavvia il Server Homepage

```bash
cd /Users/edoardoatria/Desktop/aycl-homepage2

# Ferma il server (Ctrl+C se è in esecuzione)
# Poi riavvia:
npm run dev
```

⏳ Aspetta che appaia: `✓ Ready in X.Xs`

---

### Step 2: Genera un NUOVO Link dal Seller

1. Apri il **Seller Frontend** (Edoardo Atria)
2. Vai al **Cart Builder**
3. Seleziona il prodotto da **€3000**
4. **APRI LA CONSOLE DEL BROWSER** (F12 o Cmd+Option+I)
5. Clicca **"Genera Link Checkout"**

**Nella console cerca**:
```
🛒 [CART-BUILDER] Creating checkout for product: {
  wooProductId: ???,  ← Copia questo numero
  ...
}
🔗 [CART-BUILDER] Checkout URL: ...
```

**✏️ COPIA IL NUMERO `wooProductId` E L'URL COMPLETO**

---

### Step 3: Apri il Link Checkout

Il link si apre automaticamente, ma:

1. **APRI LA CONSOLE DEL BROWSER** (F12 o Cmd+Option+I)
2. **Guarda la console PRIMA che la pagina carichi**

**Cerca questi log nella console**:

#### A) URL Parameters
```
🌐 [PERFORMANCE] URL params: {
  wooProductId: "???",  ← DEVE ESSERE LO STESSO NUMERO DI PRIMA
  useSalePrice: false,
  ref: "...",
  fullUrl: "..."
}
```

**❓ Domanda 1**: Il `wooProductId` è presente e corretto?
- ✅ **SÌ**: Vai al punto B
- ❌ **NO** o **null**: Il problema è nella generazione dell'URL dal seller

#### B) Fetch del Prodotto
```
🔍 [PERFORMANCE] Fetching WooCommerce product: ???
```

Poi cerca UNO di questi:

**CASO 1 - Successo**:
```
✅ [PERFORMANCE] Product fetched: {
  id: ???,
  name: "...",
  regular_price: "3000.00",  ← DEVE ESSERE 3000
  sale_price: "",
  price: "3000.00"
}
```

**CASO 2 - Errore**:
```
❌ [PERFORMANCE] Failed to fetch product, status: 404
```
o
```
❌ [PERFORMANCE] Error fetching product: ...
```

**❓ Domanda 2**: Quale caso hai visto?
- ✅ **CASO 1 (Successo)**: Il prodotto è stato fetchato! Vai al punto C
- ❌ **CASO 2 (Errore)**: Il backend non trova il prodotto. Vai alla sezione "Debug Backend"

#### C) Prodotto Usato
```
✅ [PERFORMANCE] Using WooCommerce product: {
  id: ???,
  name: "...",
  regular_price: 3000,
  sale_price: 3000
}
```

O invece:
```
⚠️ [PERFORMANCE] Using fallback product (no WooCommerce product found)
```

**❓ Domanda 3**: Quale hai visto?
- ✅ **Using WooCommerce product**: Ottimo! Vai al punto D
- ❌ **Using fallback product**: Il prodotto non è stato fetchato correttamente

#### D) CartCheckout Component
```
🚨 [CART-CHECKOUT] Component initialized with: {
  cartType: "performance",
  productsCount: 1,  ← DEVE ESSERE 1
  products: [{
    id: "performance-woo-???",
    name: "...",
    regular_price: 3000,  ← DEVE ESSERE 3000
    sale_price: 3000
  }]
}
```

**❓ Domanda 4**: 
- `productsCount` è **1**?
- `regular_price` è **3000**?
- `id` inizia con **"performance-woo-"** (non "performance-starter")?

Se tutte le risposte sono SÌ, il problema è risolto! ✅

---

### Step 4: Verifica Visiva

**Nella pagina del checkout**:

#### A) Banner di Errore

Dovresti vedere UNO di questi banner in alto:

**Banner Rosso** 🔴:
```
🚨 ERRORE: Prodotto Non Trovato
Il prodotto WooCommerce (ID: ???) non è stato trovato.
Motivo: Failed to fetch product (status: 404)
⚠️ Verrà usato un prodotto di fallback. Contatta l'amministratore.
```
➡️ Significa che il backend non trova il prodotto

**Banner Giallo** 🟡:
```
⚠️ ATTENZIONE: Accesso Diretto
Stai visualizzando questa pagina senza aver selezionato un prodotto specifico.
Per vedere il prodotto corretto, genera un link dal Seller Cart Builder.
```
➡️ Significa che manca `wooProductId` nell'URL

**Nessun Banner** ✅:
➡️ Il prodotto WooCommerce è stato trovato correttamente

#### B) Prodotto nel Checkout

**Cosa dovresti vedere**:
- Nome: **Il nome del tuo prodotto da €3000** (NON "Performance - Starter")
- Prezzo: **€3000.00** (NON €1199.00 o €1500.00)
- Badge sconto: **Nessun badge** (NON "-20%")

**Se vedi ancora "Performance - Starter €1199"**:
➡️ Sta usando il fallback. Controlla i log della console.

---

## 🐛 Debug Backend (se il fetch fallisce)

Se vedi errore `❌ [PERFORMANCE] Failed to fetch product`, testa il backend:

```bash
# Test 1: Verifica che il backend sia in esecuzione
curl http://localhost:4000/health

# Test 2: Testa l'endpoint WooCommerce (sostituisci ??? con il wooProductId)
curl http://localhost:4000/woocommerce/products/???
```

**Cosa aspettarsi**:
- Se funziona: Restituisce un oggetto JSON con il prodotto
- Se fallisce: Errore 404 o 500

**Possibili cause**:
1. Backend non in esecuzione: `cd /Users/edoardoatria/Desktop/CRM_AYCL/backend && npm run dev`
2. WooCommerce credenziali sbagliate in `.env`
3. Prodotto non esiste in WooCommerce con quell'ID

---

## 📋 Checklist Rapida

Prima di testare, assicurati che:

- [ ] Backend in esecuzione: `http://localhost:4000`
- [ ] Seller Frontend in esecuzione: porta corretta
- [ ] Homepage in esecuzione: `http://localhost:5173`
- [ ] Hai riavviato il server homepage dopo le modifiche
- [ ] Console browser aperta PRIMA di cliccare "Genera Link"
- [ ] Il prodotto da €3000 esiste veramente in WooCommerce
- [ ] Il prodotto è assegnato al seller in Product Visibility

---

## 🚨 MANDAMI QUESTI DATI

Dopo aver fatto il test, mandami:

1. **URL completo** che vedi nel browser (da 🔗 `[CART-BUILDER] Checkout URL`)
2. **Tutti i log** della console che iniziano con:
   - 🌐 `[PERFORMANCE] URL params`
   - 🔍 `[PERFORMANCE] Fetching`
   - ✅ o ❌ `[PERFORMANCE]`
   - 🚨 `[CART-CHECKOUT] Component initialized`
   - 💰 `[CART-CHECKOUT] Total calculated`
3. **Screenshot** del checkout (incluso eventuale banner rosso/giallo in alto)
4. Se c'è un **banner rosso**, copia il testo dell'errore

Con questi dati posso capire esattamente dove si rompe il flusso.
