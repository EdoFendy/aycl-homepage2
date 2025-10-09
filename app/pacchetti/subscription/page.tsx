"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Target,
  Users,
  BarChart3,
  CalendarCheck,
  LineChart,
  Sparkles,
  X,
  Database,
  Headphones,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FAQCarousel } from "@/components/faq-carousel"

export default function SubscriptionPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-28 right-16 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute top-36 -left-16 h-60 w-60 rounded-full bg-sky-blue/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-12 h-64 w-16 -rotate-45 bg-navy/5" />
      <div className="relative z-10">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-40 h-40 bg-sky-blue/10 -rotate-12" />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-orange/10 rounded-lg">
                <span className="text-sm font-bold text-orange">PACCHETTO SUBSCRIPTION</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight text-balance">
                Pacchetto <path className="text-orange">Subscription</path>: un flusso costante di appuntamenti qualificati
              </h1>
              <p className="text-2xl font-semibold text-gray-800">
                Appuntamenti garantiti ogni mese e numeri prevedibili su cui basare le tue scelte.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Con il pacchetto Subscription il tuo successo è direttamente proporzionale al nostro. Ogni mese hai un
                range garantito di appuntamenti qualificati. Se non rispettiamo gli accordi presi siamo i primi a
                perderci. Vogliamo vincere insieme, costantemente.
              </p>
              <Link href="/contattaci">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white">
                  Richiedi Subscription
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-orange/20 rounded-full blur-3xl" />
              <Card className="relative p-8 bg-gradient-to-br from-orange/5 to-white border-orange/30">
                <Image
                  src="/subscription-service-dashboard-with-recurring-appo.jpg"
                  alt="Subscription Package"
                  width={600}
                  height={500}
                  className="rounded-lg"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">
              Pacchetto Subscription: trattative valide per il tuo team
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-white border-orange/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 rounded-full blur-xl" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 bg-orange/10 rounded-lg flex items-center justify-center">
                  <Target className="h-8 w-8 text-orange" />
                </div>
                <h3 className="text-xl font-bold text-navy">Il tuo target</h3>
                <p className="text-gray-600 leading-relaxed">
                  Individuiamo il cluster di mercato che vuoi raggiungere. Così chi gestisce le trattative ha già un
                  profilo chiaro dei potenziali clienti. Insieme fissiamo il range di appuntamenti mensili garantiti.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-white border-orange/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange/5 rounded-full blur-xl" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 bg-orange/10 rounded-lg flex items-center justify-center">
                  <Users className="h-8 w-8 text-orange" />
                </div>
                <h3 className="text-xl font-bold text-navy">La tua strategia</h3>
                <p className="text-gray-600 leading-relaxed">
                  Con il project manager di riferimento definiamo un piano d'azione personalizzato. Scegliamo canali e
                  messaggi, creiamo liste di contatti dedicate dal nostro database proprietario.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-white border-orange/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-orange/5 rounded-full blur-xl" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 bg-orange/10 rounded-lg flex items-center justify-center">
                  <CalendarCheck className="h-8 w-8 text-orange" />
                </div>
                <h3 className="text-xl font-bold text-navy">La collaborazione</h3>
                <p className="text-gray-600 leading-relaxed">
                  Lanciamo e gestiamo le campagne per te, analizziamo i dati e ottimizziamo di continuo. Report e call
                  regolari ci tengono allineati sull'andamento.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange/5 via-transparent to-navy/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-6 shadow-sm">
            <Sparkles className="h-4 w-4 text-orange" />
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Perché Subscription</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
            La scelta che fa la differenza
          </h2>
          <p className="text-lg text-gray-600">
            Scopri come il pacchetto Subscription trasforma il tuo approccio commerciale
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* POSITIVE CARD - Why it's right for you */}
          <Card className="group relative bg-white border-2 border-orange/20 rounded-3xl overflow-hidden hover:border-orange/40 transition-all duration-500 hover:shadow-2xl hover:shadow-orange/10">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange/10 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border-8 border-orange/5 rounded-full"></div>
            
            {/* Icon badge */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-6 w-6 text-orange" />
            </div>

            <div className="relative p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-block px-3 py-1 bg-orange/10 rounded-full mb-4">
                  <span className="text-xs font-bold text-orange uppercase tracking-wider">✓ Vantaggi</span>
                </div>
                <h3 className="text-2xl font-bold text-navy leading-tight">
                  Il pacchetto Subscription è la scelta giusta per te se…
                </h3>
              </div>

              {/* Benefits list */}
              <ul className="space-y-5">
                {[
                  { 
                    text: "Vuoi un team che lavori con continuità su trattative reali.",
                    highlight: "team con continuità"
                  },
                  { 
                    text: "Cerchi condizioni di collaborazione costruite su misura per la tua azienda.",
                    highlight: "su misura"
                  },
                  { 
                    text: "Preferisci un flusso costante con risultati chiari e verificabili.",
                    highlight: "risultati verificabili"
                  },
                  { 
                    text: "Hai bisogno di pianificare sulla base di numeri prevedibili.",
                    highlight: "numeri prevedibili"
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 group/item">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center group-hover/item:bg-orange/20 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-orange" />
                      </div>
                    </div>
                    <span className="text-gray-700 leading-relaxed font-medium">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom accent */}
              <div className="mt-10 pt-6 border-t border-orange/10">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange rounded-full"></span>
                  Risultati tangibili, collaborazione trasparente
                </p>
              </div>
            </div>
          </Card>

          {/* NEGATIVE CARD - What you won't have to deal with */}
          <Card className="group relative bg-white border-2 border-gray-200 rounded-3xl overflow-hidden hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50">
            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gray-50 rotate-45 rounded-2xl"></div>
            
            {/* Icon badge */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <X className="h-6 w-6 text-gray-600" />
            </div>

            <div className="relative p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full mb-4">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">✗ Problemi risolti</span>
                </div>
                <h3 className="text-2xl font-bold text-navy leading-tight">
                  Grazie al pacchetto Subscription non dovrai più…
                </h3>
              </div>

              {/* Problems list */}
              <ul className="space-y-5">
                {[
                  "Sprecare il potenziale del tuo team con lead sbagliati.",
                  "Affidarti a strumenti di marketing troppo costosi e poco efficaci.",
                  "Lavorare con liste improvvisate di contatti a freddo e fuori target.",
                  "Basare le tue decisioni sul sentimento e opinioni infondate.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 group/item">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover/item:bg-gray-200 transition-colors">
                        <X className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom accent */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  Dimentica sprechi, inefficienze e improvvisazione
                </p>
              </div>
            </div>
          </Card>

        </div>

        {/* CTA section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-orange/20 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-sky-blue/20 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-navy/20 border-2 border-white"></div>
            </div>
            <span className="text-sm font-medium text-gray-600">
              Oltre 50 aziende hanno già fatto questa scelta
            </span>
          </div>
        </div>
      </div>
    </section>

{/* All You Can Leads System */}
<section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Accedi senza rischi ai pilastri del nostro sistema</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All You Can Leads è un'azienda sales oriented, tech e data based. L'unione di tecnologie avanzate, banche
              dati in costante aggiornamento e team di esperti dedicati.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-white border-sky-blue/30 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-sky-blue/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-sky-blue" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Sendura</h3>
              <p className="text-gray-600 leading-relaxed">
                La struttura tecnologica è racchiusa in una software app di nostra proprietà, Sendura. Ci permette di
                gestire e monitorare le campagne su tutti i canali outreach che utilizziamo.
              </p>
            </Card>

            <Card className="p-8 bg-white border-orange/30 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange/10 rounded-lg flex items-center justify-center mb-6">
                <Database className="h-8 w-8 text-orange" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Database</h3>
              <p className="text-gray-600 leading-relaxed">
                Il nostro archivio contiene contatti di membri di aziende in tutto il mondo e copre tutti i settori in
                ambito B2B. I nostri strumenti di intelligenza artificiale attuano un costante processo di verifica.
              </p>
            </Card>

            <Card className="p-8 bg-white border-navy/30 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-navy/10 rounded-lg flex items-center justify-center mb-6">
                <Headphones className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Supporto</h3>
              <p className="text-gray-600 leading-relaxed">
                Tutti i nostri clienti vengono seguiti dall'inizio alla fine dal proprio project manager di riferimento.
                Il vero valore nasce dall'unione tra automazione e contributo umano.
              </p>
            </Card>
          </div>
        </div>
      </section>
      <div className="h-1 w-full bg-gradient-to-r from-navy via-sky-blue to-orange" aria-hidden="true" />

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-navy mb-4">Un abbonamento mensile, 100% senza rischi</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Il pacchetto Subscription funziona come un vero e proprio abbonamento. Ogni mese hai un range garantito di
                appuntamenti qualificati coperto da garanzia. Se non raggiungiamo i risultati concordati, perdiamo per
                primi.
              </p>
            </div>

            <div className="relative flex flex-col lg:flex-row gap-12 items-stretch">
              {/* Timeline verticale */}
              <div className="hidden lg:flex flex-col items-center justify-center w-24 relative">
                <div className="h-full w-1 bg-gradient-to-b from-orange via-sky-blue to-navy rounded-full" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-orange rounded-full border-4 border-white shadow-lg" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-6 h-6 bg-sky-blue rounded-full border-4 border-white shadow-lg" />
                <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-6 h-6 bg-navy rounded-full border-4 border-white shadow-lg" />
              </div>

              {/* Step cards */}
              <div className="flex-1 flex flex-col gap-8">
                {/* Fase di attivazione */}
                <Card className="p-8 bg-white border-orange/20 shadow-sm hover:shadow-xl transition-shadow flex flex-row items-center gap-6">
                  <div className="w-14 h-14 bg-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LineChart className="h-7 w-7 text-orange" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy mb-2">Fase di attivazione</h3>
                    <p className="text-sm font-semibold text-gray-500 mb-4">Un pacchetto su misura</p>
                    <ul className="space-y-3 text-gray-700">
                      <li>Le rate vengono stabilite in base al range di appuntamenti mensili.</li>
                      <li>La prima rata viene versata all'inizio della collaborazione.</li>
                    </ul>
                  </div>
                </Card>

                {/* Fase operativa */}
                <Card className="p-8 bg-white border-orange/20 shadow-sm hover:shadow-xl transition-shadow flex flex-row items-center gap-6">
                  <div className="w-14 h-14 bg-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-7 w-7 text-orange" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy mb-2">Fase operativa</h3>
                    <p className="text-sm font-semibold text-gray-500 mb-4">Ricevi uno sconto sugli appuntamenti</p>
                    <ul className="space-y-3 text-gray-700">
                      <li>La seconda rata è prevista 28 giorni dopo il primo appuntamento qualificato svolto.</li>
                      <li>Il pagamento prosegue con cadenza regolare ogni 28 giorni.</li>
                      <li>Risparmi il 25% rispetto alla quotazione standard per appuntamento.</li>
                    </ul>
                  </div>
                </Card>

                {/* Garanzie incluse */}
                <Card className="p-8 bg-white border-orange/20 shadow-sm hover:shadow-xl transition-shadow flex flex-row items-center gap-6">
                  <div className="w-14 h-14 bg-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-7 w-7 text-orange" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy mb-2">Garanzie incluse</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li>Rimborso completo se entro 60–90 giorni non ricevi appuntamenti qualificati.</li>
                      <li>Possibilità di recedere con preavviso di 28 giorni.</li>
                      <li>Range di appuntamenti mensili coperto da garanzia.</li>
                    </ul>
                  </div>
                </Card>
              </div>

              {/* Note importanti */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <Card className="p-10 bg-gradient-to-br from-sky-blue/5 to-white border-sky-blue/30 relative overflow-hidden flex flex-col items-center w-full max-w-md mx-auto">
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 border border-white/30 rounded-full text-xs font-bold text-navy">
                    ℹ
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-6 text-center">Note importanti</h3>
                  <ul className="space-y-4 text-gray-700 text-center">
                    <li className="flex items-start gap-3 justify-center">
                      <CheckCircle2 className="h-5 w-5 text-sky-blue mt-1 flex-shrink-0" />
                      <span>I primi 60–90 giorni sono il periodo di attivazione: serve a impostare e calibrare il sistema.</span>
                    </li>
                    <li className="flex items-start gap-3 justify-center">
                      <CheckCircle2 className="h-5 w-5 text-sky-blue mt-1 flex-shrink-0" />
                      <span>Ti accompagniamo con report regolari e dashboard per monitorare ogni attività.</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-navy">FAQ</h2>
          </div>

          <FAQCarousel
            className="mt-12"
            items={[
              {
                question: "Quali sono gli step operativi del Pacchetto Subscription?",
                answer:
                  "1. Call iniziale per verificare collaborazione e raccogliere informazioni.\n2. Definizione dell'ICP basato su parametri oggettivi.\n3. Studio di fattibilità per calcolare la quota appuntamento e stabilire il range mensile.\n4. Seconda call per condividere l'analisi e personalizzare l'offerta.\n5. Costruzione del piano operativo con il project manager dedicato.\n6. Attivazione delle campagne, fase di testing e messa a regime del sistema.",
              },
              {
                question: "Come viene stabilita la quota per appuntamento?",
                answer:
                  "La quota si basa su grandezza e complessità del cluster target, difficoltà e frequenza di contatto e localizzazione geografica del mercato. Se vengono definiti più ICP, ciascuno avrà una quotazione distinta.",
              },
              {
                question: "Quanti appuntamenti mensili sono previsti e come viene stabilito il range?",
                answer:
                  "Il range dipende dalla capacità della tua azienda di gestire le trattative. Tu indichi quanti appuntamenti vuoi avere ogni mese, noi verifichiamo che sia realistico rispetto al target e concordiamo la quota minima garantita.",
              },
              {
                question: "Posso recedere dal contratto in qualsiasi momento?",
                answer:
                  "Sì, puoi recedere con un preavviso di 28 giorni. Durante questo periodo portiamo a termine le attività in corso e restano dovuti gli appuntamenti già organizzati e confermati.",
              },
              {
                question: "Come si definisce il profilo del cliente ideale (ICP)?",
                answer:
                  "L'ICP viene definito su tre parametri: settore, fascia di fatturato e area geografica. Li determiniamo insieme per costruire il perimetro dei tuoi interlocutori ideali.",
              },
              {
                question: "Come posso monitorare i risultati e le attività?",
                answer:
                  "Hai una dashboard personale su Sendura aggiornata in tempo reale e report completi ogni due settimane, oltre a confronti regolari con il project manager dedicato.",
              },
              {
                question: "Mi mettete in contatto con decisori reali?",
                answer:
                  "Sì. Ti portiamo davanti a figure con potere decisionale, variando il livello dell'interlocutore in base alle tue necessità e alla struttura dell'azienda target.",
              },
              {
                question: "Potete lavorare con PMI e grandi aziende?",
                answer:
                  "Il sistema è flessibile e lavora sia con PMI sia con multinazionali. Cambiano il livello di scrematura e i referenti, ma la logica resta la stessa: parlare con chi decide.",
              },
              {
                question: "Da dove provengono i vostri dati e come li aggiornate?",
                answer:
                  "I dati arrivano da approvvigionamento diretto, integrazione da provider certificati e arricchimento proprietario con AI. Manteniamo ogni contatto aggiornato e segmentato.",
              },
              {
                question: "Cosa succede se un appuntamento non rispetta l'ICP?",
                answer:
                  "Se un appuntamento non rispetta i criteri concordati, non viene considerato valido. Hai 72 ore per segnalarlo e, se non è in linea, viene escluso senza costi.",
              },
              {
                question: "Utilizzate l'intelligenza artificiale nei vostri sistemi?",
                answer:
                  "Sì, l'AI è integrata nella segmentazione dei contatti, personalizzazione dei messaggi e gestione dei follow-up. L'obiettivo è aumentare efficienza e precisione mantenendo il controllo umano.",
              },
              {
                question: "Avrò un referente dedicato durante la collaborazione?",
                answer:
                  "Ogni cliente ha un project manager dedicato che segue tutte le fasi e resta sempre disponibile come punto di contatto diretto.",
              },
              {
                question: "Quanto tempo serve per vedere i primi risultati?",
                answer:
                  "I primi 30–90 giorni sono un periodo di testing fondamentale per raccogliere dati e ottimizzare. In questa fase possono già arrivare appuntamenti, ma l'obiettivo è mettere il sistema a regime.",
              },
              {
                question: "Quando devo saldare gli appuntamenti?",
                answer:
                  "Il saldo avviene una volta al mese, in base al range di appuntamenti qualificati previsto. Ricevi un resoconto degli incontri svolti e rendicontiamo solo quelli confermati.",
              },
            ]}
          />
        </div>
      </section>
      </div>
    </div>
  )
}
