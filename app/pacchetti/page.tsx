"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Zap, TrendingUp, Rocket, Crown, Sparkles, Star } from "lucide-react"
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
      

      <div className="grid gap-8 lg:grid-cols-9 max-w-4xl mx-auto py-12 justify-center">
      {/* Set-Up Fee - PREMIUM HIGHLIGHT */}
          <Card
            className="relative flex cursor-pointer flex-col gap-8 rounded-3xl border-2 border-orange bg-gradient-to-br from-orange/5 via-white to-orange/10 p-12 shadow-2xl transition-all hover:scale-[1.02] hover:shadow-orange/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange lg:col-span-9 overflow-hidden"
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
            ✨ Tutti i pacchetti includono onboarding completo, reportistica trasparente e supporto dedicato
          </p>
        </div>
        </div>

    </section>


      {/* Comparison Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-navy mb-4">Quale pacchetto fa al caso tuo?</h2>
              <p className="text-xl text-gray-600">
                Ogni soluzione è pensata per una fase diversa del tuo percorso di crescita
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 bg-white border-sky-blue/20">
                <h4 className="text-lg font-bold text-navy mb-3">Performance è ideale se...</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Vuoi testare il sistema</li>
                  <li>• Cerchi flessibilità</li>
                  <li>• Paghi solo i risultati</li>
                  <li>• Primo anno di collaborazione</li>
                </ul>
              </Card>

              <Card className="p-6 bg-white border-orange/20">
                <h4 className="text-lg font-bold text-navy mb-3">Subscription è ideale se...</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Vuoi numeri prevedibili</li>
                  <li>• Hai un team commerciale attivo</li>
                  <li>• Cerchi continuità</li>
                  <li>• Vuoi risparmiare il 25%</li>
                </ul>
              </Card>

              <Card className="p-6 bg-white border-navy/20">
                <h4 className="text-lg font-bold text-navy mb-3">Set-Up Fee è ideale se...</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Vuoi scalare senza limiti</li>
                  <li>• Cerchi una partnership</li>
                  <li>• Hai un'azienda strutturata</li>
                  <li>• Pensi a lungo termine</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-navy via-navy to-sky-blue/20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">Non sai quale scegliere?</h2>
            <p className="text-xl text-gray-200">
              Prenota una call gratuita e scopriamo insieme la soluzione migliore per la tua azienda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contattaci">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-lg px-8">
                  Prenota una Call Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
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
