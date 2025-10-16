import type { ReactNode } from "react";
import type { Metadata } from "next";
import { AdminBodyClass } from "@/app/admin/body-class";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "AYCL Admin",
  description: "Pannello amministrazione pagamenti AYCL.",
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-shell min-h-screen bg-slate-950 text-slate-100">
      <AdminBodyClass />
      <Toaster position="top-right" richColors duration={4200} />
      {children}
    </div>
  );
}
