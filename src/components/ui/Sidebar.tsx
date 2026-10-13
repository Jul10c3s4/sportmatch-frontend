"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Pesquisar", href: "/pesquisa", icon: "search" },
  { label: "Nova Competição", href: "/competicoes/nova", icon: "trophy" },
  { label: "Notificações", href: "/notificacoes", icon: "bell" },
  { label: "Perfil", href: "/perfil", icon: "user" },
];

function Icon({ name }: { name: string }) {
  const size = 18;
  const icons: Record<string, ReactNode> = {
    home: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="5.5" />
        <path d="M16 16 21 21" />
      </svg>
    ),
    trophy: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 4h8v2a4 4 0 0 1-8 0V4Z" />
        <path d="M8 4H5a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4h1" />
        <path d="M16 4h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4h-1" />
        <path d="M12 12v4" />
        <path d="M9 20h6" />
      </svg>
    ),
    bell: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
        <path d="M10 20a2 2 0 0 0 4 0" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21a8 8 0 1 0-16 0" />
        <circle cx="12" cy="8" r="4" />
      </svg>
    ),
  };

  return icons[name] ?? null;
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[240px] flex-col justify-between border-r border-[#dfe3e8] bg-[#f7f7f8] px-4 py-5">
      <div>
        <div className="mb-8 flex items-center px-3">
          <Image
            src="/Logo%20Container.svg"
            alt="Logo SportMatch"
            width={160}
            height={48}
            priority
            className="h-12 w-auto"
          />
        </div>

        <nav aria-label="Menu principal" className="space-y-2">
          {navigation.map(({ label, href, icon }) => {
            const isActive = pathname === href || (href === "/competicoes/nova" && pathname.startsWith("/competicoes"));

            return (
              <Link
                key={label}
                href={href}
                className={[
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-base font-medium transition",
                  isActive ? "bg-[#f2e1d3] text-[#1f2937] ring-1 ring-[#ecae78]" : "text-[#4a5565] hover:bg-[#eef2f4]",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={isActive ? "text-[#f39a4f]" : "text-[#5d6875]"}>
                  <Icon name={icon} />
                </span>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-[#eef2f4] px-3 py-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f2d6b0,#8e5a2d)] text-sm font-semibold text-white">
          JS
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1f2937]">João Silva</p>
          <p className="text-xs text-[#6b7280]">Arapiraca, AL</p>
        </div>
      </div>
    </aside>
  );
}
