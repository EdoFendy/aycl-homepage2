"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  BookOpen,
  ListTree,
  Filter,
  Bookmark,
  BookmarkCheck,
  Link as LinkIcon,
  ChevronDown,
  ArrowUp,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Zap,
  Compass,
  Puzzle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

/**
 * FAQ Masterbook Page
 * - Visual design aligned to Home:
 *   - Colors: text-navy, text-orange, text-sky-blue; gradient accents (navy → sky-blue → orange)
 *   - Geometric soft backgrounds, blurred circles, gradient top rule
 *   - Rounded-2xl/3xl cards with gradient borders like homepage metric/benefit cards
 * - Interactions:
 *   - Full‑text search, chapter filters, expand/collapse, deep links (#faq-id), bookmarks (localStorage)
 *   - Sticky chapter sidebar, scroll progress, back‑to‑top, CTA card
 */

// Helper — gradient frame wrapper like homepage "metric" cards
function GradientFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))]">
      <Card className="rounded-[1rem] border-0 shadow-none bg-white/95 backdrop-blur-sm">
        {children}
      </Card>
    </div>
  )
}

// Types
type FAQItem = {
  id: string
  question: string
  answer: React.ReactNode
}

type Chapter = {
  id: string
  title: string
  emoji?: string
  icon?: React.ComponentType<{ className?: string }>
  customIcon?: string
  items: FAQItem[]
}

// Utility to slugify ids
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

