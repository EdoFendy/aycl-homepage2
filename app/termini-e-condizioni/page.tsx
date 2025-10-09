import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termini e Condizioni | All You Can Leads",
  description: "Condizioni d'uso del sito All You Can Leads e dei servizi di 4YOU 4YOUR FUTURE SOCIEDAD LTDA.",
}

export default function TermsPage() {
  return (
    <main className="bg-white py-16">
      <div className="container mx-auto max-w-4xl px-6 space-y-10 text-gray-800">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-gray-500">Ultimo aggiornamento: Ottobre 2025</p>
          <h1 className="text-4xl font-bold text-navy">Termini e Condizioni</h1>
          <p>
            Dominio: <a href="http://allyoucanleads.com" className="text-orange underline">http://allyoucanleads.com</a>
          </p>
          <p>Titolare del sito: 4YOU 4YOUR FUTURE SOCIEDAD LTDA</p>
          <p>Av. de Tirajana 39, Maspalomas, Gran Canaria (Spagna)</p>
          <p>
            Email: <a href="mailto:Support@allyoucanleads.com" className="text-orange underline">Support@allyoucanleads.com</a>
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">1. Premessa</h2>
          <p>
            Il presente documento disciplina l’uso del sito aycl.netlify.app ("Sito") e i rapporti contrattuali tra 4YOU 4YOUR
            FUTURE SOCIEDAD LTDA ("AYCL") e i clienti che acquistano o richiedono i servizi di generazione appuntamenti B2B.
          </p>
          <p>Accedendo o utilizzando il Sito, l’utente accetta integralmente le presenti condizioni.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">2. Oggetto del Servizio</h2>
          <p>
            AYCL fornisce servizi di outreach multicanale e generazione di appuntamenti B2B qualificati attraverso tre soluzioni
            principali:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Pacchetto Performance</li>
            <li>Pacchetto Subscription</li>
            <li>Pacchetto Set-Up Fee</li>
          </ul>
          <p>
            Ogni pacchetto è regolato da un contratto specifico sottoscritto digitalmente dal cliente, che prevale in caso di
            differenze rispetto a quanto riportato in questa pagina.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">3. Natura B2B e ambito di applicazione</h2>
          <p>
            I servizi AYCL sono rivolti esclusivamente a imprese e professionisti. Non sono destinati a consumatori privati e,
            pertanto, non si applicano le disposizioni del Codice del Consumo (D.Lgs. 206/2005).
          </p>
          <p>Il Cliente dichiara di agire nell’ambito della propria attività imprenditoriale o professionale.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">4. Acquisto e Pagamenti</h2>
          <p>L’utente può inviare richieste o acquistare un pacchetto direttamente tramite il Sito.</p>
          <p>
            Il pagamento avviene secondo le modalità stabilite nel contratto firmato, che definisce importi, durata della
            collaborazione, modalità di rinnovo e diritto di recesso.
          </p>
          <p>AYCL si riserva il diritto di sospendere o risolvere il servizio nei seguenti casi:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>mancato pagamento nei tempi concordati;</li>
            <li>uso improprio o illecito del servizio;</li>
            <li>violazione delle presenti condizioni.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">5. Responsabilità e limitazioni</h2>
          <p>
            AYCL si impegna a erogare i servizi con professionalità e secondo standard qualitativi elevati. Tuttavia, non
            garantisce risultati economici specifici, né la chiusura di contratti derivanti dagli appuntamenti generati.
          </p>
          <p>La responsabilità di AYCL è limitata all’importo complessivo versato dal Cliente per il servizio in corso.</p>
          <p>AYCL non potrà essere ritenuta responsabile per danni indiretti, perdita di profitto o opportunità commerciali.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">6. Proprietà intellettuale</h2>
          <p>
            Tutti i contenuti del Sito — testi, loghi, grafiche, immagini, marchi, software e layout — sono di proprietà di AYCL
            o dei rispettivi titolari. È vietata qualsiasi riproduzione, distribuzione o utilizzo non autorizzato.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">7. Riservatezza e dati aziendali</h2>
          <p>
            AYCL garantisce la massima riservatezza sui dati e documenti forniti dal Cliente. Le informazioni non saranno
            condivise con terze parti, salvo necessità tecniche di erogazione del servizio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">8. Trattamento dei dati personali</h2>
          <p>
            AYCL tratta i dati personali in conformità al Regolamento (UE) 2016/679 (GDPR). Le modalità di trattamento e i
            diritti dell’interessato sono descritti nella Privacy Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">9. Notifica di Data Breach</h2>
          <p>
            In caso di violazione dei dati personali (data breach), AYCL notificherà l’Autorità Garante entro 72 ore e informerà
            gli utenti qualora il rischio per i loro diritti e libertà sia ritenuto elevato.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-navy">10. Legge applicabile e foro competente</h2>
          <p>Le presenti condizioni sono regolate dalla legge italiana. Per ogni controversia sarà competente in via esclusiva il Foro di Milano.</p>
        </section>
      </div>
    </main>
  )
}
