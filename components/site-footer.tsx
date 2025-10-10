import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 py-12 text-gray-400">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start gap-8 text-center md:text-left">
          <div className="flex-1 min-w-[180px] flex flex-col items-center md:items-start">
            <div className="mb-4 flex items-center justify-center md:justify-start gap-3">
              <Image src="/logo.png" alt="All You Can Leads" width={32} height={32} />
              <span className="font-bold text-white">All You Can Leads</span>
            </div>
            <p className="text-sm leading-relaxed">
              Il sistema proprietario per generare appuntamenti B2B qualificati
            </p>
          </div>
          <div className="flex-1 min-w-[180px] flex flex-col items-center md:items-start mt-4 md:mt-0 space-y-2 text-sm leading-relaxed">
            <p className="font-semibold text-white text-center md:text-left">4YOU 4YOUR FUTURE SOCIEDAD LTDA</p>
            <p className="text-center md:text-left">
              Avenida touroperador neckermann 3
              <br />
              Campo Internacional, Maspalomas, 35100
              <br />
              Spain
            </p>
            <p className="text-center md:text-left">CIF B44593010</p>
          </div>
          <div className="flex-1 min-w-[180px] flex flex-col items-center md:items-start">
            <h4 className="mb-2 font-semibold text-white text-center md:text-left">Pacchetti</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pacchetti/performance" className="transition-colors hover:text-white">
                  Performance
                </Link>
              </li>
              <li>
                <Link href="/pacchetti/subscription" className="transition-colors hover:text-white">
                  Subscription
                </Link>
              </li>
              <li>
                <Link href="/pacchetti/set-up-fee" className="transition-colors hover:text-white">
                  Set-up Fee
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1 min-w-[180px] flex flex-col items-center md:items-start">
            <h4 className="mb-4 font-semibold text-white text-center md:text-left">Informazioni</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contattaci" className="transition-colors hover:text-white">
                  Contattaci ora
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/pacchetti/set-up-fee" className="transition-colors hover:text-white">
                  Set-up Fee
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1 min-w-[180px] flex flex-col items-center md:items-start">
            <h4 className="mb-4 font-semibold text-white text-center md:text-left">Legale</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="transition-colors hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/termini-e-condizioni" className="transition-colors hover:text-white">
                  Termini e Condizioni
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
