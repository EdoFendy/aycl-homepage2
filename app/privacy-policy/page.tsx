import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  LegalPageLayout,
  type LegalSectionConfig,
} from "@/components/legal/legal-page-layout"

export const metadata: Metadata = {
  title: "Privacy Policy | All You Can Leads",
  description:
    "Informazioni sul trattamento dei dati personali da parte di 4YOU 4YOUR FUTURE SOCIEDAD LTDA per il sito All You Can Leads.",
}

export default function PrivacyPolicyPage() {
  const sections: LegalSectionConfig[] = [
    {
      id: "titolare",
      title: "Titolare del trattamento",
      content: (
        <div className="space-y-2">
          <p>4YOU 4YOUR FUTURE SOCIEDAD LTDA</p>
          <p>Av. de Tirajana 39, Maspalomas (Gran Canaria, Spagna)</p>
          <p>
            Email: <a href="mailto:Support@allyoucanleads.com" className="text-orange underline">Support@allyoucanleads.com</a>
          </p>
        </div>
      ),
    },
    {
      id: "tipologie-dati",
      title: "1. Tipologie di dati raccolti",
      content: (
        <div className="space-y-4">
          <p>Il Sito raccoglie diverse tipologie di informazioni personali:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>dati forniti volontariamente dall&apos;utente (nome, email, telefono, azienda);</li>
            <li>dati di navigazione (indirizzo IP, tipo di browser, durata della sessione, pagine visitate);</li>
            <li>dati di tracciamento raccolti tramite cookie o strumenti di analisi di terze parti.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "finalita",
      title: "2. Finalità del trattamento",
      content: (
        <div className="space-y-4">
          <p>I dati personali vengono trattati per le seguenti finalità:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>gestire richieste di informazioni e contatti commerciali;</li>
            <li>eseguire le misure precontrattuali e contrattuali concordate con il Cliente;</li>
            <li>inviare comunicazioni promozionali o informative sui servizi AYCL;</li>
            <li>analizzare l&apos;utilizzo del sito per migliorarne le performance;</li>
            <li>adempiere obblighi di legge o fiscali.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "base-giuridica",
      title: "3. Base giuridica del trattamento",
      content: (
        <div className="space-y-4">
          <p>Il trattamento dei dati personali si fonda su diverse basi giuridiche:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>esecuzione contrattuale per gestire i servizi richiesti dall&apos;utente;</li>
            <li>consenso esplicito per l&apos;invio di comunicazioni promozionali e informative;</li>
            <li>legittimo interesse per attività di analisi, marketing B2B e sicurezza del sito;</li>
            <li>adempimento di obblighi legali in materia fiscale o amministrativa.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "conservazione",
      title: "4. Conservazione dei dati",
      content: (
        <p>
          I dati vengono conservati per 24 mesi ai fini di marketing, oppure fino alla revoca del consenso. I dati contrattuali
          vengono mantenuti per 10 anni, come previsto dalla normativa fiscale.
        </p>
      ),
    },
    {
      id: "comunicazione",
      title: "5. Comunicazione e trasferimento dei dati",
      content: (
        <p>
          I dati personali possono essere comunicati a fornitori esterni che supportano AYCL nella gestione tecnica e operativa
          del servizio (es. hosting, CRM, piattaforme email, analisi dati). Alcuni dati potrebbero essere trasferiti verso Paesi
          extra UE, come gli Stati Uniti, esclusivamente verso soggetti che rispettano le Clausole Contrattuali Standard
          dell&apos;Unione Europea o aderenti al Data Privacy Framework.
        </p>
      ),
    },
    {
      id: "sicurezza",
      title: "6. Sicurezza e violazioni dei dati",
      content: (
        <p>
          AYCL adotta misure tecniche e organizzative adeguate (crittografia, autenticazione, backup sicuri) per proteggere i
          dati personali. In caso di violazione dei dati, il Titolare notificherà il Garante Privacy entro 72 ore e informerà gli
          utenti interessati quando necessario.
        </p>
      ),
    },
    {
      id: "diritti",
      title: "7. Diritti dell’interessato",
      content: (
        <div className="space-y-4">
          <p>L&apos;utente può esercitare in qualsiasi momento i seguenti diritti previsti dal GDPR:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>accedere ai propri dati personali;</li>
            <li>chiederne la rettifica o la cancellazione;</li>
            <li>limitare o opporsi al trattamento;</li>
            <li>richiedere la portabilità dei dati;</li>
            <li>presentare reclamo all&apos;Autorità Garante competente.</li>
          </ul>
          <p>
            Le richieste possono essere inviate a {" "}
            <a href="mailto:Support@allyoucanleads.com" className="text-orange underline">
              Support@allyoucanleads.com
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      id: "dpo",
      title: "8. Responsabile o DPO",
      content: (
        <p>
          Attualmente AYCL non ha nominato un Data Protection Officer. Qualora la mole dei dati o la tipologia di trattamento
          lo rendessero necessario, il Titolare provvederà alla sua designazione e ne darà comunicazione agli utenti.
        </p>
      ),
    },
  ]

  return (
    <LegalPageLayout
      hero={{
        eyebrow: "COMPLIANCE HUB",
        title: "Privacy Policy (GDPR)",
        subtitle: "Trasparenza e tutela dei dati personali",
        description: (
          <p>
            Questa informativa descrive come 4YOU 4YOUR FUTURE SOCIEDAD LTDA gestisce i dati personali degli utenti che visitano e
            utilizzano il sito aycl.netlify.app.
          </p>
        ),
        lastUpdated: "Ultimo aggiornamento: Ottobre 2025",
        highlight: "Valida per i servizi erogati in Unione Europea e LATAM",
        actions: (
          <Link href="/contattaci">
            <Button className="bg-orange text-white hover:bg-orange/90">Contatta il nostro DPO</Button>
          </Link>
        ),
      }}
      sections={sections}
    />
  )
}
