import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-emerald-200/60 bg-white p-12 text-center shadow-xl">
          <CheckCircle2 className="mb-6 h-16 w-16 text-emerald-500" />
          <h1 className="text-4xl font-bold text-navy">Pagamento completato con successo</h1>
          <p className="mt-4 text-lg text-gray-600">
            Grazie! Abbiamo ricevuto la conferma da Redsys. Riceverai una mail di riepilogo con i dettagli della transazione.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button asChild className="bg-navy text-white hover:bg-navy/90">
              <Link href="/">Torna alla home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pagamenti">Effettua un nuovo pagamento</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
