"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, Sparkles, Star, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { KeyboardEvent, MouseEvent } from "react"
import { FAQCarousel } from "@/components/faq-carousel"

export default function HomePage() {
  const router = useRouter()

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, path: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      navigateTo(path)
    }
  }

  const handleContactClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    navigateTo("/contattaci")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Geometric decorations */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-sky-blue/10 rotate-12 rounded-lg" />
        <div className="absolute top-40 left-10 w-24 h-24 bg-orange/10 rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-16 h-48 bg-navy/5 -rotate-45" />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-gray-50 rounded-full">
                <span className="text-sm font-medium text-gray-700">
                  <span className="font-bold">International</span> Leads Generator
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight text-balance">
                Appuntamenti qualificati con <span className="text-orange">decision maker B2B</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Trasformiamo tecnologia e dati in meeting costanti e garantiti con il tuo target
              </p>

              <p className="text-base text-gray-500 leading-relaxed">
                Basta budget bruciati in ADV dove vince solo chi ha più soldi. Basta perdere tempo con lead freddi e
                fuori target. Il nostro sistema tech e data based riempie il tuo calendario, tu devi solo gestire le
                trattative.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contattaci">
                  <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-lg px-8">
                    Prenota una Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pacchetti">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-navy text-navy hover:bg-navy/5 text-lg px-8 bg-transparent"
                  >
                    Scopri di Più
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative hidden md:flex items-center justify-center">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-sky-blue/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange/20 rounded-full blur-3xl" />
              <Image
                src="/logo.png"
                alt="All You Can Leads"
                width={500}
                height={500}
                className="relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-gray-600 mb-8">
            Oltre <span className="font-bold text-navy">200+ aziende B2B</span> hanno rivoluzionato il loro modo di
            generare opportunità
          </p>
        </div>
      </section>

      {/* Story Section - Problem */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy via-sky-blue to-orange" />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-6 -right-6 w-48 h-48 border-4 border-sky-blue/30 rounded-lg rotate-6" />
                <Image
                  src="/tavolo.png"
                  alt="Business Challenge"
                  width={600}
                  height={500}
                  className="rounded-lg"
                />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-navy text-balance">
                Anche noi non riuscivamo a sederci ai tavoli che contano
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  All You Can Leads è stata creata da un gruppo di imprenditori per le proprie attività. Avevamo bisogno
                  di entrare in contatto con grandi aziende.
                </p>
                <p>
                  Avevamo attivato diverse fonti di traffico a pagamento, ma spendevamo tanto senza raggiungere le
                  persone che volevamo.
                </p>
              </div>

              <div className="pt-4">
                <div className="inline-flex items-center gap-2 text-orange font-semibold">
                  <div className="w-12 h-1 bg-orange" />
                  <span>La nostra storia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-0 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Dati dal mercato
            </span>
            <h2 className="text-4xl font-semibold text-navy leading-snug text-balance">
              I numeri parlano chiaro
            </h2>
            <p className="text-base text-gray-600">
              Trend reali che confermano quanto sia difficile mantenere canali di acquisizione profittevoli
              senza un approccio mirato sui decision maker giusti.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3 items-stretch">
          <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
          <Card className="metric-card-inner h-full p-8 text-center flex flex-col border-0 shadow-none">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Costo per click</p>
                <div className="mt-6 text-5xl font-semibold text-navy">+10.4%</div>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  Aumento del CPC dal 2023 al 2024 nelle campagne Google Ads e Microsoft Ads.
                </p>
                <p className="mt-auto pt-6 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Worldstream.com</p>
              </Card>
            </div>

            <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
              <Card className="metric-card-inner h-full p-8 text-center flex flex-col border-0 shadow-none">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Budget marketing</p>
                <div className="mt-6 text-5xl font-semibold text-navy">44%</div>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  Delle organizzazioni B2B ha tagliato investimenti marketing nell&apos;ultimo anno.
                </p>
                <p className="mt-auto pt-6 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Mycodelesswebsite.com</p>
              </Card>
            </div>

            <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
              <Card className="metric-card-inner h-full p-8 text-center flex flex-col border-0 shadow-none">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Lead qualificati</p>
                <div className="mt-6 text-5xl font-semibold text-navy">85%</div>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  Dei marketer B2B considera ottenere lead qualificati la sfida principale.
                </p>
                <p className="mt-auto pt-6 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">Magileads.com</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-sky-blue/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-sky-blue">La Soluzione</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6 text-balance">
              Ora giochiamo alle nostre regole
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sistema internazionale di generazione appuntamenti B2B qualificati
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-navy">Tecnologia e Dati di proprietà</h3>
              <p className="text-gray-600 leading-relaxed">
                Utilizziamo strutture tecnologiche di nostra proprietà, tra cui{" "}
                <span className="font-semibold text-navy">Sendura</span> (la nostra software app). Integrate con banche
                dati verificate e arricchite costantemente, anche grazie a strumenti di intelligenza artificiale.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Questo ci permette di raggiungere cluster di mercato specifici, con messaggi mirati, e portarti
                direttamente al tavolo con figure che contano davvero.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-orange flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Database Proprietari</div>
                    <div className="text-sm text-gray-600">Verificati e aggiornati</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-orange flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">AI Integrata</div>
                    <div className="text-sm text-gray-600">Segmentazione avanzata</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-orange flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Outreach Multicanale</div>
                    <div className="text-sm text-gray-600">Massima copertura</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-orange flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-navy">Controllo Totale</div>
                    <div className="text-sm text-gray-600">Nessun intermediario</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-orange/10 rounded-full blur-3xl" />
                <Image
                  src="/scaccomatto.png"
                  alt="Technology Platform"
                  width={550}
                  height={450}
                  className="rounded-lg"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="servizi" className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-navy/10 rotate-12" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-sky-blue/10 rounded-full" />

        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6 text-balance">
              Cosa significa All You Can Leads per un imprenditore B2B
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
              <div className="h-full min-h-[300px] rounded-[1rem] bg-white/95 backdrop-blur-sm p-8 flex flex-col">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/icona1.png"
                    alt="Icona 1"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">Meeting con decision maker interessati</h3>
                <p className="text-gray-600 leading-relaxed">
                  Non sprechi più tempo con segretarie e lead fuori target. Ti portiamo direttamente al tavolo con
                  membri dei board aziendali nel tuo target, pronti a scoprire le tue soluzioni.
                </p>
                <div className="mt-auto flex justify-center items-center"></div>
              </div>
            </div>

            <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
              <div className="h-full min-h-[300px] rounded-[1rem] bg-white/95 backdrop-blur-sm p-8 flex flex-col">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/icona2.png"
                    alt="Icona 2"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">Fai lavorare il tuo team come si deve</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sfrutta al massimo il tempo del tuo reparto commerciale grazie ad agende piene di appuntamenti già
                  fissati. Devono solo gestire trattative valide.
                </p>
                <div className="mt-auto flex justify-center items-center"></div>
              </div>
            </div>

            <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
              <div className="h-full min-h-[300px] rounded-[1rem] bg-white/95 backdrop-blur-sm p-8 flex flex-col">
                <div className="flex justify-center mb-6">
                  <Image
                    src="/icona3.png"
                    alt="Icona 3"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">Controllo e supporto costanti</h3>
                <p className="text-gray-600 leading-relaxed">
                  Una dashboard personale su Sendura permette di monitorare i risultati in tempo reale. Hai un project
                  manager dedicato sempre al tuo fianco.
                </p>
                <div className="mt-auto flex justify-center items-center"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="come-funziona" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Il protocollo AYCL
            </span>
            <h2 className="text-4xl font-semibold text-navy leading-snug text-balance">
              In cosa consiste il sistema All You Can Leads
            </h2>
            <p className="text-sm text-gray-600">
              Tre passaggi chiari e ripetibili per portare il tuo team davanti alle persone che decidono.
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:justify-between">
            {[
              {
                step: "01",
                label: "Fondamenta",
                title: "Definizione dell'ICP",
                copy:
                  "Allineiamo il profilo del cliente ideale su criteri condivisi: settore, dimensioni, ruolo, trigger d'acquisto.",
                image: {
                  src: "/ICT.png",
                  alt: "Definizione ICP",
                },
              },
              {
                step: "02",
                label: "Attivazione",
                title: "Piano strategico",
                copy:
                  "Sequenze multicanale con copy personalizzati, costruite su dati proprietari e monitorate con Sendura.",
                image: {
                  src: "/lucchettoorizzontale.png",
                  alt: "Piano strategico",
                },
              },
              {
                step: "03",
                label: "Regime",
                title: "Controllo qualità",
                copy:
                  "Appuntamenti confermati, dashboard condivisa e ottimizzazione continua sul feedback del tuo team.",
                image: {
                  src: "/lentegraf.png",
                  alt: "Controllo qualità",
                },
              },
            ].map((item) => (
              <Card
                key={item.step}
                className="group flex flex-1 flex-col gap-5 rounded-2xl border border-gray-200 bg-white/80 px-6 py-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  <span>{item.label}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500">
                    {item.step}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-navy">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.copy}</p>
                </div>
                <div className="overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={360}
                    height={200}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pacchetti" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Pacchetti su misura
          </span>
          <h2 className="text-4xl lg:text-5xl font-semibold text-navy leading-snug text-balance">
            Scopri il pacchetto giusto per la tua azienda
          </h2>
          <p className="text-base text-gray-600">
            Tre percorsi modulari pensati per accompagnarti dall'idea al salto di scala. Ogni pacchetto include
            metriche trasparenti, supporto operativo e focus sui decision maker che contano.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-9 max-w-5xl mx-auto">
          {/* Set-Up Fee - PREMIUM HIGHLIGHT */}
          <Card
            className="relative flex cursor-pointer flex-col gap-8 rounded-3xl border-2 border-orange bg-gradient-to-br from-orange/5 via-white to-orange/10 p-12 shadow-2xl transition-all hover:scale-[1.02] hover:shadow-orange/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange lg:col-span-9"
            onClick={() => navigateTo("/pacchetti/set-up-fee")}
            onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/set-up-fee")}
            role="link"
            tabIndex={0}
          >
            {/* Decorative shine effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange/20 to-transparent rounded-full blur-3xl"></div>
            
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-orange px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                    <Star className="w-4 h-4 mr-2 fill-white" />
                    Partnership Elite
                  </span>
                  <span className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange border border-orange/30">
                    Revenue Share
                  </span>
                </div>
                <h3 className="text-4xl font-bold text-navy">Set-Up Fee + Revenue Share</h3>
                <p className="text-lg text-gray-700 max-w-2xl">
                  Per aziende ambiziose che puntano a scalare con obiettivi condivisi sul fatturato. 
                  Vinciamo insieme, cresciamo insieme.
                </p>
              </div>
              <div className="hidden lg:block">
                <Sparkles className="w-16 h-16 text-orange" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-orange uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Strategia & Execution
                </h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">Strategia su misura per mercati complessi e buyer multi-stakeholder</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">Team cross-funzionale dedicato: marketing ops, SDR e data specialist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">Automazione completa del processo di lead generation</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-orange uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Partnership & Risultati
                </h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">Revenue share: vinciamo solo se cresci anche tu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">Accesso prioritario a nuove funzionalità e beta testing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">Advisory board trimestrale con i founder</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row mt-4 relative z-10">
              <Button
                className="w-full sm:w-auto bg-orange hover:bg-orange/90 text-white shadow-xl hover:shadow-2xl hover:shadow-orange/30 px-8 py-4 text-lg"
                onClick={handleContactClick}
              >
                Contattaci ora
              </Button>
              <span className="text-sm text-gray-600 font-medium">
                💼 Ideale per aziende B2B con ACV {'>'} €10k
              </span>
            </div>
          </Card>

          {/* Performance - MEDIUM HIGHLIGHT */}
          <Card
            className="flex cursor-pointer flex-col gap-6 rounded-3xl border border-sky-blue/60 bg-gradient-to-br from-sky-blue/5 to-white p-9 shadow-lg transition-all hover:border-sky-blue hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue lg:col-span-6"
            onClick={() => navigateTo("/pacchetti/performance")}
            onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/performance")}
            role="link"
            tabIndex={0}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-sky-blue/20 px-3 py-1 text-xs font-semibold text-sky-blue border border-sky-blue/30">
                  Kickstart
                </span>
                <span className="text-xs text-gray-500">⚡ Setup in 7 giorni</span>
              </div>
              <h3 className="text-3xl font-bold text-navy">Performance</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Per iniziare in sicurezza e validare rapidamente il modello AYCL con zero rischi upfront.
              </p>
            </div>

            <div className="bg-sky-blue/5 rounded-xl p-4 border border-sky-blue/20">
              <p className="text-xs font-semibold text-sky-blue uppercase tracking-wider mb-2">Modello di pricing</p>
              <p className="text-sm text-gray-700">💰 Paghi solo per risultati concreti: nessun costo fisso, solo appuntamenti qualificati svolti</p>
            </div>

            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                <span>Onboarding dedicato e audit sul processo commerciale attuale</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                <span>Paghi solo gli appuntamenti qualificati effettivamente svolti</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                <span>Reportistica settimanale e ottimizzazioni continue</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                <span>Test A/B su messaging e target audience</span>
              </li>
            </ul>

            <div className="mt-auto pt-4">
              <Button className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white shadow-md hover:shadow-lg" onClick={handleContactClick}>
                Contattaci ora
              </Button>
            </div>
          </Card>

          {/* Subscription - MINIMAL HIGHLIGHT */}
          <Card
            className="relative flex cursor-pointer flex-col gap-5 rounded-2xl border border-gray-300 bg-white p-7 shadow-md transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy lg:col-span-3"
            onClick={() => navigateTo("/pacchetti/subscription")}
            onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/subscription")}
            role="link"
            tabIndex={0}
          >
       
            <div className="space-y-2">
              <span className="inline-flex items-center rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">
                Scale
              </span>
              <h3 className="text-2xl font-bold text-navy">Subscription</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Per team commerciali che vogliono continuità e volumi prevedibili.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-xs text-gray-600">📅 Canone mensile fisso</p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                <span>Agenda di meeting qualificati garantita ogni mese</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                <span>Account manager dedicato e dashboard KPI real-time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                <span>Riunioni strategiche mensili</span>
              </li>
            </ul>

            <div className="mt-auto pt-3">
              <Button className="w-full bg-navy hover:bg-navy/90 text-white text-sm py-2.5" onClick={handleContactClick}>
                Contattaci ora
              </Button>
            </div>
          </Card>
        </div>

        {/* Trust indicator */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            ✓ Oltre 50 aziende B2B si affidano già ad AYCL per accelerare la crescita
          </p>
        </div>
      </div>
    </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">Domande Frequenti</h2>
            <p className="text-xl text-gray-600">Tutto quello che devi sapere su All You Can Leads</p>
          </div>

          <FAQCarousel
            className="mt-12"
            items={[
              {
                question: "Qual è la differenza tra All You Can Leads e una normale agenzia di lead generation?",
                answer:
                  "La maggior parte delle agenzie di lead generation ti vende liste di contatti generici o campagne pubblicitarie. All You Can Leads ribalta lo schema: portiamo direttamente appuntamenti reali con figure decisionali in target grazie a database proprietari, intelligenza artificiale e al nostro software interno Sendura.",
              },
              {
                question: "Come funziona il vostro sistema di generazione appuntamenti B2B?",
                answer:
                  "Partiamo dalla definizione dell'ICP, selezioniamo i contatti dal nostro database, attiviamo un processo di interazione e scrematura, e solo a questo punto calendarizziamo appuntamenti con decision maker che hanno espresso interesse reale.",
              },
              {
                question: "Che differenza c'è tra lead e appuntamenti qualificati?",
                answer:
                  "Un lead è solo un contatto. Un appuntamento qualificato è calendarizzato, rispetta i parametri dell'ICP concordato e l'interlocutore ha già interagito con noi dimostrando interesse. Se non rispetta l'ICP o non si presenta, l'appuntamento non viene conteggiato.",
              },
              {
                question: "Gli appuntamenti qualificati sono garantiti?",
                answer:
                  "Sì. Nel pacchetto Performance paghi solo quelli svolti e conformi all'ICP. Nella Subscription è garantito un range mensile di appuntamenti. Nel Set-Up Fee la garanzia si estende al ritorno economico con modello revenue share.",
              },
              {
                question: "Quanto tempo serve per iniziare a vedere i primi risultati?",
                answer:
                  "I primi 30-90 giorni sono un periodo di testing per raggiungere una massa di dati statisticamente rilevanti. In questa fase possono già arrivare appuntamenti, ma l'obiettivo è portare il sistema a regime per garantire un flusso costante e prevedibile nel tempo.",
              },
              {
                question: "Utilizzate l'intelligenza artificiale nei vostri sistemi?",
                answer:
                  "Sì, l'AI è integrata in diversi punti del processo: segmentazione dei contatti, personalizzazione dei messaggi e gestione delle priorità di follow-up. L'obiettivo è aumentare efficienza e precisione senza sostituire le persone.",
              },
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-navy via-navy to-sky-blue/20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">
              Pronto a riempire il tuo calendario di opportunità reali?
            </h2>
            <p className="text-xl text-gray-200">
              Smetti di sprecare budget in ADV e inizia a parlare con chi decide davvero
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
                  Scarica il Case Study
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
