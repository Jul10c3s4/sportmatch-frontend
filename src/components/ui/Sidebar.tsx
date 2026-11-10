"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Home", href: "/dashboard", icon: "home" },
  { label: "Minhas competições", href: "/minhas-competicoes", icon: "trophy" },
  { label: "Pesquisar", href: "/pesquisa", icon: "search" },
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
    trophy: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 3h8v7a4 4 0 0 1-8 0V3Z" />
        <path d="M8 5H5v3a4 4 0 0 0 4 4m7-7h3v3a4 4 0 0 1-4 4" />
        <path d="M12 14v4m-4 3h8m-7-3h6" />
      </svg>
    ),
  };

  return icons[name] ?? null;
}

type TipoUsuario = "atleta" | "organizador" | "locador";

function obterPerfilUsuario() {
  if (typeof window === "undefined") {
    return { email: "joao@sportmatch.com", tipoUsuario: "organizador" as TipoUsuario };
  }

  try {
    const usuarioSalvo = window.localStorage.getItem("sportmatch-user");
    if (!usuarioSalvo) {
      return { email: "joao@sportmatch.com", tipoUsuario: "organizador" as TipoUsuario };
    }

    const usuario = JSON.parse(usuarioSalvo) as { email?: string; tipoUsuario?: TipoUsuario };

    return {
      email: usuario.email ?? "joao@sportmatch.com",
      tipoUsuario: usuario.tipoUsuario ?? "organizador",
    };
  } catch {
    return { email: "joao@sportmatch.com", tipoUsuario: "organizador" as TipoUsuario };
  }
}

export function Sidebar() {
  const pathname = usePathname();
  const perfil = obterPerfilUsuario();
  const roleLabel = perfil.tipoUsuario === "organizador" ? "Organizador" : perfil.tipoUsuario === "locador" ? "Locador" : "Atleta";

  if (pathname === "/" || pathname === "/cadastro" || pathname === "/login") {
    return null;
  }

  return (
    <aside className="shrink-0 border-b border-[#e2e8f0] bg-white px-4 py-3 md:sticky md:top-0 md:h-screen md:w-[166px] md:border-b-0 md:border-r md:px-3.5 md:py-4">
      <div className="flex items-center justify-between gap-4 md:block">
        <Link href="/dashboard" aria-label="SportMatch - página inicial" className="inline-flex min-h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]">
          <Image
            src="/Logo%20Container.svg"
            alt="SportMatch"
            width={160}
            height={48}
            priority
            className="h-9 w-auto md:h-8 md:max-w-[134px]"
          />
        </Link>

        <nav aria-label="Menu principal" className="flex gap-1 overflow-x-auto md:mt-4 md:flex-col md:gap-1.5">
          {navigation.map(({ label, href, icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                className={[
                  "flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] md:w-full",
                  isActive ? "bg-[#fff7f2] text-[#9a3412]" : "text-[#0b2f4f] hover:bg-[#f1f5f9]",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={isActive ? "text-[#c2410c]" : "text-[#0b2f4f]"}>
                  <Icon name={icon} />
                </span>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-5 hidden items-center gap-2 md:flex">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f2d6b0,#8e5a2d)] text-xs font-semibold text-white">
          {perfil.email.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold text-[#0b2f4f]">João Silva</p>
          <p className="truncate text-[9px] text-[#475569]">{roleLabel}</p>
        </div>
      </div>
    </aside>
  );
}
