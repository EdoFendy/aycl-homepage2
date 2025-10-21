import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  LegalPageLayout,
  type LegalSectionConfig,
} from "@/components/legal/legal-page-layout"

export const metadata: Metadata = {
  title: "Cookie Policy | All You Can Leads",
  description: "Informativa sull'utilizzo dei cookie del sito aycl.netlify.app di 4YOU 4YOUR FUTURE SOCIEDAD LTDA.",
}

export default function CookiePolicyPage() {
  const sections: LegalSectionConfig[] = [
    {
      id: "tipologie",
      title: "1. Tipologie di cookie",
      content: (
        <div className="space-y-4">
          <p>AYCL utilizza differenti categorie di cookie per garantire un&apos;esperienza ottimale:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>cookie tecnici necessari al funzionamento del sito e alla gestione delle sessioni utente;</li>
            <li>cookie analitici per analizzare statistiche di traffico e comportamento degli utenti in forma aggregata;</li>
            <li>cookie di marketing impiegati per attività di remarketing e misurazione campagne (es. Meta Pixel, LinkedIn Insight Tag).</li>
          </ul>
        </div>
      ),
    },
    {
      id: "gestione-consenso",
      title: "2. Gestione del consenso",
      content: (
        <div className="space-y-4">
          <p>Al primo accesso viene mostrato un banner che permette di:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>accettare tutti i cookie;</li>
            <li>rifiutare i cookie di profilazione;</li>
            <li>personalizzare le preferenze selezionando singole categorie.</li>
          </ul>
          <p>I cookie di profilazione e marketing vengono installati solo dopo il consenso esplicito dell’utente.</p>
          <p>
            Il consenso può essere modificato o revocato in qualsiasi momento selezionando “Gestisci preferenze cookie” nel footer del sito oppure contattando {" "}
            <a href="mailto:Support@allyoucanleads.com" className="text-orange underline">
              Support@allyoucanleads.com
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      id: "disattivazione",
      title: "3. Disattivazione manuale",
      content: (
        <p>
          Gli utenti possono disabilitare i cookie direttamente dal proprio browser (Chrome, Edge, Safari, Firefox). La disattivazione dei cookie tecnici potrebbe limitare alcune funzionalità del sito e impedire il corretto salvataggio delle preferenze.
        </p>
      ),
    },
    {
      id: "strumenti",
      title: "4. Strumenti e fornitori utilizzati",
      content: (
        <div className="space-y-4">
          <p>AYCL utilizza strumenti conformi al GDPR, tra cui:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Google Analytics e Tag Manager per analisi statistiche anonime;</li>
            <li>Meta Pixel (Facebook e Instagram) per campagne di remarketing;</li>
            <li>LinkedIn Insight Tag per monitoraggio e advertising B2B.</li>
          </ul>
          <p>Tutti i dati raccolti sono pseudonimizzati e non consentono l’identificazione diretta degli utenti.</p>
        </div>
      ),
    },
    {
      id: "normativa",
      title: "5. Riferimenti normativi",
      content: (
        <div className="space-y-3">
          <p>La presente Cookie Policy è redatta in conformità con:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Regolamento UE 2016/679 (GDPR);</li>
            <li>Direttiva 2002/58/CE (ePrivacy);</li>
            <li>Linee Guida del Garante Privacy Italiano 2021–2024.</li>
          </ul>
        </div>
      ),
    },
  ]

  return (
    <LegalPageLayout
      hero={{
        eyebrow: "COMPLIANCE HUB",
        title: "Cookie Policy",
        subtitle: "Gestione trasparente delle preferenze digitali",
        description: (
          <p>
            Il sito aycl.netlify.app utilizza cookie tecnici, analitici e di profilazione per garantire performance elevate e
            campagne marketing misurabili nel pieno rispetto delle normative sulla privacy.
          </p>
        ),
        lastUpdated: "Ultimo aggiornamento: Ottobre 2025",
        highlight: "Puoi aggiornare le preferenze dal banner di consenso in ogni momento",
        actions: (
          <Link href="#gestione-consenso">
            <Button variant="outline" className="border-navy text-navy hover:bg-navy/5">
              Vai alla gestione del consenso
            </Button>
          </Link>
        ),
      }}
      sections={sections}
    />
  )
}
