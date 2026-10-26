"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Sidebar } from "@/components/ui/Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  if (pathname === "/") {
    return children;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[1500px] bg-[#f4f5f7] shadow-[0_0_0_1px_rgba(15,23,42,0.04)]">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
