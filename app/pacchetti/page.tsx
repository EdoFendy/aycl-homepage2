"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Zap, TrendingUp, Rocket, Crown, Sparkles, Star, Target, Users, CalendarCheck, BarChart3, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { KeyboardEvent, MouseEvent } from "react"

export default function PacchettiPage() {
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
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-24 right-24 h-72 w-72 rounded-full bg-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute top-32 -left-20 h-56 w-56 rounded-full bg-sky-blue/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-64 w-16 -rotate-45 bg-navy/5" />
      <div className="relative z-10">
        {/* Hero Section */}
      <section id="pacchetti" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-20 right-10 w-48 h-48 bg-sky-blue/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange/10 rotate-12" />

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-6 py-2 bg-orange/10 rounded-full">
              <span className="text-sm font-semibold text-orange">I Nostri Pacchetti</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight text-balance">
              Scegli il pacchetto giusto per la tua azienda
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Ogni azienda è a un punto diverso del suo percorso. Scopri quale soluzione si adatta meglio alle tue
              ambizioni di crescita.
            </p>
          </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-blue/5 rounded-full blur-3xl"></div>
      

      <div className="grid gap-6 md:gap-8 lg:grid-cols-12 max-w-7xl mx-auto py-12 justify-center px-4 md:px-6">
      {/* Set-Up Fee - PREMIUM HIGHLIGHT */}
          <Card
            className="relative flex cursor-pointer flex-col gap-6 md:gap-8 rounded-2xl md:rounded-3xl border-2 border-orange bg-gradient-to-br from-orange/5 via-white to-orange/10 p-6 md:p-12 shadow-xl md:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-orange/30 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange lg:col-span-12 overflow-hidden"
            onClick={() => navigateTo("/pacchetti/set-up-fee")}
            onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/set-up-fee")}
            role="link"
            tabIndex={0}
          >
            {/* Enhanced decorative effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange/5 to-transparent rounded-full blur-2xl"></div>
            
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
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy">Set-Up Fee + Revenue Share</h3>
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

            <div className="flex flex-col sm:flex-row gap-4 items-center mt-4 relative z-10">
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
            className="relative flex cursor-pointer flex-col gap-4 md:gap-6 rounded-2xl md:rounded-3xl border border-sky-blue/60 bg-gradient-to-br from-sky-blue/5 to-white p-6 md:p-9 shadow-lg transition-all duration-500 hover:border-sky-blue hover:shadow-xl hover:shadow-sky-blue/20 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue lg:col-span-8 overflow-hidden"
            onClick={() => navigateTo("/pacchetti/performance")}
            onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/performance")}
            role="link"
            tabIndex={0}
          >
            {/* Decorative effects for Performance */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-blue/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl"></div>
            
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-sky-blue/20 px-3 py-1 text-xs font-semibold text-sky-blue border border-sky-blue/30">
                  Kickstart
                </span>
                <span className="text-xs text-gray-500">⚡ Setup in 7 giorni</span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-navy">Performance</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Per iniziare in sicurezza e validare rapidamente il modello AYCL con zero rischi upfront.
              </p>
            </div>

            <div className="bg-sky-blue/5 rounded-xl p-4 border border-sky-blue/20 relative z-10">
              <p className="text-xs font-semibold text-sky-blue uppercase tracking-wider mb-2">Modello di pricing</p>
              <p className="text-sm text-gray-700">💰 Paghi solo per risultati concreti: nessun costo fisso, solo appuntamenti qualificati svolti</p>
            </div>

            <ul className="space-y-3 text-sm text-gray-700 relative z-10">
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

            <div className="mt-auto pt-4 relative z-10">
              <Button className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white shadow-md hover:shadow-lg transition-all duration-300" onClick={handleContactClick}>
                Contattaci ora
              </Button>
            </div>
          </Card>

          {/* Subscription - MINIMAL HIGHLIGHT */}
          <Card
            className="relative flex cursor-pointer flex-col gap-4 md:gap-5 rounded-xl md:rounded-2xl border border-gray-300 bg-white p-5 md:p-7 shadow-md transition-all duration-500 hover:shadow-lg hover:shadow-navy/10 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy lg:col-span-4 overflow-hidden"
            onClick={() => navigateTo("/pacchetti/subscription")}
            onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/subscription")}
            role="link"
            tabIndex={0}
          >
            {/* Decorative effects for Subscription */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-navy/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-navy/3 rounded-full blur-lg"></div>
            
            <div className="space-y-2 relative z-10">
              <span className="inline-flex items-center rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">
                Scale
              </span>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-navy">Subscription</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Per team commerciali che vogliono continuità e volumi prevedibili.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 relative z-10">
              <p className="text-xs text-gray-600">📅 Canone mensile fisso</p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-700 relative z-10">
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

            <div className="mt-auto pt-3 relative z-10">
              <Button className="w-full bg-navy hover:bg-navy/90 text-white text-sm py-2.5 transition-all duration-300" onClick={handleContactClick}>
                Contattaci ora
              </Button>
            </div>
          </Card>
        </div>


        {/* Trust indicator */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            ✨ Tutti i pacchetti includono onboarding completo, reportistica trasparente e supporto dedicato
          </p>
        </div>
        </div>

    </section>


      {/* Comparison Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-28 h-28 bg-sky-blue/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-navy/10 px-4 py-2 rounded-full mb-6">
                <Target className="w-4 h-4 text-navy" />
                <span className="text-sm font-semibold text-navy">Guida alla Scelta</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6 text-balance">
                Quale pacchetto fa al caso tuo?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ogni soluzione è pensata per una fase diversa del tuo percorso di crescita. 
                Scopri quale si adatta meglio alle tue esigenze attuali.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Performance Card */}
              <Card className="relative p-8 bg-gradient-to-br from-sky-blue/5 to-white border-2 border-sky-blue/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-sky-blue overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-blue/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-sky-blue/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-sky-blue/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-sky-blue" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-navy">Performance</h4>
                      <p className="text-sm text-sky-blue font-semibold">Kickstart</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-base md:text-lg font-bold text-navy mb-4">È ideale se...</h5>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sky-blue mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Vuoi testare il sistema senza rischi</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sky-blue mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Cerchi massima flessibilità</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sky-blue mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Paghi solo i risultati ottenuti</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sky-blue mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">È il tuo primo anno di collaborazione</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-sky-blue/5 rounded-lg p-4 border border-sky-blue/20">
                    <p className="text-sm font-semibold text-sky-blue mb-1">Perfetto per</p>
                    <p className="text-sm text-gray-700">Startup e PMI che vogliono validare il modello senza investimenti upfront</p>
                  </div>
                </div>
              </Card>

              {/* Subscription Card */}
              <Card className="relative p-8 bg-gradient-to-br from-orange/5 to-white border-2 border-orange/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-orange/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center">
                      <CalendarCheck className="w-6 h-6 text-orange" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-navy">Subscription</h4>
                      <p className="text-sm text-orange font-semibold">Scale</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-base md:text-lg font-bold text-navy mb-4">È ideale se...</h5>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Vuoi numeri prevedibili ogni mese</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Hai un team commerciale attivo</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Cerchi continuità e stabilità</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Vuoi risparmiare il 25%</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange/5 rounded-lg p-4 border border-orange/20">
                    <p className="text-sm font-semibold text-orange mb-1">Perfetto per</p>
                    <p className="text-sm text-gray-700">Aziende strutturate con team commerciali che vogliono flusso costante</p>
                  </div>
                </div>
              </Card>

              {/* Set-Up Fee Card */}
              <Card className="relative p-8 bg-gradient-to-br from-navy/5 to-white border-2 border-navy/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-navy overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-navy/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-navy/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-navy">Set-Up Fee</h4>
                      <p className="text-sm text-navy font-semibold">Partnership Elite</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-base md:text-lg font-bold text-navy mb-4">È ideale se...</h5>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Vuoi scalare senza limiti</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Cerchi una partnership strategica</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Hai un'azienda ben strutturata</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">Pensi a lungo termine</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-navy/5 rounded-lg p-4 border border-navy/20">
                    <p className="text-sm font-semibold text-navy mb-1">Perfetto per</p>
                    <p className="text-sm text-gray-700">Grandi aziende che vogliono partnership di lungo periodo con revenue share</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional guidance */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-navy/5 via-sky-blue/5 to-orange/5 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-navy" />
                  <h3 className="text-xl font-bold text-navy">Non sei sicuro?</h3>
                </div>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Ogni pacchetto include onboarding completo, reportistica trasparente e supporto dedicato. 
                  Prenota una call gratuita per scoprire quale soluzione si adatta meglio alla tua azienda.
                </p>
                <Button 
                  className="bg-navy hover:bg-navy/90 text-white px-8 py-3"
                  onClick={() => router.push('/contattaci')}
                >
                  Prenota una Call Gratuita
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>



     

      {/* Testimonial/Case Study Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-blue/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-orange/10 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-orange" />
                <span className="text-sm font-semibold text-orange">Success Stories</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6 text-balance">
                Aziende che hanno <span className="text-orange">rivoluzionato</span> la loro crescita
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Scopri come le nostre soluzioni hanno trasformato il business di aziende B2B in tutta Europa
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Case Study 1 */}
              <Card className="p-8 bg-white border-orange/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy">Software Company</h3>
                    <p className="text-sm text-gray-600">Settore: Tecnologia</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-orange/5 rounded-lg">
                      <div className="text-2xl font-bold text-orange">+340%</div>
                      <div className="text-sm text-gray-600">Appuntamenti</div>
                    </div>
                    <div className="text-center p-4 bg-sky-blue/5 rounded-lg">
                      <div className="text-2xl font-bold text-sky-blue">€2.3M</div>
                      <div className="text-sm text-gray-600">Revenue generato</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "In 6 mesi abbiamo triplicato i nostri appuntamenti qualificati. AYCL ci ha portato direttamente dai decision maker che contano."
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-semibold">Marco R.</span>
                    <span>•</span>
                    <span>CEO</span>
                  </div>
                </div>
              </Card>

              {/* Case Study 2 */}
              <Card className="p-8 bg-white border-sky-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-sky-blue/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-sky-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy">Consulting Firm</h3>
                    <p className="text-sm text-gray-600">Settore: Servizi</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-sky-blue/5 rounded-lg">
                      <div className="text-2xl font-bold text-sky-blue">85%</div>
                      <div className="text-sm text-gray-600">Conversion Rate</div>
                    </div>
                    <div className="text-center p-4 bg-navy/5 rounded-lg">
                      <div className="text-2xl font-bold text-navy">€850k</div>
                      <div className="text-sm text-gray-600">ACV medio</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "Il sistema AYCL ci ha permesso di accedere a mercati che prima erano impossibili da raggiungere. Risultati straordinari."
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-semibold">Sarah L.</span>
                    <span>•</span>
                    <span>Managing Partner</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy mb-2">50+</div>
                  <div className="text-sm text-gray-600">Aziende Attive</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange mb-2">€15M+</div>
                  <div className="text-sm text-gray-600">Revenue Generato</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky-blue mb-2">2,500+</div>
                  <div className="text-sm text-gray-600">Appuntamenti</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy mb-2">95%</div>
                  <div className="text-sm text-gray-600">Soddisfazione</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
    </div>
  )
}
