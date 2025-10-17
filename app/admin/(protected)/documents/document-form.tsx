"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import { Plus, X, Calendar, User, MapPin, Percent, FileText, Check } from "lucide-react";
import type { DocumentFormData, Totali } from "./page";

type DocumentFormProps = {
  formData: DocumentFormData;
  setFormData: Dispatch<SetStateAction<DocumentFormData>>;
  totali: Totali;
};

export function DocumentForm({ formData, setFormData, totali }: DocumentFormProps) {
  const [showArticoliPredefiniti, setShowArticoliPredefiniti] = useState(false);

  // Articoli predefiniti
  const articoliPredefiniti = [
    { descrizione: "Consulenza strategica", prezzo: 150 },
    { descrizione: "Analisi del mercato", prezzo: 200 },
    { descrizione: "Setup CRM", prezzo: 300 },
    { descrizione: "Campagna marketing", prezzo: 500 },
    { descrizione: "Formazione team", prezzo: 250 },
    { descrizione: "Supporto tecnico", prezzo: 100 },
  ];
  // Gestione input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev: DocumentFormData) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof DocumentFormData] as object),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev: DocumentFormData) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Gestione articoli
  const handleArticoloChange = (index: number, field: string, value: string | number) => {
    const nuoviArticoli = [...formData.articoli];
    nuoviArticoli[index] = {
      ...nuoviArticoli[index],
      [field]: field === "quantita" || field === "prezzo" ? parseFloat(value as string) || 0 : value,
    };
    setFormData((prev: DocumentFormData) => ({ ...prev, articoli: nuoviArticoli }));
  };

  const aggiungiArticolo = () => {
    setFormData((prev: DocumentFormData) => ({
      ...prev,
      articoli: [
        ...prev.articoli,
        {
          id: prev.articoli.length + 1,
          descrizione: "",
          quantita: 1,
          prezzo: 0,
        },
      ],
    }));
  };

  const rimuoviArticolo = (index: number) => {
    if (formData.articoli.length > 1) {
      const nuoviArticoli = formData.articoli.filter((_: any, i: number) => i !== index);
      setFormData((prev: DocumentFormData) => ({ ...prev, articoli: nuoviArticoli }));
    }
  };

  const aggiungiArticoloPredefinito = (articolo: { descrizione: string; prezzo: number }) => {
    setFormData((prev: DocumentFormData) => ({
      ...prev,
      articoli: [
        ...prev.articoli,
        {
          id: prev.articoli.length + 1,
          descrizione: articolo.descrizione,
          quantita: 1,
          prezzo: articolo.prezzo,
        },
      ],
    }));
  };

  // Formattazione italiana per numeri
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
        <FileText className="h-5 w-5 text-sky-400" />
        Dati Preventivo
      </h2>

      <div className="space-y-5">
        {/* Numero e Data */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <FileText className="h-4 w-4 text-slate-400" />
              Numero Preventivo
            </label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              placeholder="Es: 2024-001"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Calendar className="h-4 w-4 text-slate-400" />
              Data
            </label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-white transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>

        {/* Cliente */}
        <div className="space-y-4 rounded-2xl border border-slate-800/50 bg-slate-900/40 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <User className="h-4 w-4 text-sky-400" />
            Informazioni Cliente
          </h3>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400">Nome Cliente</label>
            <input
              type="text"
              name="cliente.nome"
              value={formData.cliente.nome}
              onChange={handleInputChange}
              placeholder="Nome del cliente"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder-slate-500 transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/20"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <MapPin className="h-3 w-3" />
              Indirizzo Cliente
            </label>
            <input
              type="text"
              name="cliente.indirizzo"
              value={formData.cliente.indirizzo}
              onChange={handleInputChange}
              placeholder="Via, Città, CAP"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder-slate-500 transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/20"
            />
          </div>
        </div>

        {/* Articoli */}
        <div className="space-y-4 rounded-2xl border border-slate-800/50 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">Articoli / Servizi</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowArticoliPredefiniti(!showArticoliPredefiniti)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-400"
              >
                <FileText className="h-3.5 w-3.5" />
                Predefiniti
              </button>
              <button
                onClick={aggiungiArticolo}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-400"
              >
                <Plus className="h-3.5 w-3.5" />
                Nuovo
              </button>
            </div>
          </div>

          {/* Articoli Predefiniti */}
          {showArticoliPredefiniti && (
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
              <h4 className="mb-3 text-xs font-semibold text-slate-300">Seleziona articoli predefiniti:</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {articoliPredefiniti.map((articolo, index) => (
                  <button
                    key={index}
                    onClick={() => aggiungiArticoloPredefinito(articolo)}
                    className="flex items-center justify-between rounded-lg border border-slate-600 bg-slate-700/50 p-2 text-left text-xs transition hover:bg-slate-600/50"
                  >
                    <div>
                      <div className="font-medium text-slate-200">{articolo.descrizione}</div>
                      <div className="text-slate-400">{formatCurrency(articolo.prezzo)}</div>
                    </div>
                    <Plus className="h-3 w-3 text-sky-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {formData.articoli.map((articolo: any, index: number) => (
              <div
                key={articolo.id}
                className="group relative rounded-xl border border-slate-800/50 bg-slate-950/60 p-3 transition hover:border-slate-700"
              >
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400">Descrizione</label>
                    <input
                      type="text"
                      placeholder="Inserisci descrizione articolo o servizio"
                      value={articolo.descrizione}
                      onChange={(e) => handleArticoloChange(index, "descrizione", e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder-slate-500 transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400">Quantità</label>
                      <input
                        type="number"
                        placeholder="1"
                        value={articolo.quantita}
                        onChange={(e) => handleArticoloChange(index, "quantita", e.target.value)}
                        min="1"
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder-slate-500 transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/20"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-400">Prezzo (€)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={articolo.prezzo}
                        onChange={(e) => handleArticoloChange(index, "prezzo", e.target.value)}
                        step="0.01"
                        min="0"
                        className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder-slate-500 transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/20"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-slate-900/60 px-3 py-2 text-xs">
                    <span className="text-slate-400">Totale riga:</span>
                    <span className="font-semibold text-sky-300">
                      {formatCurrency(articolo.quantita * articolo.prezzo)}
                    </span>
                  </div>
                </div>

                {formData.articoli.length > 1 && (
                  <button
                    onClick={() => rimuoviArticolo(index)}
                    className="absolute right-2 top-2 rounded-lg bg-rose-500/10 p-1.5 text-rose-400 opacity-0 transition hover:bg-rose-500/20 group-hover:opacity-100"
                    title="Rimuovi articolo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Aliquota IVA */}
        <div className="space-y-4 rounded-2xl border border-slate-800/50 bg-slate-900/40 p-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="showIVA"
              name="showIVA"
              checked={formData.showIVA}
              onChange={(e) => setFormData((prev: DocumentFormData) => ({ ...prev, showIVA: e.target.checked }))}
              className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-sky-500 focus:ring-sky-500 focus:ring-offset-0"
            />
            <label htmlFor="showIVA" className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Percent className="h-4 w-4 text-slate-400" />
              Includi IVA nel preventivo
            </label>
          </div>
          
          {formData.showIVA && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">Aliquota IVA (%)</label>
              <input
                type="number"
                name="aliquotaIVA"
                value={formData.aliquotaIVA}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/20"
              />
            </div>
          )}
        </div>

        {/* Totali Summary */}
        <div className="rounded-2xl border border-sky-800/30 bg-sky-950/20 p-6">
          <h3 className="mb-4 text-sm font-semibold text-sky-300">Riepilogo Totali</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-400">Subtotale:</span>
              <span className="font-semibold text-white text-base">{formatCurrency(totali.subtotale)}</span>
            </div>
            {formData.showIVA && (
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">IVA ({formData.aliquotaIVA}%):</span>
                <span className="font-semibold text-white text-base">{formatCurrency(totali.iva)}</span>
              </div>
            )}
            <div className="flex justify-between items-center border-t border-sky-800/30 pt-3 mt-3">
              <span className="font-semibold text-sky-300 text-base">Totale:</span>
              <span className="text-xl font-bold text-sky-300">{formatCurrency(totali.totale)}</span>
            </div>
          </div>
        </div>

        {/* Termini e Condizioni */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Termini e Condizioni</label>
          <textarea
            name="termini"
            value={formData.termini}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        {/* Data Firma */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Calendar className="h-4 w-4 text-slate-400" />
            Data Firma
          </label>
          <input
            type="date"
            name="dataFirma"
            value={formData.dataFirma}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-white transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
      </div>
    </div>
  );
}

