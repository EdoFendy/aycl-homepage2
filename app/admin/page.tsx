import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin/session";
import { getAdminUsersCount } from "@/lib/admin/auth";
import { LoginPanel } from "@/app/admin/login-panel";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) {
    redirect("/admin/dashboard");
  }

  const hasAdmin = getAdminUsersCount() > 0;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(79,70,229,0.2),_transparent_55%)]" />
      <div className="relative z-10 flex w-full flex-col items-center gap-6 px-4">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
            AYCL Admin
          </span>
          <h2 className="text-3xl font-semibold text-white">Pannello di controllo</h2>
          <p className="text-sm text-slate-300">
            Accedi per gestire pacchetti, pagamenti e collegamenti a WooCommerce.
          </p>
        </div>

        <LoginPanel hasAdmin={hasAdmin} />
      </div>
    </div>
  );
}
