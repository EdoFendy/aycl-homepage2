import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  LegalPageLayout,
  type LegalSectionConfig,
} from "@/components/legal/legal-page-layout"

export const metadata: Metadata = {
  title: "Termini e Condizioni | All You Can Leads",
  description: "Condizioni d'uso del sito All You Can Leads e dei servizi di 4YOU 4YOUR FUTURE SOCIEDAD LTDA.",
}

export default function TermsPage() {
  const sections: LegalSectionConfig[] = [
    {
      id: "premessa",
      title: "1. Premessa",
      content: (
        <div className="space-y-4">
          <p>
            Il presente documento disciplina l&apos;uso del sito aycl.netlify.app (&ldquo;Sito&rdquo;) e i rapporti contrattuali tra 4YOU 4YOUR
            FUTURE SOCIEDAD LTDA (&ldquo;AYCL&rdquo;) e i clienti che acquistano o richiedono i servizi di generazione appuntamenti B2B.
          </p>
          <p>Accedendo o utilizzando il Sito, l&apos;utente accetta integralmente le presenti condizioni.</p>
        </div>
      ),
    },
    {
      id: "oggetto-servizio",
      title: "2. Oggetto del servizio",
      content: (
        <div className="space-y-4">
          <p>
            AYCL fornisce servizi di outreach multicanale e generazione di appuntamenti B2B qualificati attraverso tre soluzioni
            principali:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Pacchetto Performance</li>
            <li>Pacchetto Subscription</li>
            <li>Pacchetto Set-Up Fee</li>
          </ul>
          <p>
            Ogni pacchetto è regolato da un contratto specifico sottoscritto digitalmente dal cliente, che prevale in caso di
            differenze rispetto a quanto riportato in questa pagina.
          </p>
        </div>
      ),
    },
    {
      id: "ambito",
      title: "3. Natura B2B e ambito di applicazione",
      content: (
        <div className="space-y-4">
          <p>
            I servizi AYCL sono rivolti esclusivamente a imprese e professionisti. Non sono destinati a consumatori privati e,
            pertanto, non si applicano le disposizioni del Codice del Consumo (D.Lgs. 206/2005).
          </p>
          <p>Il Cliente dichiara di agire nell&apos;ambito della propria attività imprenditoriale o professionale.</p>
        </div>
      ),
    },
    {
      id: "pagamenti",
      title: "4. Acquisto e pagamenti",
      content: (
        <div className="space-y-4">
          <p>L&apos;utente può inviare richieste o acquistare un pacchetto direttamente tramite il Sito.</p>
          <p>
            Il pagamento avviene secondo le modalità stabilite nel contratto firmato, che definisce importi, durata della
            collaborazione, modalità di rinnovo e diritto di recesso.
          </p>
          <p>AYCL si riserva il diritto di sospendere o risolvere il servizio nei seguenti casi:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>mancato pagamento nei tempi concordati;</li>
            <li>uso improprio o illecito del servizio;</li>
            <li>violazione delle presenti condizioni.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "responsabilita",
      title: "5. Responsabilità e limitazioni",
      content: (
        <div className="space-y-4">
          <p>
            AYCL si impegna a erogare i servizi con professionalità e secondo standard qualitativi elevati. Tuttavia, non
            garantisce risultati economici specifici né la chiusura di contratti derivanti dagli appuntamenti generati.
          </p>
          <p>La responsabilità di AYCL è limitata all&apos;importo complessivo versato dal Cliente per il servizio in corso.</p>
          <p>AYCL non potrà essere ritenuta responsabile per danni indiretti, perdita di profitto o opportunità commerciali.</p>
        </div>
      ),
    },
    {
      id: "proprieta-intellettuale",
      title: "6. Proprietà intellettuale",
      content: (
        <p>
          Tutti i contenuti del Sito — testi, loghi, grafiche, immagini, marchi, software e layout — sono di proprietà di AYCL o
          dei rispettivi titolari. È vietata qualsiasi riproduzione, distribuzione o utilizzo non autorizzato.
        </p>
      ),
    },
    {
      id: "riservatezza",
      title: "7. Riservatezza e dati aziendali",
      content: (
        <p>
          AYCL garantisce la massima riservatezza sui dati e documenti forniti dal Cliente. Le informazioni non saranno
          condivise con terze parti, salvo necessità tecniche di erogazione del servizio.
        </p>
      ),
    },
    {
      id: "dati-personali",
      title: "8. Trattamento dei dati personali",
      content: (
        <p>
          AYCL tratta i dati personali in conformità al Regolamento (UE) 2016/679 (GDPR). Le modalità di trattamento e i diritti
          dell’interessato sono descritti nella Privacy Policy.
        </p>
      ),
    },
    {
      id: "data-breach",
      title: "9. Notifica di data breach",
      content: (
        <p>
          In caso di violazione dei dati personali (data breach), AYCL notificherà l’Autorità Garante entro 72 ore e informerà
          gli utenti qualora il rischio per i loro diritti e libertà sia ritenuto elevato.
        </p>
      ),
    },
    {
      id: "legge-foro",
      title: "10. Legge applicabile e foro competente",
      content: (
        <p>
          Le presenti condizioni sono regolate dalla legge italiana. Per ogni controversia sarà competente in via esclusiva il
          Foro di Milano.
        </p>
      ),
    },
  ]

  return (
    <LegalPageLayout
      hero={{
        eyebrow: "COMPLIANCE HUB",
        title: "Termini e Condizioni",
        subtitle: "Il quadro contrattuale dei servizi AYCL",
        description: (
          <div className="space-y-4">
            <p>
              Dominio: <a href="https://allyoucanleads.com" className="text-orange underline">allyoucanleads.com</a>
            </p>
            <p>Titolare: 4YOU 4YOUR FUTURE SOCIEDAD LTDA – Av. de Tirajana 39, Maspalomas, Gran Canaria (Spagna).</p>
            <p>
              Email di contatto: <a href="mailto:Support@allyoucanleads.com" className="text-orange underline">Support@allyoucanleads.com</a>
            </p>
          </div>
        ),
        lastUpdated: "Ultimo aggiornamento: Ottobre 2025",
        highlight: "Contratti B2B gestiti con firma digitale certificata",
        actions: (
          <Link href="/contattaci">
            <Button className="bg-orange text-white hover:bg-orange/90">Richiedi una consulenza</Button>
          </Link>
        ),
      }}
      sections={sections}
    />
  )
}