// DATA — built from the user's content
const chapters: Chapter[] = [
  {
    id: "generali",
    title: "Generali",
    emoji: "📚",
    icon: HelpCircle,
    customIcon: "/iconaMessaggio.png",
    items: [
      {
        id: "diff-agenzia-aycl",
        question:
          "Qual è la differenza tra All You Can Leads e una normale agenzia di lead generation?",
        answer: (
          <div className="space-y-3 text-gray-700">
            <p>
              Le agenzie classiche vendono liste o campagne che producono click e form: dati freddi, spesso non
              verificati, che devi trasformare tu in opportunità. Risultato: costi alti, tempo perso e poche occasioni.
            </p>
            <p>
              All You Can Leads ribalta lo schema:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Non vendiamo lead: portiamo appuntamenti reali con figure decisionali in target.
              </li>
              <li>
                Niente dipendenza da Google/Meta: usiamo database proprietari verificati, AI per aggiornamento e
                segmentazione, e il nostro software interno <span className="font-semibold text-navy">Sendura</span>.
              </li>
              <li>
                Non scarichiamo su di te il lavoro: contattiamo, filtriamo e confermiamo l'interesse, fissando solo
                incontri calendarizzati.
              </li>
            </ul>
            <p>
              In sintesi: dove gli altri ti lasciano un elenco da gestire, AYCL ti fa sedere con chi decide davvero.
            </p>
          </div>
        ),
      },
      {
        id: "come-funziona-sistema-b2b",
        question: "Come funziona il vostro sistema di generazione appuntamenti B2B?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Definizione dell’ICP: settore, fascia di fatturato, area geografica.
              </li>
              <li>
                Selezione contatti in linea dal nostro database multilivello.
              </li>
              <li>
                Interazione e scrematura per registrare l’interesse e scartare i fuori target.
              </li>
              <li>
                Calendarizzazione di appuntamenti con decision maker che rispettano i parametri e hanno espresso
                interesse reale.
              </li>
            </ul>
            <p>
              Così il tuo calendario si riempie di incontri con interlocutori che hanno superato più livelli di verifica.
            </p>
          </div>
        ),
      },
      {
        id: "protocollo-aycl",
        question: "In cosa consiste il protocollo All You Can Leads?",
        answer: (
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Call iniziale per verificare la collaborazione e raccogliere info.</li>
            <li>
              Definizione dell’ICP su parametri oggettivi (fatturato, settore, luogo).
            </li>
            <li>Studio di fattibilità e quotazione per appuntamento in linea con l’ICP.</li>
            <li>Seconda call: condivisione analisi e personalizzazione offerta.</li>
            <li>Piano operativo con project manager dedicato.</li>
            <li>Lancio, ottimizzazione e messa a regime fino a flusso costante.</li>
          </ol>
        ),
      },
      {
        id: "lead-vs-appuntamenti",
        question: "Che differenza c’è tra lead e appuntamenti qualificati?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>
              Un <strong>lead</strong> è un contatto grezzo (nome, email, telefono) e non indica un reale interesse.
            </p>
            <p>
              Un <strong>appuntamento qualificato</strong> invece:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>È già calendarizzato sulla tua agenda;</li>
              <li>Rispetta i parametri dell’ICP;</li>
              <li>L’interlocutore sa perché viene contattato ed è interessato a un confronto;</li>
              <li>
                La validità è oggettiva: se non rispetta l’ICP o no‑show, non viene conteggiato o viene sostituito in
                base al pacchetto.
              </li>
            </ul>
          </div>
        ),
      },
      {
        id: "decision-maker-b2b",
        question: "Cosa significa decision maker B2B?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>
              Figure con ruolo reale nei processi di acquisto: CEO/Presidenti nelle PMI; direttori/manager nelle
              aziende strutturate o multinazionali. Spesso la decisione è condivisa (board/comitati): ti portiamo a
              parlare con chi può influenzare e orientare la scelta.
            </p>
          </div>
        ),
      },
      {
        id: "definizione-icp",
        question: "Come identificate l’ICP della mia azienda?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>
              L’ICP è definito su tre parametri: <strong>settore</strong>, <strong>fascia di fatturato</strong>,
              <strong> area geografica</strong> indicati da te. Segue uno studio di fattibilità per i canali e la
              migliore strategia d’ingaggio.
            </p>
          </div>
        ),
      },
      {
        id: "pmi-o-grandi",
        question: "Potete raggiungere solo grandi aziende o anche PMI?",
        answer: (
          <p className="text-gray-700">
            Lavoriamo con PMI, medie e multinazionali. Cambiano scrematura e figure target, la logica resta la stessa:
            metterti davanti a referenti con reale ruolo decisionale.
          </p>
        ),
      },
      {
        id: "contatto-decisori",
        question:
          "Mi portate direttamente a contatto con i decisori o rischio referenti poco rilevanti?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>
              Sì, ma il livello dipende da necessità e struttura target:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Nelle PMI: di norma CEO/titolare.</li>
              <li>
                In aziende strutturate/multinazionali: direttori di reparto o manager locali con budget e responsabilità.
              </li>
            </ul>
            <p>
              Esempio: per soluzioni marketing → in PMI l’imprenditore; in multinazionale il Direttore Marketing della BU
              italiana.
            </p>
          </div>
        ),
      },
      {
        id: "tecnologie-usate",
        question: "Quali tecnologie utilizzate per la generazione degli appuntamenti?",
        answer: (
          <p className="text-gray-700">
            Infrastrutture proprietarie e strumenti avanzati di outreach multicanale. Ogni progetto è personalizzato per
            settore e target.
          </p>
        ),
      },
      {
        id: "origine-dati",
        question: "Da dove provengono i vostri dati e come vengono aggiornati?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Approvvigionamento diretto: ricerca, raccolta e verifica periodica.</li>
            <li>Provider certificati: dataset qualificati con contatti executive verificati.</li>
            <li>Arricchimento proprietario: scoring ed enrichment con AI.</li>
          </ul>
        ),
      },
      {
        id: "ai-sistemi",
        question: "Utilizzate l’intelligenza artificiale nei vostri sistemi?",
        answer: (
          <p className="text-gray-700">
            Sì. Dalla segmentazione alla personalizzazione dei messaggi, fino al follow‑up priority. L’AI potenzia il
            team umano, che mantiene il controllo di qualità.
          </p>
        ),
      },
      {
        id: "perche-piu-efficace-adv",
        question: "Perché il vostro metodo è più efficace rispetto alla pubblicità online?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>
              Le ADV si basano su aste dove vince chi spende di più. Con AYCL paghi il <em>risultato</em> (l’appuntamento),
              non il click o l’impression: l’investimento diventa meeting reali con persone che contano.
            </p>
          </div>
        ),
      },
      {
        id: "problemi-outreach",
        question: "Quali problemi risolve l’outreach multicanale?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <ul className="list-disc pl-5 space-y-2">
              <li>Le ADV richiedono budget crescenti e margini ridotti;</li>
              <li>Network/passaparola non sono prevedibili né scalabili.</li>
            </ul>
            <p>Moltiplicando i punti di contatto, aumenta la risposta e si stabilizza il flusso di opportunità.</p>
          </div>
        ),
      },
      {
        id: "perche-non-agenzia",
        question:
          "Perché scegliere voi invece di assumere un’agenzia esterna o un media buyer?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>
              Non siamo intermediari e non dipendiamo da piattaforme terze. Abbiamo infrastrutture proprietarie e ci
              assumiamo la responsabilità del risultato: non promesse, ma appuntamenti misurabili.
            </p>
          </div>
        ),
      },
      {
        id: "diff-cold-calling",
        question:
          "Differenze rispetto a cold calling o campagne generiche di email marketing?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>
              Cold calling = contatti freddi, tempi lunghi, conversioni basse. Email generiche = database non profilati,
              risposte casuali.
            </p>
            <p>
              AYCL contatta, screma e registra l’interesse <em>prima</em> di fissare: quando ti siedi, l’interlocutore è in
              target e predisposto.
            </p>
          </div>
        ),
      },
      {
        id: "garanzia-appuntamenti",
        question: "Gli appuntamenti qualificati sono garantiti?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Performance: paghi solo quelli svolti e conformi all’ICP.</li>
            <li>Subscription: garantito un range mensile.</li>
            <li>Set‑Up Fee: garanzia estesa al ritorno economico (revenue share).</li>
          </ul>
        ),
      },
      {
        id: "app-non-icp",
        question: "Cosa accade se un appuntamento non corrisponde all’ICP definito?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <ul className="list-disc pl-5 space-y-2">
              <li>Performance: non lo paghi.</li>
              <li>Subscription: viene sostituito.</li>
            </ul>
            <p>
              Hai 48 ore per segnalarlo: verifichiamo subito e, se fuori ICP, viene escluso senza costi.
            </p>
          </div>
        ),
      },
      {
        id: "monitoraggio-risultati",
        question: "Come posso monitorare risultati e attività?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Dashboard personale su <strong>Sendura</strong> in tempo reale.</li>
            <li>Report bisettimanali e confronti regolari col project manager.</li>
          </ul>
        ),
      },
      {
        id: "referente-dedicato",
        question: "Avrò un referente dedicato?",
        answer: <p className="text-gray-700">Sì: un project manager dedicato, punto di contatto diretto.</p>,
      },
      {
        id: "tempi-risultati",
        question: "Quanto tempo serve per vedere i primi risultati?",
        answer: (
          <p className="text-gray-700">
            30–90 giorni di testing per massa dati e ottimizzazioni. Possono arrivare appuntamenti già in questa fase;
            obiettivo: regime stabile e prevedibile.
          </p>
        ),
      },
    ],
  },
  {
    id: "performance",
    title: "Performance Pack",
    emoji: "⚡",
    icon: Zap,
    customIcon: "/iconaPerformance.png",
    items: [
      {
        id: "perf-step-operativi",
        question: "Quali sono gli step operativi del Pacchetto Performance?",
        answer: (
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Call iniziale e raccolta info.</li>
            <li>Definizione ICP (fatturato, settore, area geografica).</li>
            <li>Studio di fattibilità e quotazione per appuntamento.</li>
            <li>Seconda call: analisi e personalizzazione offerta.</li>
            <li>Piano operativo con PM dedicato.</li>
            <li>Attivazione, testing, ottimizzazione e messa a regime.</li>
          </ol>
        ),
      },
      {
        id: "perf-quota-app",
        question: "Come viene stabilita la quota per appuntamento?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Grandezza/complessità del cluster target;</li>
            <li>Difficoltà e frequenza di contatto;</li>
            <li>Localizzazione geografica.</li>
          </ul>
        ),
      },
      {
        id: "perf-primo-anno",
        question: "Perché il Pacchetto Performance è valido solo per il primo anno?",
        answer: (
          <p className="text-gray-700">
            È uno starter pack per provare il sistema in modo diretto, generare appuntamenti qualificati e preparare il
            passaggio a formule più scalabili.
          </p>
        ),
      },
      {
        id: "perf-recesso",
        question: "Posso recedere dal contratto in qualsiasi momento?",
        answer: (
          <p className="text-gray-700">Sì: con preavviso di 28 giorni per chiusura ordinata delle attività.</p>
        ),
      },
      {
        id: "perf-def-icp",
        question: "Come si definisce l’ICP?",
        answer: (
          <p className="text-gray-700">Settore, fascia di fatturato, area geografica + studio di fattibilità.</p>
        ),
      },
      {
        id: "perf-monitoraggio",
        question: "Come posso monitorare risultati e attività?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Dashboard Sendura in tempo reale;</li>
            <li>Report ogni due settimane + confronti col PM.</li>
          </ul>
        ),
      },
      {
        id: "perf-decisori",
        question:
          "Mi portate direttamente dai decisori o rischio di parlare con figure non rilevanti?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>Dipende da esigenze e struttura delle aziende target.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>PMI: spesso CEO/titolare;</li>
              <li>Multinazionali: direttori di reparto o manager locali con budget.</li>
            </ul>
          </div>
        ),
      },
      {
        id: "perf-pmi",
        question: "Potete raggiungere solo grandi aziende o anche PMI?",
        answer: (
          <p className="text-gray-700">Entrambe: sistema flessibile con logica invariata sui decisori.</p>
        ),
      },
      {
        id: "perf-dati",
        question: "Da dove provengono i vostri dati e come vengono aggiornati?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Approvvigionamento diretto;</li>
            <li>Provider certificati;</li>
            <li>Arricchimento proprietario con AI.</li>
          </ul>
        ),
      },
      {
        id: "perf-app-fuori-icp",
        question: "Cosa accade se un appuntamento non corrisponde all’ICP definito?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>Non è valido: nel Performance non lo paghi.</p>
            <p>Hai 72 ore per segnalarlo: verifichiamo ed escludiamo se fuori ICP.</p>
          </div>
        ),
      },
      {
        id: "perf-ai",
        question: "Utilizzate l’intelligenza artificiale?",
        answer: (
          <p className="text-gray-700">Sì, integrata in segmentazione, messaggi e priorità di follow‑up.</p>
        ),
      },
      {
        id: "perf-referente",
        question: "Avrò un referente dedicato?",
        answer: <p className="text-gray-700">Sì, project manager dedicato.</p>,
      },
      {
        id: "perf-tempi",
        question: "Quanto tempo per i risultati?",
        answer: (
          <p className="text-gray-700">30–90 giorni di testing per arrivare a regime con flusso costante.</p>
        ),
      },
      {
        id: "perf-saldo",
        question: "Quando devo saldare gli appuntamenti?",
        answer: (
          <p className="text-gray-700">Ogni 14 giorni: paghi solo gli appuntamenti qualificati effettivamente svolti.</p>
        ),
      },
    ],
  },
  {
    id: "setup-fee",
    title: "Set‑Up Fee + Revenue Share",
    emoji: "🧭",
    icon: Compass,
    customIcon: "/iconaSetupfee.png",
    items: [
      {
        id: "setup-step",
        question: "Quali sono gli step operativi del Pacchetto Set‑Up Fee + Revenue Share?",
        answer: (
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Call iniziale e valutazione compatibilità con revenue share.</li>
            <li>Definizione ICP (settore, area, dimensione).</li>
            <li>
              Studio di fattibilità operativo ed economico (potenziale mercato, ritorno atteso, KPI della partnership).
            </li>
            <li>Seconda call: termini e criteri di revenue share.</li>
            <li>Piano strategico/operativo con PM dedicato e roadmap orientata al fatturato.</li>
            <li>Attivazione, testing, ottimizzazione e messa a regime.</li>
          </ol>
        ),
      },
      {
        id: "setup-parametri",
        question:
          "Quali parametri applicate per il calcolo della fee iniziale e della revenue share?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Cluster di riferimento (settore e dimensione del mercato);</li>
            <li>Volumi e complessità (contatti/canali da attivare);</li>
            <li>Ticket medio delle trattative.</li>
          </ul>
        ),
      },
      {
        id: "setup-azienda-adatta",
        question: "La mia azienda è adatta a questa formula di partnership?",
        answer: (
          <p className="text-gray-700">
            Ideale per imprese strutturate con investimenti già attivi in crescita (es. traffico a pagamento), LTV chiara
            e portafoglio prodotti/servizi solido. Non adatta a chi deve ancora testare il mercato.
          </p>
        ),
      },
      {
        id: "setup-vantaggi-accesso-permanente",
        question:
          "Che vantaggi offre l’accesso permanente al sistema rispetto a servizi a tempo/pacchetto?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Tecnologia, database e know‑how sempre attivi per la tua azienda;</li>
            <li>Partnership di lungo periodo con continuità di strategia e ottimizzazioni;</li>
            <li>Allineamento totale tramite revenue share: cresciamo se cresci.</li>
          </ul>
        ),
      },
      {
        id: "setup-def-icp",
        question: "Come si definisce l’ICP?",
        answer: (
          <p className="text-gray-700">Settore, fascia di fatturato, area geografica + studio di fattibilità.</p>
        ),
      },
      {
        id: "setup-monitoraggio",
        question: "Come posso monitorare risultati e attività?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Dashboard Sendura real‑time;</li>
            <li>Report ogni due settimane + confronti col PM.</li>
          </ul>
        ),
      },
      {
        id: "setup-decisori",
        question:
          "Mi portate direttamente dai decisori o rischio di parlare con referenti che non decidono nulla?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <ul className="list-disc pl-5 space-y-2">
              <li>PMI: CEO/titolare;</li>
              <li>Multinazionali: direttori di reparto/manager con budget.</li>
            </ul>
            <p>Esempio: per marketing, PMI → imprenditore; multinazionale → Direttore Marketing BU Italia.</p>
          </div>
        ),
      },
      {
        id: "setup-pmi",
        question: "Potete raggiungere solo grandi aziende o anche PMI?",
        answer: (
          <p className="text-gray-700">Entrambe, stessa logica: incontrare chi ha peso decisionale.</p>
        ),
      },
      {
        id: "setup-dati",
        question: "Da dove provengono i vostri dati e come vengono aggiornati?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Approvvigionamento diretto;</li>
            <li>Provider certificati;</li>
            <li>Arricchimento proprietario con AI.</li>
          </ul>
        ),
      },
      {
        id: "setup-ai",
        question: "Utilizzate l’intelligenza artificiale nei vostri sistemi?",
        answer: (
          <p className="text-gray-700">Sì: segmentazione, personalizzazione e gestione priorità di follow‑up.</p>
        ),
      },
      {
        id: "setup-referente",
        question: "Avrò un referente dedicato durante la collaborazione?",
        answer: <p className="text-gray-700">Sì, project manager dedicato.</p>,
      },
      {
        id: "setup-tempi",
        question: "Quanto tempo serve per vedere i primi risultati?",
        answer: (
          <p className="text-gray-700">30–90 giorni di testing → messa a regime con flusso costante e prevedibile.</p>
        ),
      },
    ],
  },
  {
    id: "subscription",
    title: "Subscription Pack",
    emoji: "🧩",
    icon: Puzzle,
    customIcon: "/iconaSubscr.png",
    items: [
      {
        id: "sub-step",
        question: "Quali sono gli step operativi del Pacchetto Subscription?",
        answer: (
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Call iniziale e raccolta info.</li>
            <li>Definizione ICP (fatturato, settore, area).</li>
            <li>Studio di fattibilità: quota per appuntamento e range mensile.</li>
            <li>Seconda call: analisi e personalizzazione offerta.</li>
            <li>Piano operativo con PM dedicato.</li>
            <li>Attivazione, testing, ottimizzazione e piena messa a regime.</li>
          </ol>
        ),
      },
      {
        id: "sub-quota",
        question: "Come viene stabilita la quota per appuntamento?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Grandezza/complessità del cluster;</li>
            <li>Difficoltà e frequenza di contatto;</li>
            <li>Localizzazione geografica;</li>
            <li>Quote distinte se sono definiti più ICP.</li>
          </ul>
        ),
      },
      {
        id: "sub-range",
        question: "Quanti appuntamenti mensili sono previsti e come si stabilisce il range?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>
              Il range si definisce sulla tua capacità di gestire trattative. Tu indichi il numero desiderato, noi
              verifichiamo la coerenza col target. Il minimo del range diventa la quota <strong>garantita</strong>.
            </p>
          </div>
        ),
      },
      {
        id: "sub-recesso",
        question: "Posso recedere dal contratto in qualsiasi momento?",
        answer: (
          <p className="text-gray-700">
            Sì: preavviso di 28 giorni. Concludiamo le attività in corso; restano dovuti gli appuntamenti già confermati.
          </p>
        ),
      },
      {
        id: "sub-def-icp",
        question: "Come si definisce il profilo del cliente ideale (ICP)?",
        answer: <p className="text-gray-700">Settore, fascia di fatturato, area geografica + studio di fattibilità.</p>,
      },
      {
        id: "sub-monitoraggio",
        question: "Come posso monitorare risultati e attività?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Dashboard Sendura real‑time;</li>
            <li>Report bisettimanali + confronti col PM.</li>
          </ul>
        ),
      },
      {
        id: "sub-decisori",
        question:
          "Mi portate direttamente dai decisori o rischio di parlare con referenti che non decidono nulla?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <ul className="list-disc pl-5 space-y-2">
              <li>PMI: CEO/titolare;</li>
              <li>Multinazionali: direttori/manager locali con budget.</li>
            </ul>
            <p>Esempio: marketing → imprenditore (PMI) / Direttore Marketing BU Italia (multinazionale).</p>
          </div>
        ),
      },
      {
        id: "sub-pmi",
        question: "Potete raggiungere solo grandi aziende o anche PMI?",
        answer: <p className="text-gray-700">Entrambe, stessa logica sui decisori.</p>,
      },
      {
        id: "sub-dati",
        question: "Da dove provengono i vostri dati e come vengono aggiornati?",
        answer: (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Approvvigionamento diretto;</li>
            <li>Provider certificati;</li>
            <li>Arricchimento proprietario con AI.</li>
          </ul>
        ),
      },
      {
        id: "sub-app-fuori-icp",
        question: "Cosa accade se un appuntamento non corrisponde all’ICP definito?",
        answer: (
          <div className="space-y-2 text-gray-700">
            <p>Non è valido: nel Performance non lo paghi.</p>
            <p>
              Hai 72 ore per segnalarlo: verifichiamo subito e, se fuori ICP, viene escluso senza costi aggiuntivi.
            </p>
          </div>
        ),
      },
      {
        id: "sub-ai",
        question: "Utilizzate l’intelligenza artificiale nei vostri sistemi?",
        answer: <p className="text-gray-700">Sì: segmentazione, personalizzazione e follow‑up priority.</p>,
      },
      {
        id: "sub-referente",
        question: "Avrò un referente dedicato durante la collaborazione?",
        answer: <p className="text-gray-700">Sì, project manager dedicato.</p>,
      },
      {
        id: "sub-tempi",
        question: "Quanto tempo serve per iniziare a vedere i primi risultati?",
        answer: <p className="text-gray-700">30–90 giorni di testing → regime costante.</p>,
      },
      {
        id: "sub-saldo",
        question: "Quando devo saldare gli appuntamenti?",
        answer: (
          <p className="text-gray-700">
            Una volta al mese, in base al range di appuntamenti qualificati previsto e agli incontri svolti.
          </p>
        ),
      },
    ],
  },
]

