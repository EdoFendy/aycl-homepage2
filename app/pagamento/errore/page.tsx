import { AlertTriangle, RotateCcw } from "lucide-react"
import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pagamento non completato",
  description: "Si è verificato un problema durante il pagamento dell'abbonamento annuale.",
}

export default async function PagamentoErrorePage(): Promise<JSX.Element> {
  const t = await getTranslations("pagamento.error")

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white px-6 py-24 text-center">
      <AlertTriangle className="h-20 w-20 text-orange" />
      <h1 className="mt-6 text-4xl font-bold text-navy md:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-600">{t("subtitle")}</p>
      <div className="mt-8 flex flex-col items-center gap-4 md:flex-row">
        <Link href="/pagamento">
          <Button className="flex items-center gap-2 bg-orange text-white hover:bg-orange/90">
            <RotateCcw className="h-4 w-4" />
            {t("actions.retry")}
          </Button>
        </Link>
        <Link href="/contattaci">
          <Button variant="secondary">{t("actions.support")}</Button>
        </Link>
      </div>
    </div>
  )
}
