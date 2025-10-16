'use server';

import { z } from "zod";
import {
  createAdminSession,
  createAdminUser,
  getAdminUsersCount,
  verifyCredentials,
} from "@/lib/admin/auth";
import { clearSessionCookie, setSessionCookie } from "@/lib/admin/session";
import { normalizeFormData } from "@/lib/form-data";

const credentialsSchema = z.object({
  email: z.string().email("Inserisci un'email valida."),
  password: z.string().min(6, "La password deve avere almeno 6 caratteri."),
});

export async function loginAction(_: unknown, formData: FormData) {
  const values = normalizeFormData(formData);
  const credentials = credentialsSchema.safeParse({
    email: values.email,
    password: values.password,
  });

  if (!credentials.success) {
    return {
      success: false,
      message: credentials.error.issues[0]?.message ?? "Credenziali non valide.",
    };
  }

  const user = verifyCredentials(credentials.data.email, credentials.data.password);
  if (!user) {
    return {
      success: false,
      message: "Email o password non corretti.",
    };
  }

  const token = createAdminSession(user.id);
  setSessionCookie(token);

  return { success: true };
}

export async function createFirstAdminAction(_: unknown, formData: FormData) {
  if (getAdminUsersCount() > 0) {
    return {
      success: false,
      message: "L'amministratore esiste già.",
    };
  }

  const values = normalizeFormData(formData);
  const credentials = credentialsSchema.safeParse({
    email: values.email,
    password: values.password,
  });

  if (!credentials.success) {
    return {
      success: false,
      message: credentials.error.issues[0]?.message ?? "Dati non validi.",
    };
  }

  try {
    const user = createAdminUser(credentials.data.email, credentials.data.password);
    const token = createAdminSession(user.id);
    setSessionCookie(token);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Impossibile creare l'utente.",
    };
  }
}

export async function logoutAction() {
  clearSessionCookie();
  return { success: true };
}
