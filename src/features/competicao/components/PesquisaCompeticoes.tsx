"use client";

import Link from "next/link";

import { CompeticaoCard } from "@/features/competicao/components/CompeticaoCard";
import {
  usePesquisaCompeticoes,
  type AbaPesquisa,
  type SituacaoCompeticao,
} from "@/features/competicao/hooks/usePesquisaCompeticoes";

const secoes: { id: SituacaoCompeticao; titulo: string }[] = [
  { id: "abertas", titulo: "Competições Abertas" },
  { id: "andamento", titulo: "Em andamento" },
  { id: "encerradas", titulo: "Encerradas" },
];

type FiltroProps = {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FiltroSelect({ id, label, value, options, onChange }: FiltroProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="sr-only">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full rounded-lg border border-[#cbd5e1] bg-white px-3 text-sm text-[#173a55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Aba({ value, atual, children, onSelect }: {
  value: AbaPesquisa;
  atual: AbaPesquisa;
  children: string;
  onSelect: (value: AbaPesquisa) => void;
}) {
  const selecionada = value === atual;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selecionada}
      onClick={() => onSelect(value)}
      className={`min-h-11 rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c] ${
        selecionada ? "bg-[#f97316] text-white" : "text-[#334155] hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}

export function PesquisaCompeticoes() {
  const pesquisa = usePesquisaCompeticoes();

  return (
    <main className="min-h-screen bg-[#e5ebef] px-4 py-5 text-[#0b2f4f] sm:px-6 sm:py-7 lg:px-7">
      <div className="mx-auto max-w-[1180px]">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#0b2f4f]">Pesquisar</h1>
          <div className="flex items-center gap-2">
            <label htmlFor="busca-competicoes" className="sr-only">Buscar competições</label>
            <input
              id="busca-competicoes"
              type="search"
              value={pesquisa.busca}
              onChange={(event) => pesquisa.setBusca(event.target.value)}
              placeholder="Buscar competições..."
              className="min-h-11 w-[min(65vw,320px)] rounded-lg border border-[#94a3b8] bg-white px-3 text-sm text-[#0b2f4f] placeholder:text-[#64748b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
            />
            <Link
              href="/notificacoes"
              aria-label="Ver notificações"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[#d7e0e8] bg-white text-[#0b2f4f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>
            </Link>
          </div>
        </header>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-3">
            <FiltroSelect id="filtro-cidade" label="Filtrar por cidade" value={pesquisa.cidade} options={pesquisa.opcoes.cidades} onChange={pesquisa.setCidade} />
            <FiltroSelect id="filtro-esporte" label="Filtrar por esporte" value={pesquisa.esporte} options={pesquisa.opcoes.esportes} onChange={pesquisa.setEsporte} />
            <FiltroSelect id="filtro-acessibilidade" label="Filtrar por acessibilidade" value={pesquisa.acessibilidade} options={pesquisa.opcoes.acessibilidades} onChange={pesquisa.setAcessibilidade} />
          </div>

          <div role="tablist" aria-label="Tipo de busca" className="inline-flex rounded-lg bg-white p-1 shadow-sm">
            <Aba value="competicoes" atual={pesquisa.aba} onSelect={pesquisa.setAba}>Competições</Aba>
            <Aba value="pessoas" atual={pesquisa.aba} onSelect={pesquisa.setAba}>Pessoas</Aba>
          </div>
        </div>

        {pesquisa.aba === "competicoes" ? (
          <div role="tabpanel" aria-label="Resultados de competições" className="space-y-5">
            {secoes.map(({ id, titulo }) => {
              const competicoes = pesquisa.porSituacao[id];

              return (
                <section key={id} aria-labelledby={`titulo-${id}`}>
                  <h2 id={`titulo-${id}`} className="mb-2 text-base font-bold text-[#0b2f4f]">
                    {titulo}
                  </h2>
                  {competicoes.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {competicoes.map((competicao) => (
                        <CompeticaoCard key={competicao.id} competicao={competicao} />
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lg bg-white px-4 py-3 text-sm text-[#475569]">
                      {pesquisa.total === 0
                        ? "Nenhuma competição encontrada. Ajuste os filtros e tente novamente."
                        : "Nenhuma competição nesta situação."}
                    </p>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <div role="tabpanel" aria-label="Resultados de pessoas" className="rounded-xl bg-white px-5 py-8 text-center">
            <h2 className="text-base font-semibold text-[#0b2f4f]">Busca de pessoas</h2>
            <p className="mt-2 text-sm text-[#475569]">
              Ainda não há perfis disponíveis para pesquisa.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
