import type { Metadata } from "next"

import PagamentoClientPage from "./payment-client"

export const metadata: Metadata = {
  title: "Pagamento abbonamento annuale AYCL",
  description:
    "Completa l'acquisto del pacchetto AYCL da 3.000€ con pagamento sicuro tramite il gateway ufficiale Redsys BBVA.",
}

export default function PagamentoPage(): JSX.Element {
  return <PagamentoClientPage />
}
