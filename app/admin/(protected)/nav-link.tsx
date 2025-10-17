"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  Link2,
  FileText,
} from "lucide-react";

type AdminNavLinkProps = {
  href: string;
  label: string;
  icon: string;
};

const iconMap = {
  LayoutDashboard,
  Package,
  CreditCard,
  Link2,
  FileText,
};

export function AdminNavLink({ href, label, icon }: AdminNavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(`${href}/`);
  const IconComponent = iconMap[icon as keyof typeof iconMap];

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-slate-800 text-white shadow"
          : "text-slate-300 hover:bg-slate-800/40 hover:text-white"
      )}
    >
      <IconComponent className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}
