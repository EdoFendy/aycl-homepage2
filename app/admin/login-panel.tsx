"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useMemo } from "react";
import { loginAction, createFirstAdminAction } from "@/app/admin/actions";

type FormState = {
  success: boolean;
  message?: string;
};

const initialState: FormState = {
  success: false,
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Attendere..." : label}
    </button>
  );
}

export function LoginPanel({ hasAdmin }: { hasAdmin: boolean }) {
  const action = useMemo(() => (hasAdmin ? loginAction : createFirstAdminAction), [hasAdmin]);
  const [state, formAction] = useFormState(action, initialState);

  return (
    <div className="w-full max-w-md space-y-6 rounded-3xl bg-slate-900/80 p-8 shadow-2xl backdrop-blur">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">
          {hasAdmin ? "Accesso amministratore" : "Crea l'account amministratore"}
        </h1>
        <p className="text-sm text-slate-300">
          {hasAdmin
            ? "Inserisci le tue credenziali per gestire pagamenti, prodotti e transazioni."
            : "Imposta il primo amministratore per iniziare a generare i link di pagamento."}
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-slate-200">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={hasAdmin ? "current-password" : "new-password"}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {state?.message ? (
          <div className="rounded-lg border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {state.message}
          </div>
        ) : null}

        <SubmitButton label={hasAdmin ? "Accedi" : "Crea e accedi"} />

        <p className="text-xs text-slate-500">
          {hasAdmin
            ? "Hai dimenticato la password? Contatta un altro amministratore per il ripristino."
            : "Ricorda di salvare queste credenziali in un luogo sicuro."}
        </p>
      </form>
    </div>
  );
}
