import Link from "next/link"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PaymentErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-rose-200/60 bg-white p-12 text-center shadow-xl">
          <AlertTriangle className="mb-6 h-16 w-16 text-rose-500" />
          <h1 className="text-4xl font-bold text-navy">Pagamento non completato</h1>
          <p className="mt-4 text-lg text-gray-600">
            L&apos;operazione è stata annullata o non è andata a buon fine. Nessun addebito è stato effettuato. Puoi riprovare o contattarci per assistenza.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button variant="outline" asChild>
              <Link href="/pagamenti">Riprova</Link>
            </Button>
            <Button asChild className="bg-navy text-white hover:bg-navy/90">
              <Link href="/contattaci">Contatta il supporto</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
