import type { Metadata } from "next"
import { PageLayoutContainer } from "@/components/page-layout-container"

export const metadata: Metadata = {
  title: "Privacy Policy | All You Can Leads",
  description:
    "Informazioni sul trattamento dei dati personali da parte di 4YOU 4YOUR FUTURE SOCIEDAD LTDA per il sito All You Can Leads.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white py-16">
      <PageLayoutContainer className="px-6" innerClassName="max-w-4xl mx-auto space-y-10 text-gray-800">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-gray-500">Ultimo aggiornamento: Ottobre 2025</p>
          <h1 className="text-4xl font-bold text-navy">Privacy Policy (GDPR)</h1>
          <p>
            Questa informativa descrive le modalità con cui 4YOU 4YOUR FUTURE SOCIEDAD LTDA tratta i dati personali degli
            utenti che visitano e utilizzano il sito aycl.netlify.app.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">Titolare del trattamento</h2>
          <p>4YOU 4YOUR FUTURE SOCIEDAD LTDA</p>
          <p>Av. de Tirajana 39, Maspalomas (Gran Canaria, Spagna)</p>
          <p>
            Email: <a href="mailto:Support@allyoucanleads.com" className="text-orange underline">Support@allyoucanleads.com</a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">1. Tipologie di dati raccolti</h2>
          <p>Il Sito raccoglie diversi tipi di dati:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>dati forniti volontariamente dall'utente (nome, email, telefono, azienda);</li>
            <li>dati di navigazione (indirizzi IP, tipo di browser, durata della sessione, pagine visitate);</li>
            <li>dati di tracciamento raccolti tramite cookie o strumenti di analisi di terze parti.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">2. Finalità del trattamento</h2>
          <p>I dati personali vengono trattati per:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>gestire richieste di informazioni e contatti commerciali;</li>
            <li>eseguire le misure precontrattuali e contrattuali;</li>
            <li>inviare comunicazioni promozionali o informative sui servizi AYCL;</li>
            <li>analizzare l'utilizzo del sito per migliorarne le performance;</li>
            <li>adempiere obblighi di legge o fiscali.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">3. Base giuridica del trattamento</h2>
          <p>Il trattamento dei dati si basa su diverse basi giuridiche:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>esecuzione contrattuale per gestire i servizi richiesti;</li>
            <li>consenso esplicito per l'invio di comunicazioni promozionali;</li>
            <li>legittimo interesse per attività di analisi, marketing B2B e sicurezza del sito;</li>
            <li>adempimento di obblighi legali in materia fiscale o amministrativa.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">4. Conservazione dei dati</h2>
          <p>
            I dati vengono conservati per 24 mesi ai fini di marketing, oppure fino alla revoca del consenso. I dati
            contrattuali vengono conservati per 10 anni, come previsto dalla normativa fiscale.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">5. Comunicazione e trasferimento dei dati</h2>
          <p>
            I dati personali potranno essere comunicati a fornitori esterni che supportano AYCL nella gestione tecnica e
            operativa del servizio (es. hosting, CRM, piattaforme email, analisi dati). Alcuni dati potrebbero essere
            trasferiti verso Paesi extra UE, come gli Stati Uniti, esclusivamente verso soggetti che rispettano le clausole
            contrattuali standard dell'Unione Europea o aderenti al Data Privacy Framework.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">6. Sicurezza e violazioni dei dati</h2>
          <p>
            AYCL adotta misure tecniche e organizzative adeguate (crittografia, autenticazione, backup sicuri) per proteggere
            i dati personali. In caso di violazione dei dati, il Titolare notificherà il Garante Privacy entro 72 ore.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">7. Diritti dell’interessato</h2>
          <p>L'utente può in qualsiasi momento esercitare i seguenti diritti:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>accedere ai propri dati;</li>
            <li>chiederne la rettifica o la cancellazione;</li>
            <li>limitare o opporsi al trattamento;</li>
            <li>richiedere la portabilità dei dati;</li>
            <li>proporre reclamo all’Autorità Garante.</li>
          </ul>
          <p>
            Le richieste possono essere inviate a <a href="mailto:Support@allyoucanleads.com" className="text-orange underline">Support@allyoucanleads.com</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">8. Responsabile o DPO</h2>
          <p>
            Attualmente AYCL non ha nominato un DPO (Data Protection Officer). Qualora la mole dei dati o la tipologia di
            trattamento lo richiedessero, il Titolare provvederà alla sua designazione.
          </p>
        </section>
      </PageLayoutContainer>
    </main>
  )
}
