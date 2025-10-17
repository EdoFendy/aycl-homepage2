import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { getCurrentAdmin } from "@/lib/admin/session";
import { AdminNavLink } from "@/app/admin/(protected)/nav-link";
import { LogoutButton } from "@/app/admin/(protected)/logout-button";

const navigation = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
  },
  {
    href: "/admin/products",
    label: "Prodotti",
    icon: "Package",
  },
  {
    href: "/admin/payments",
    label: "Pagamenti",
    icon: "CreditCard",
  },
  {
    href: "/admin/payments/create",
    label: "Crea pagamento",
    icon: "Link2",
  },
];

export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-72 flex-col border-r border-slate-800/80 bg-slate-950/70 p-6 lg:flex">
        <div className="space-y-2">
          <Link href="/admin/dashboard" className="text-lg font-semibold text-white">
            AYCL Console
          </Link>
          <p className="text-xs text-slate-400">Gestione interna pagamenti e prodotti.</p>
        </div>

        <nav className="mt-8 space-y-1">
          {navigation.map((item) => (
            <AdminNavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <div className="rounded-xl border border-slate-800/70 bg-slate-900/70 p-4">
            <p className="text-xs text-slate-400">Connesso come</p>
            <p className="text-sm font-medium text-white">{admin.email}</p>
          </div>

          <LogoutButton className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800">
            <LogOut className="h-4 w-4" />
            Esci
          </LogoutButton>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-800/70 bg-slate-950/60 px-6 py-4 backdrop-blur lg:hidden">
          <div>
            <h1 className="text-lg font-semibold text-white">AYCL Console</h1>
            <p className="text-xs text-slate-400">{admin.email}</p>
          </div>
          <LogoutButton className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200">
            <LogOut className="h-4 w-4" />
            Esci
          </LogoutButton>
        </header>
        <main className="min-h-screen bg-slate-900/40 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
