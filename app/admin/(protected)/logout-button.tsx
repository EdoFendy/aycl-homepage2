"use client";

import type { PropsWithChildren } from "react";
import { useTransition } from "react";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

type LogoutButtonProps = PropsWithChildren<{
  className?: string;
}>;

export function LogoutButton({ className, children }: LogoutButtonProps) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        startTransition(async () => {
          await logoutAction();
        });
      }}
      className={cn(className, pending && "opacity-70")}
      disabled={pending}
    >
      {children}
    </button>
  );
}
