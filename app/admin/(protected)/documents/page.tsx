"use client";

/**
 * Pagina di generazione documenti (Preventivi) per il pannello admin
 *
 * Questa pagina consente di:
 * - Creare preventivi personalizzati con tutti i dettagli necessari
 * - Aggiungere articoli/servizi dinamicamente con calcolo automatico dei totali
 * - Visualizzare un'anteprima live del documento PDF
 * - Esportare il preventivo in formato PDF con layout professionale
 *
 * Il layout rispetta fedelmente lo stile specificato con:
 * - Colori brand: #0F2C59 (navy), #5D86FF (sky blue), #F4A62A (orange)
 * - Formato A4 (210mm x 297mm)
 * - Formattazione italiana per date e valute
 * - Design responsive e personalizzabile
 */

import { useState, useMemo } from "react";
import { DocumentForm } from "./document-form";
import { DocumentPreview } from "./document-preview";
import { FileText } from "lucide-react";

export type DocumentFormData = {
  numero: string;
  data: string;
  cliente: {
    nome: string;
    indirizzo: string;
  };
  articoli: { id: number; descrizione: string; quantita: number; prezzo: number }[];
  aliquotaIVA: number;
  showIVA: boolean;
  termini: string;
  dataFirma: string;
};

export type Totali = {
  subtotale: number;
  iva: number;
  totale: number;
};

export default function AdminDocumentsPage() {
  const [formData, setFormData] = useState<DocumentFormData>({
    numero: "",
    data: new Date().toISOString().split("T")[0],
    cliente: {
      nome: "",
      indirizzo: "",
    },
    articoli: [{ id: 1, descrizione: "", quantita: 1, prezzo: 0 }],
    aliquotaIVA: 22,
    showIVA: true,
    termini:
      "Il pagamento dovrà essere effettuato entro 30 giorni dalla data di emissione del preventivo. I prezzi indicati si intendono IVA esclusa. La validità del presente preventivo è di 30 giorni dalla data di emissione.",
    dataFirma: new Date().toISOString().split("T")[0],
  });

  // Calcolo totali
  const totali = useMemo<Totali>(() => {
    const subtotale = formData.articoli.reduce(
      (acc, art) => acc + art.quantita * art.prezzo,
      0
    );
    const iva = formData.showIVA ? (subtotale * formData.aliquotaIVA) / 100 : 0;
    const totale = subtotale + iva;
    return { subtotale, iva, totale };
  }, [formData.articoli, formData.aliquotaIVA, formData.showIVA]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Genera Documenti</h1>
          <p className="text-sm text-slate-400">
            Crea e gestisci preventivi personalizzati per i tuoi clienti.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <DocumentForm formData={formData} setFormData={setFormData} totali={totali} />
        <DocumentPreview formData={formData} totali={totali} />
      </div>
    </div>
  );
}

