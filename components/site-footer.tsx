import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 py-12 text-gray-400">
      <div className="container mx-auto px-6">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image src="/logo.png" alt="All You Can Leads" width={32} height={32} />
              <span className="font-bold text-white">All You Can Leads</span>
            </div>
            <p className="text-sm leading-relaxed">
              Il sistema proprietario per generare appuntamenti B2B qualificati
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Servizi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pacchetti/performance" className="transition-colors hover:text-white">
                  Lead Generation B2B
                </Link>
              </li>
              <li>
                <Link href="/pacchetti/subscription" className="transition-colors hover:text-white">
                  Appuntamenti Qualificati
                </Link>
              </li>
              <li>
                <Link href="/pacchetti/set-up-fee" className="transition-colors hover:text-white">
                  Database Proprietari
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Azienda</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pacchetti" className="transition-colors hover:text-white">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link href="/pacchetti/performance" className="transition-colors hover:text-white">
                  Case Study
                </Link>
              </li>
              <li>
                <Link href="/contattaci" className="transition-colors hover:text-white">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Legale</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contattaci" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contattaci" className="transition-colors hover:text-white">
                  Termini di Servizio
                </Link>
              </li>
              <li>
                <Link href="/contattaci" className="transition-colors hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 All You Can Leads. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}
