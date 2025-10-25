"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const driveTestRequestSchema = z.object({
  customer_name: z.string().min(2, 'Nome obbligatorio'),
  customer_email: z.string().email('Email non valida'),
  customer_phone: z.string().optional(),
  company_name: z.string().optional(),
  notes: z.string().optional()
});

type DriveTestRequestForm = z.infer<typeof driveTestRequestSchema>;

interface DriveTestRequestFormProps {
  referralCode: string;
  onSuccess?: () => void;
}

export function DriveTestRequestForm({ referralCode, onSuccess }: DriveTestRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<DriveTestRequestForm>({
    resolver: zodResolver(driveTestRequestSchema),
    defaultValues: {
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      company_name: '',
      notes: ''
    }
  });

  const onSubmit = async (data: DriveTestRequestForm) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/checkout-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          referral_code: referralCode,
          request_type: 'drive_test',
          product_data: {
            type: 'drive_test',
            name: 'Drive Test Personalizzato',
            description: 'Richiesta di Drive Test personalizzato'
          },
          pricing_data: {
            base_price: 0,
            final_price: 0,
            currency: 'EUR'
          },
          ...data
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nella richiesta');
      }

      toast.success('Richiesta Drive Test inviata con successo!');
      form.reset();
      onSuccess?.();
      
    } catch (error: any) {
      toast.error(error.message || 'Errore nell\'invio della richiesta');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Richiedi un Drive Test Personalizzato
        </h2>
        <p className="text-gray-600">
          Compila il form per richiedere un Drive Test personalizzato per la tua azienda
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customer_name">Nome *</Label>
            <Input
              id="customer_name"
              {...form.register('customer_name')}
              placeholder="Mario Rossi"
            />
            {form.formState.errors.customer_name && (
              <p className="text-sm text-red-600">{form.formState.errors.customer_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer_email">Email *</Label>
            <Input
              id="customer_email"
              type="email"
              {...form.register('customer_email')}
              placeholder="mario.rossi@azienda.com"
            />
            {form.formState.errors.customer_email && (
              <p className="text-sm text-red-600">{form.formState.errors.customer_email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customer_phone">Telefono</Label>
            <Input
              id="customer_phone"
              {...form.register('customer_phone')}
              placeholder="+39 123 456 7890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name">Azienda</Label>
            <Input
              id="company_name"
              {...form.register('company_name')}
              placeholder="Nome della tua azienda"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Note aggiuntive</Label>
          <Textarea
            id="notes"
            {...form.register('notes')}
            placeholder="Descrivi le tue esigenze specifiche per il Drive Test..."
            rows={4}
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Cosa succede dopo?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Il nostro team esaminerà la tua richiesta</li>
            <li>• Ti contatteremo entro 24 ore per confermare i dettagli</li>
            <li>• Riceverai un preventivo personalizzato per il Drive Test</li>
            <li>• Potrai procedere con il pagamento in modo sicuro</li>
          </ul>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta Drive Test'}
        </Button>
      </form>
    </div>
  );
}
