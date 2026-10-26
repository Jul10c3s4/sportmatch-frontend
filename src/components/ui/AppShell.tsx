"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Sidebar } from "@/components/ui/Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
<<<<<<< HEAD

  if (pathname === "/") {
=======
  const isAuthenticationRoute = pathname === "/" || pathname === "/login" || pathname === "/cadastro";

  if (isAuthenticationRoute) {
>>>>>>> ec0f525a981f6f5f11b189629feab9126b09e577
    return children;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[1500px] bg-[#f4f5f7] shadow-[0_0_0_1px_rgba(15,23,42,0.04)]">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> ec0f525a981f6f5f11b189629feab9126b09e577
