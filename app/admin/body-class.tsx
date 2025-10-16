"use client";

import { useEffect } from "react";

export function AdminBodyClass() {
  useEffect(() => {
    document.body.classList.add("admin-layout");
    return () => {
      document.body.classList.remove("admin-layout");
    };
  }, []);

  return null;
}
