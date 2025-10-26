"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { DriveTestRequestForm } from './drive-test-request-form';

interface ReferralData {
  valid: boolean;
  seller_name: string;
  checkout_url: string;
}

export function CheckoutWithReferral() {
  const searchParams = useSearchParams();
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const ref = searchParams.get('ref');

  useEffect(() => {
    if (ref) {
      validateReferral(ref);
    }
  }, [ref]);

  const validateReferral = async (referralCode: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/referral/validate/${referralCode}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Codice referral non valido');
        } else {
          setError('Errore nella validazione del referral');
        }
        return;
      }

      const data = await response.json();
      setReferralData(data);
      
    } catch (error) {
      console.error('Referral validation error:', error);
      setError('Errore di connessione');
    } finally {
      setIsLoading(false);
    }
  };

  if (!ref) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Checkout Standard
        </h2>
        <p className="text-gray-600 mb-6">
          Sei arrivato qui senza un link referral. Utilizza il nostro calcolatore per creare un ordine personalizzato.
        </p>
        <div className="space-y-4">
          <a
            href="/#pacchetti"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Vai al Calcolatore
          </a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Validazione referral in corso...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Errore Referral
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <a
            href="/#pacchetti"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Vai al Calcolatore
          </a>
        </div>
      </div>
    );
  }

  if (!referralData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-green-900">
              Referral Valido
            </h3>
            <p className="text-green-700">
              Sei stato indirizzato da <strong>{referralData.seller_name}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Richiedi un Drive Test Personalizzato
          </h2>
          <p className="text-gray-600 mb-6">
            Compila il form per richiedere un Drive Test personalizzato per la tua azienda. 
            Il nostro team ti contatterà entro 24 ore per confermare i dettagli e fornirti un preventivo.
          </p>
          
          <DriveTestRequestForm 
            referralCode={ref} 
            onSuccess={() => setShowRequestForm(false)}
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cosa include il Drive Test?
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Analisi completa del tuo settore e mercato</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Strategia personalizzata per i tuoi obiettivi</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Report dettagliato con raccomandazioni</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Supporto dedicato durante tutto il processo</span>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Processo di Approvazione</h4>
            <p className="text-sm text-blue-800">
              La tua richiesta sarà esaminata dal nostro team. Ti contatteremo entro 24 ore 
              per confermare i dettagli e fornirti un preventivo personalizzato.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
