import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | All You Can Leads",
  description: "Informativa sull'utilizzo dei cookie del sito aycl.netlify.app di 4YOU 4YOUR FUTURE SOCIEDAD LTDA.",
}

export default function CookiePolicyPage() {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-6 space-y-10 text-gray-800">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-navy">Cookie Policy</h1>
          <p>
            Il sito aycl.netlify.app utilizza cookie tecnici, analitici e di profilazione per garantire un’esperienza di
            navigazione ottimale e per finalità di marketing.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">1. Tipologie di cookie</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Cookie tecnici: necessari al funzionamento del sito e alla gestione delle sessioni utente.</li>
            <li>
              Cookie analitici: utilizzati per analizzare statistiche di traffico e comportamento degli utenti in forma anonima
              (es. Google Analytics).
            </li>
            <li>
              Cookie di marketing: impiegati per attività di remarketing e misurazione campagne (es. Meta Pixel, LinkedIn Insight
              Tag).
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">2. Gestione del consenso</h2>
          <p>Al primo accesso al sito viene mostrato un banner che permette di:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>accettare tutti i cookie;</li>
            <li>rifiutare i cookie di profilazione;</li>
            <li>personalizzare le preferenze.</li>
          </ul>
          <p>I cookie di profilazione e marketing vengono installati solo dopo il consenso esplicito dell’utente.</p>
          <p>
            Il consenso può essere modificato o revocato in qualsiasi momento cliccando su “Gestisci preferenze cookie” nel
            footer del sito.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">3. Disattivazione manuale dei cookie</h2>
          <p>
            Gli utenti possono disabilitare i cookie direttamente dal proprio browser (Chrome, Edge, Safari, Firefox). La
            disattivazione dei cookie tecnici potrebbe limitare alcune funzionalità del sito.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">4. Strumenti e fornitori utilizzati</h2>
          <p>AYCL utilizza strumenti conformi al GDPR, tra cui:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Google Analytics e Tag Manager per analisi statistiche anonime;</li>
            <li>Meta Pixel (Facebook e Instagram) per campagne di remarketing;</li>
            <li>LinkedIn Insight Tag per monitoraggio e advertising B2B.</li>
          </ul>
          <p>Tutti i dati raccolti sono pseudonimizzati e non consentono l’identificazione diretta degli utenti.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">5. Riferimenti normativi</h2>
          <p>La presente Cookie Policy è redatta in conformità con:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Regolamento UE 2016/679 (GDPR);</li>
            <li>Direttiva 2002/58/CE (ePrivacy);</li>
            <li>Linee Guida del Garante Privacy Italiano 2021–2024.</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
