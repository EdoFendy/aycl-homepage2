"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Database,
  Headphones,
  Sparkles,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FAQCarousel } from "@/components/faq-carousel"

export default function PerformancePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-28 right-20 h-80 w-80 rounded-full bg-sky-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute top-32 -left-20 h-60 w-60 rounded-full bg-orange/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-navy/5 blur-3xl" />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange/10 rotate-12" />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-sky-blue/10 rounded-lg">
                <span className="text-sm font-bold text-sky-blue">PACCHETTO PERFORMANCE</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight text-balance">
                Metti alla prova il sistema
              </h1>
              <p className="text-2xl font-semibold text-gray-800">Accedi ora al sistema senza limiti e senza rischi.</p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Trasformiamo la nostra struttura tecnologica e banche dati proprietarie in appuntamenti qualificati con
                figure decisionali nel tuo target di riferimento.
              </p>
              <Link href="/contattaci">
                <Button size="lg" className="bg-sky-blue hover:bg-sky-blue/90 text-white">
                  Richiedi Informazioni
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-sky-blue/20 rounded-full blur-3xl" />
              <Card className="relative p-8 bg-gradient-to-br from-sky-blue/5 to-white border-sky-blue/30">
                <Image
                  src="/business-professional-reviewing-performance-metric.jpg"
                  alt="Performance Package"
                  width={600}
                  height={500}
                  className="rounded-lg"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>
        <div className="h-1 w-full bg-gradient-to-r from-navy via-sky-blue to-orange" aria-hidden="true" />

        {/* Come Funziona */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">
              Pacchetto Performance: siediti al tavolo con chi decide davvero
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-white border-sky-blue/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-sky-blue/10 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-sky-blue" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">1. Il tuo profilo ideale</h3>
                <p className="text-gray-600 leading-relaxed">
                  Partiamo individuando l'ICP, ovvero il profilo del tuo cliente ideale. Sulla base di parametri
                  misurabili, calcoliamo la quotazione degli appuntamenti nel tuo target. Ti facciamo affiancare da un
                  project manager e inizia il processo di onboarding.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-white border-sky-blue/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-sky-blue/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-sky-blue" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">2. Strategia su misura</h3>
                <p className="text-gray-600 leading-relaxed">
                  Definiamo un piano d'azione strategico e i canali da includere. Selezioniamo e segmentiamo i contatti
                  idonei direttamente dal nostro database proprietario. Avviamo e gestiamo interamente le tue campagne.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-white border-sky-blue/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-sky-blue/10 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-sky-blue" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">3. Monitoraggio e ottimizzazione</h3>
                <p className="text-gray-600 leading-relaxed">
                  Creiamo la tua dashboard personale con risultati in tempo reale, sulla nostra software app Sendura.
                  Ogni due settimane ricevi un report completo del lavoro svolto e hai a disposizione una chiamata con
                  il tuo project manager.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

        {/* È per te se */}
        <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-sky-blue/5 via-transparent to-orange/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-sky-blue" />
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Perché Performance</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">La scelta per testare il sistema in sicurezza</h2>
            <p className="text-lg text-gray-600">
              Scopri come il pacchetto Performance ti permette di verificare il metodo AYCL senza assumerti rischi inutili
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="group relative bg-white border-2 border-sky-blue/20 rounded-3xl overflow-hidden hover:border-sky-blue/40 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-blue/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-blue/10 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border-8 border-sky-blue/5 rounded-full"></div>

              <div className="absolute top-6 right-6 w-12 h-12 bg-sky-blue/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-sky-blue" />
              </div>

              <div className="relative p-10">
                <div className="mb-8">
                  <div className="inline-block px-3 py-1 bg-sky-blue/10 rounded-full mb-4">
                    <span className="text-xs font-bold text-sky-blue uppercase tracking-wider">✓ Vantaggi</span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy leading-tight">Il pacchetto Performance è la scelta giusta per te se…</h3>
                </div>

                <ul className="space-y-5">
                  {[
                    "Hai bisogno di generare appuntamenti qualificati per la tua azienda.",
                    "Vuoi vedere da vicino come funziona All You Can Leads.",
                    "Devi capire come sfruttare questa occasione al meglio.",
                    "Sei pronto a gestire trattative reali con i potenziali clienti.",
                  ].map((item, index) => (
                    <li key={item} className="flex items-start gap-4 group/item">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-lg bg-sky-blue/10 flex items-center justify-center group-hover/item:bg-sky-blue/20 transition-colors">
                          <CheckCircle2 className="h-5 w-5 text-sky-blue" />
                        </div>
                      </div>
                      <span className="text-gray-700 leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-sky-blue/10">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-blue rounded-full"></span>
                    Accedi al metodo AYCL in modo trasparente e misurabile
                  </p>
                </div>
              </div>
            </Card>

            <Card className="group relative bg-white border-2 border-gray-200 rounded-3xl overflow-hidden hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gray-50 rotate-45 rounded-2xl"></div>

              <div className="absolute top-6 right-6 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <X className="h-6 w-6 text-gray-600" />
              </div>

              <div className="relative p-10">
                <div className="mb-8">
                  <div className="inline-block px-3 py-1 bg-gray-100 rounded-full mb-4">
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">✗ Problemi risolti</span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy leading-tight">Grazie al pacchetto Performance non dovrai più…</h3>
                </div>

                <ul className="space-y-5">
                  {[
                    "Bruciare soldi in aste pubblicitarie dai ritorni incerti.",
                    "Sprecare tempo con lead freddi, fuori target o senza potere decisionale.",
                    "Inventare strategie per generare contatti in organico.",
                    "Affidare il futuro della tua attività a numeri che non tornano.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4 group/item">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover/item:bg-gray-200 transition-colors">
                          <X className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    Dimentica sprechi, inefficienze e improvvisazione
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-sky-blue/20 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-orange/20 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-navy/20 border-2 border-white"></div>
              </div>
              <span className="text-sm font-medium text-gray-600">Decine di aziende hanno già iniziato da qui</span>
            </div>
          </div>
        </div>
      </section>
        <div className="h-1 w-full bg-gradient-to-r from-navy via-sky-blue to-orange" aria-hidden="true" />

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

        {/* Investimento */}
        <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-6">
              <h2 className="text-4xl font-bold text-navy">Meno di 8€ al giorno per portare al tavolo chi decide</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                È l'investimento più ridicolo che farai quest'anno rispetto al guadagno che puoi generare. Con meno di
                un pranzo fuori al mese attivi un flusso di appuntamenti qualificati e paghi solo quando l'incontro si
                svolge davvero.
              </p>
            </div>

            <Card className="relative overflow-hidden p-10 bg-white border border-sky-blue/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-blue/5 via-white to-orange/5" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  <span>Accendi il sistema</span>
                  <span>Spingi sulle vendite</span>
                </div>

                <div className="relative mt-12 pt-20 pb-6">
                  <div className="absolute inset-x-0 top-8 h-2 rounded-full bg-gradient-to-r from-navy via-sky-blue to-orange" />
                  {[
                    {
                      label: "Giorno 1",
                      amount: "8€",
                      caption: "Meno di due cappuccini per avere meeting reali.",
                      position: 0,
                    },
                    {
                      label: "1° mese",
                      amount: "240€",
                      caption: "Quanto spenderesti in un test ADV di pochi giorni.",
                      position: 33,
                    },
                    {
                      label: "6 mesi",
                      amount: "1.440€",
                      caption: "In genere basta una sola chiusura per ripagarlo.",
                      position: 66,
                    },
                    {
                      label: "12 mesi",
                      amount: "3.000€",
                      caption: "Il costo annuo per avere il calendario sempre pieno.",
                      position: 100,
                    },
                  ].map((item, index, array) => (
                    <div
                      key={item.label}
                      className="absolute flex flex-col items-center gap-3 text-center"
                      style={{
                        left: `${item.position}%`,
                        top: 0,
                        transform:
                          index === 0 ? "translateX(0)" : index === array.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
                      }}
                    >
                      <div className="w-px h-8 bg-sky-blue/40" />
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-bold text-navy shadow-lg ring-2 ring-sky-blue/40">
                        {item.amount}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                        {item.label}
                      </span>
                      <p className="text-sm text-gray-600 max-w-[160px] leading-snug">{item.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="p-8 bg-white border-sky-blue/30 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-navy mb-4">Paghi solo gli appuntamenti svolti</h3>
                <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-sky-blue flex-shrink-0 mt-0.5" />
                    Ogni 14 giorni saldi solo gli appuntamenti qualificati che hai effettivamente sostenuto.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-sky-blue flex-shrink-0 mt-0.5" />
                    Nessun canone nascosto, nessun costo per slot vuoti o lead mancati.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-sky-blue flex-shrink-0 mt-0.5" />
                    Aumenti o riduci il volume in base a quanto puoi gestire: paghi sempre e solo per il valore reale.
                  </li>
                </ul>
              </Card>

              <Card className="p-8 bg-white border-orange/30 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-navy mb-4">Una spesa che fa sorridere il CFO</h3>
                <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                    Meno di 60€ a settimana: meno di una cena di team o di un abbonamento software entry-level.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                    Ogni meeting è un potenziale deal B2B: basta una chiusura media per moltiplicare l'investimento.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                    Puoi rateizzare l'attivazione in 3, 6 o 12 mesi: nessun impatto di cassa significativo.
                  </li>
                </ul>
              </Card>

              <Card className="p-8 bg-white border-navy/30 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-navy mb-4">Cosa ottieni in cambio</h3>
                <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
                    Project manager dedicato e tecnologia proprietaria senza costi extra.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
                    Flusso continuo di meeting con decision maker nel tuo ICP.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
                    Statistiche, dashboard e report per misurare ogni singolo euro investito.
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mt-12">
              <div className="relative overflow-hidden rounded-3xl border border-sky-blue/30 bg-gradient-to-r from-sky-blue/10 via-white to-orange/10 px-8 py-10 text-center shadow-lg">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                  Il conto della serva
                </span>
                <p className="mt-4 text-3xl font-bold text-navy">
                  Un singolo deal tipico copre un anno intero di Performance e lascia margini per i successivi.
                </p>
                <p className="mt-4 text-base text-gray-600 max-w-3xl mx-auto">
                  Stai pagando il costo di un caffè al giorno per aprire trattative che valgono decine di migliaia di
                  euro. Se un appuntamento salta, non lo paghi. Se chiudi, hai ROI esagerati. Non è magia: è un modello
                  pay-per-meeting che mette in ridicolo qualsiasi altra voce di spesa commerciale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* FAQ */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Domande Frequenti</h2>
            <p className="text-xl text-gray-600">Tutto quello che devi sapere sul Pacchetto Performance</p>
          </div>

          <FAQCarousel
            className="mt-12"
            items={[
              {
                question: "Quali sono gli step operativi del Pacchetto Performance?",
                answer:
                  "1. Call iniziale per verificare la possibilità di collaborazione e raccogliere le informazioni necessarie.\n2. Definizione dell'ICP basato su parametri oggettivi.\n3. Studio di fattibilità per calcolare la quotazione per appuntamento.\n4. Seconda call di confronto per condividere l'analisi e personalizzare l'offerta.\n5. Costruzione del piano operativo insieme al project manager dedicato.\n6. Attivazione delle campagne e fase di testing per l'ottimizzazione.",
              },
              {
                question: "Come viene stabilita la quota per appuntamento?",
                answer:
                  "La quota per appuntamento viene calcolata su parametri oggettivi: grandezza e complessità del cluster target, difficoltà e frequenza di contatto, localizzazione geografica del mercato. Se vengono definiti più ICP, a ciascuno corrisponderà una quotazione distinta.",
              },
              {
                question: "Perché il Pacchetto Performance è valido solo per il primo anno?",
                answer:
                  "Questo pacchetto è concepito come starter pack, pensato per provare il sistema in modo semplice e diretto. È l'opzione ideale per chi vuole iniziare subito a generare appuntamenti qualificati prima di passare a una formula più strutturata e scalabile.",
              },
              {
                question: "Posso recedere dal contratto in qualsiasi momento?",
                answer:
                  "Sì. È sempre possibile recedere dalla collaborazione con un preavviso di 28 giorni. In questo periodo portiamo a termine le attività già avviate, così la chiusura avviene in modo ordinato e senza interruzioni improvvise.",
              },
              {
                question: "Come posso monitorare i risultati e le attività svolte?",
                answer:
                  "Hai una dashboard personale su Sendura, aggiornata in tempo reale con tutti i dati di campagna, e report completi ogni due settimane con confronti regolari con il tuo project manager dedicato.",
              },
              {
                question: "Quanto tempo serve per vedere i primi risultati?",
                answer:
                  "I primi 30–90 giorni sono un periodo di testing: servono a raggiungere una massa di dati statisticamente rilevanti su cui basare le ottimizzazioni. L'obiettivo è portare il sistema a regime per garantire un flusso costante e prevedibile nel tempo.",
              },
            ]}
          />
        </div>
      </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-navy via-navy to-sky-blue/20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">Pronto a iniziare con Performance?</h2>
            <p className="text-xl text-gray-200">
              Prenota una call gratuita e scopriamo insieme se il Pacchetto Performance è la soluzione giusta per te
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contattaci">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-lg px-8">
                  Prenota una Call Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pacchetti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 bg-transparent"
                >
                  Vedi Altri Pacchetti
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </section>
      </div>
    </div>
  )
}