export default function FAQMasterbookPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [activeChapter, setActiveChapter] = useState<string>("all")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [openAll, setOpenAll] = useState(false)
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({})
  const containerRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const [progress, setProgress] = useState(0)

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aycl-faq-bookmarks")
      if (saved) setBookmarks(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("aycl-faq-bookmarks", JSON.stringify(bookmarks))
    } catch {}
  }, [bookmarks])

  // Handle hash deep links
  useEffect(() => {
    if (typeof window === "undefined") return
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      setExpanded((prev) => ({ ...prev, [hash]: true }))
      // slight delay to ensure DOM painted
      setTimeout(() => {
        const el = document.getElementById(hash)
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 80)
    }
  }, [])

  // Scroll progress
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const p = Math.min(100, Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100))
      setProgress(p)
    }
    el.addEventListener("scroll", onScroll)
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  // Keyboard shortcuts: \/ to focus search, Ctrl/Cmd+E expand all, Ctrl/Cmd+C collapse, ESC reset
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement as HTMLElement | null)?.isContentEditable
      if (e.key === '/' && !typing) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if ((e.key === 'e' || e.key === 'E') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        toggleAll(true)
      }
      if ((e.key === 'c' || e.key === 'C') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        toggleAll(false)
      }
      if (e.key === 'Escape') {
        setQuery('')
        toggleAll(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const allItems = useMemo(() => chapters.flatMap((c) => c.items.map((it) => ({ ...it, chapter: c.id }))), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allItems.filter((it) => {
      const inChapter = activeChapter === "all" || activeChapter === (it as any).chapter
      if (!inChapter) return false
      if (!q) return true
      const text = `${it.question}`.toLowerCase()
      // crude string for answer
      const answerStr = (typeof it.answer === "string" ? it.answer : (it.answer as any)?.props?.children)
      const str = `${text} ${JSON.stringify(answerStr)}`.toLowerCase()
      return str.includes(q)
    })
  }, [allItems, query, activeChapter])

  const grouped = useMemo(() => {
    const map: Record<string, FAQItem[]> = {}
    for (const it of filtered) {
      const ch = (it as any).chapter as string
      map[ch] ??= []
      map[ch].push(it)
    }
    return map
  }, [filtered])

  const toggleAll = (val: boolean) => {
    setOpenAll(val)
    const next: Record<string, boolean> = {}
    filtered.forEach((it) => (next[it.id] = val))
    setExpanded(next)
  }

  const toggleOne = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }))
  const isOpen = (id: string) => !!expanded[id] || openAll

  const copyLink = async (id: string) => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`
      await navigator.clipboard.writeText(url)
      alert("Link copiato negli appunti ✅")
    } catch {
      // fallback
    }
  }

  const toggleBookmark = (id: string) => setBookmarks((b) => ({ ...b, [id]: !b[id] }))

  const chapterTabs = [
    { id: "all", title: "Tutte" },
    ...chapters.map((c) => ({ id: c.id, title: c.title })),
  ]

  return (
    <div className="min-h-screen bg-white relative">

      {/* Decorative accents */}
      <div className="absolute top-16 right-10 w-32 h-32 bg-orange/10 rounded-full blur-3xl" />
      <div className="absolute top-40 left-10 w-28 h-28 bg-sky-blue/10 rounded-full blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-navy via-sky-blue to-orange" />

      <div className="container mx-auto px-6 pt-28 pb-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <BookOpen className="w-4 h-4 text-navy" />
              <span className="text-sm font-medium text-gray-700">Masterbook • FAQ Interattive</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-navy leading-tight text-balance">
              Tutto su <span className="text-orange">All You Can Leads</span>
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Cerca, filtra per capitolo, espandi tutto e salva i tuoi preferiti. Ogni risposta ha un link diretto da
              condividere con il team.
            </p>
          </div>

          <div className="w-full lg:w-auto">
              <div className="p-4 flex items-center gap-3">
                <Search className="w-5 h-5 text-navy" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cerca tra le FAQ (Generali, Performance, Set‑Up, Subscription)"
                  className="w-full lg:w-96 outline-none bg-transparent text-sm placeholder:text-gray-400"
                />
              </div>
          </div>
        </div>

        {/* Tabs / Chapter filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {chapterTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveChapter(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeChapter === t.id
                  ? "bg-orange text-white border-orange"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-navy/5"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {t.id !== "all" && (() => {
                  const chapter = chapters.find((c) => c.id === t.id)
                  if (chapter?.customIcon) {
                    return <img src={chapter.customIcon} alt={chapter.title} className="w-4 h-4" />
                  }
                  const IconComponent = chapter?.icon
                  return IconComponent ? <IconComponent className="w-4 h-4" /> : <span>{chapter?.emoji}</span>
                })()}
                {t.title}
              </span>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button variant="outline" className="border-navy text-navy hover:bg-navy/5" onClick={() => toggleAll(true)}>
            <ListTree className="w-4 h-4 mr-2" /> Espandi tutto
          </Button>
          <Button variant="outline" className="border-navy text-navy hover:bg-navy/5" onClick={() => toggleAll(false)}>
            <Filter className="w-4 h-4 mr-2" /> Comprimi tutto
          </Button>
          <Button
            variant="outline"
            className="border-orange text-orange hover:bg-orange/5"
            onClick={() => {
              setActiveChapter("all")
              setQuery("")
              toggleAll(false)
              containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            Reset
          </Button>
          <div className="ml-auto hidden md:flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-4 h-4" /> {filtered.length} risultati
          </div>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-4 sticky top-24 self-start h-fit">
            <Card className="p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3">Capitoli</div>
              <nav className="space-y-1">
                {chapters.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveChapter(c.id)
                      document.getElementById(`chapter-${c.id}`)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition ${
                      activeChapter === c.id ? "bg-sky-blue/10 text-navy" : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {c.customIcon ? (
                      <img src={c.customIcon} alt={c.title} className="w-5 h-5" />
                    ) : c.icon ? (
                      <c.icon className="w-5 h-5" />
                    ) : (
                      <span className="text-lg">{c.emoji}</span>
                    )}
                    <span className="font-medium">{c.title}</span>
                  </button>
                ))}
              </nav>
            </Card>


            {Object.keys(bookmarks).some((k) => bookmarks[k]) && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookmarkCheck className="w-4 h-4 text-orange" />
                  <div className="text-sm font-semibold text-navy">Salvati</div>
                </div>
                <ul className="space-y-2 text-sm">
                  {allItems
                    .filter((it) => bookmarks[it.id])
                    .slice(0, 7)
                    .map((it) => (
                      <li key={it.id}>
                        <button
                          onClick={() => {
                            setExpanded((p) => ({ ...p, [it.id]: true }))
                            document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                          }}
                          className="text-navy hover:underline"
                        >
                          {it.question}
                        </button>
                      </li>
                    ))}
                </ul>
              </Card>
            )}
          </aside>

          {/* Content */}
          <section
            ref={containerRef}
            className="lg:col-span-9 max-h-[70vh] overflow-y-auto rounded-2xl border border-gray-100 p-1"
          >
            {/* progress bar */}
            <div
              className="sticky top-0 h-1 bg-gradient-to-r from-orange via-sky-blue to-navy"
              style={{ width: `${progress}%` }}
            />

            <div className="p-4 lg:p-6 space-y-10">
              {chapters.map((chapter) => (
                <div key={chapter.id} id={`chapter-${chapter.id}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1">
                      {chapter.customIcon ? (
                        <img src={chapter.customIcon} alt={chapter.title} className="w-6 h-6" />
                      ) : chapter.icon ? (
                        <chapter.icon className="w-6 h-6" />
                      ) : (
                        <span className="text-lg">{chapter.emoji}</span>
                      )}
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                        {chapter.title}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-navy/30 via-sky-blue/30 to-orange/30" />
                  </div>

                  <div className="space-y-3">
                    {grouped[chapter.id]?.map((item) => (
                      <GradientFrame key={item.id}>
                        <article id={item.id} className="p-4 lg:p-5">
                          <header>
                            <button
                              onClick={() => toggleOne(item.id)}
                              className="w-full flex items-start justify-between gap-4 text-left"
                            >
                              <h3 className="text-base lg:text-lg font-semibold text-navy leading-snug">
                                {item.question}
                              </h3>
                              <ChevronDown
                                className={`w-5 h-5 text-gray-400 transition-transform ${
                                  isOpen(item.id) ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </header>

                          <div className={`mt-3 overflow-hidden transition-all ${isOpen(item.id) ? "max-h-[1000px]" : "max-h-0"}`}>
                            <div className="prose prose-sm max-w-none text-gray-700">
                              {item.answer}
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                              <button
                                onClick={() => toggleBookmark(item.id)}
                                className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
                                aria-label="Salva nei preferiti"
                              >
                                {bookmarks[item.id] ? (
                                  <>
                                    <BookmarkCheck className="w-4 h-4 text-orange" />
                                    Salvato
                                  </>
                                ) : (
                                  <>
                                    <Bookmark className="w-4 h-4 text-gray-400" />
                                    Salva
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => copyLink(item.id)}
                                className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
                                aria-label="Copia link diretto"
                              >
                                <LinkIcon className="w-4 h-4" /> Copia link
                              </button>
                            </div>
                          </div>
                        </article>
                      </GradientFrame>
                    ))}

                    {!grouped[chapter.id] && activeChapter !== "all" && (
                      <div className="text-sm text-gray-500 py-8">Nessun risultato per questo capitolo.</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Back to top */}
              <div className="pt-6 flex justify-end">
                <Button
                  variant="outline"
                  className="border-navy text-navy hover:bg-navy/5"
                  onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <ArrowUp className="w-4 h-4 mr-2" /> Torna su
                </Button>
              </div>
            </div>
          </section>
        </div>
      

      {/* JSON‑LD FAQ schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: chapters.flatMap(ch => ch.items).map(it => ({
            '@type': 'Question',
            name: it.question,
            acceptedAnswer: { '@type': 'Answer', text: (() => {
              const toText = (n: any): string => {
                if (n == null) return ''
                if (typeof n === 'string' || typeof n === 'number') return String(n)
                if (Array.isArray(n)) return n.map(toText).join(' ')
                if (typeof n === 'object' && 'props' in n) return toText((n as any).props?.children)
                return ''
              }
              return toText((it as any).answer)
            })() }
          }))
        }) }}
      />
    </div>
    </div>
  )
}
