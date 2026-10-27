"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { CompeticaoCard } from "@/features/competicao/components/CompeticaoCard";
import { competicoesMock } from "@/features/competicao/services/competicoes.mock";
import type { CompeticaoDetalhe } from "@/features/competicao/types/competicaoDetalhe";

function obterCidade(cidadeCompleta: string): string {
  return cidadeCompleta.split(",").at(-1)?.replace(" - AL", "").trim() ?? cidadeCompleta;
}

function IconeBusca() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function IconeNotificacao() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function IconeSecao({ trofeu = false }: { trofeu?: boolean }) {
  return trofeu ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-[#c2410c]" fill="currentColor">
      <path d="M7 3h10v2h4v3a5 5 0 0 1-4.3 4.95A6 6 0 0 1 13 16.9V19h4v2H7v-2h4v-2.1a6 6 0 0 1-3.7-3.95A5 5 0 0 1 3 8V5h4V3Zm10 4v3.86A3 3 0 0 0 19 8V7h-2ZM5 7v1a3 3 0 0 0 2 2.86V7H5Z" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-[#c2410c]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function correspondeBusca(competicao: CompeticaoDetalhe, termo: string): boolean {
  const texto = [
    competicao.nome,
    competicao.esporte,
    competicao.modalidade,
    competicao.categoria,
    competicao.espacoEsportivo,
    competicao.cidade,
  ]
    .join(" ")
    .toLocaleLowerCase("pt-BR");

  return texto.includes(termo.toLocaleLowerCase("pt-BR"));
}

export function DashboardCompeticoes() {
  const cidades = useMemo(
    () => Array.from(new Set(competicoesMock.map((competicao) => obterCidade(competicao.cidade)))),
    [],
  );
  const [busca, setBusca] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState(
    cidades.includes("Arapiraca") ? "Arapiraca" : (cidades[0] ?? ""),
  );
  const termo = busca.trim();
  const minhasInscricoes = competicoesMock.filter((competicao) =>
    correspondeBusca(competicao, termo),
  );
  const competicoesLocais = competicoesMock.filter(
    (competicao) =>
      obterCidade(competicao.cidade) === cidadeSelecionada &&
      correspondeBusca(competicao, termo),
  );

  return (
    <main className="min-h-screen bg-[#e5ebef] px-4 py-5 text-[#0b2f4f] sm:px-6 sm:py-7 lg:px-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Olá, João Silva</h1>
            <p className="mt-1 text-sm text-[#1f2937]">
              Pronto para entrar em quadra hoje?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="relative block">
              <span className="sr-only">Buscar competições</span>
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#64748b]">
                <IconeBusca />
              </span>
              <input
                type="search"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar rachas, campeonatos..."
                className="min-h-11 w-[min(60vw,270px)] rounded-xl border border-[#94a3b8] bg-white pl-9 pr-3 text-xs text-[#0b2f4f] placeholder:text-[#64748b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
              />
            </label>
            <Link
              href="/notificacoes"
              aria-label="Ver notificações"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[#d7e0e8] bg-white text-[#0b2f4f] hover:bg-[#fff7f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
            >
              <IconeNotificacao />
            </Link>
          </div>
        </header>

        <section aria-labelledby="inscricoes-titulo" className="mb-7">
          <div className="mb-3 flex items-center gap-2">
            <IconeSecao />
            <h2 id="inscricoes-titulo" className="text-base font-bold">
              Minhas inscrições
            </h2>
          </div>
          {minhasInscricoes.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-3.5">
              {minhasInscricoes.map((competicao) => (
                <CompeticaoCard key={competicao.id} competicao={competicao} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white px-4 py-5 text-sm text-[#475569]">
              Nenhuma competição encontrada para essa busca.
            </p>
          )}
        </section>

        <section aria-labelledby="competicoes-locais-titulo">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <IconeSecao trofeu />
              <h2 id="competicoes-locais-titulo" className="text-base font-bold">
                Competições locais em {cidadeSelecionada}
              </h2>
            </div>
            <label className="relative">
              <span className="sr-only">Filtrar competições por cidade</span>
              <select
                value={cidadeSelecionada}
                onChange={(event) => setCidadeSelecionada(event.target.value)}
                className="min-h-11 rounded-lg bg-transparent py-2 pl-2 pr-8 text-sm text-[#1f2937] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
              >
                {cidades.map((cidade) => (
                  <option key={cidade} value={cidade}>
                    {cidade}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {competicoesLocais.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-3.5">
              {competicoesLocais.map((competicao) => (
                <CompeticaoCard key={competicao.id} competicao={competicao} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white px-4 py-5 text-sm text-[#475569]">
              Não há competições encontradas nesta cidade para essa busca.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
