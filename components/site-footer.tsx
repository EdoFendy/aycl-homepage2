import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

export async function SiteFooter() {
  const t = await getTranslations("siteFooter")
  return (
    <footer className="bg-gray-900 py-8 md:py-12 text-gray-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Logo e descrizione */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="mb-4 flex items-center justify-center sm:justify-start gap-3">
              <Image src="/logoW.png" alt={t("brand.name")} width={32} height={32} />
              <span className="font-bold text-white text-base md:text-lg">{t("brand.name")}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">{t("brand.tagline")}</p>
          </div>

          {/* Info azienda */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <p className="font-semibold text-white text-sm md:text-base mb-2">4YOU 4YOUR FUTURE SOCIEDAD LTDA</p>
            <p className="text-sm leading-relaxed">
              Avenida touroperador neckermann 3
              <br />
              Campo Internacional, Maspalomas, 35100
              <br />
              Spain
            </p>
            <p className="text-sm mt-2">CIF B44593010</p>
          </div>

          {/* Pacchetti */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="mb-3 font-semibold text-white text-sm md:text-base">{t("sections.packages")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pacchetti/performance" className="transition-colors hover:text-white">
                  {t("links.performance")}
                </Link>
              </li>
              <li>
                <Link href="/pacchetti/subscription" className="transition-colors hover:text-white">
                  {t("links.subscription")}
                </Link>
              </li>
              <li>
                <Link href="/pacchetti/set-up-fee" className="transition-colors hover:text-white">
                  {t("links.setup")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Informazioni */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="mb-3 font-semibold text-white text-sm md:text-base">{t("sections.info")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contattaci" className="transition-colors hover:text-white">
                  {t("links.contact")}
                </Link>
              </li>
              <li>
                <Link href="/pagamento" className="transition-colors hover:text-white">
                  {t("links.payment")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-white">
                  {t("links.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legale */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="mb-3 font-semibold text-white text-sm md:text-base">{t("sections.legal")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="transition-colors hover:text-white">
                  {t("links.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="transition-colors hover:text-white">
                  {t("links.cookie")}
                </Link>
              </li>
              <li>
                <Link href="/termini-e-condizioni" className="transition-colors hover:text-white">
                  {t("links.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-sm">
          <p>&copy; 2025 All You Can Leads. {t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
