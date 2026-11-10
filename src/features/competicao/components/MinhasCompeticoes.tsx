import Link from "next/link";

import { CompeticaoCard } from "@/features/competicao/components/CompeticaoCard";
import { competicoesMock } from "@/features/competicao/services/competicoes.mock";

const competicoesRecentes = competicoesMock.slice(0, 3);
const competicoesPassadas = [...competicoesMock, ...competicoesMock.slice(0, 3)];

function IconeSecao({ trofeu = false }: { trofeu?: boolean }) {
  return trofeu ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-[#f97316]" fill="currentColor">
      <path d="M7 3h10v2h4v3a5 5 0 0 1-4.3 4.95A6 6 0 0 1 13 16.9V19h4v2H7v-2h4v-2.1a6 6 0 0 1-3.7-3.95A5 5 0 0 1 3 8V5h4V3Zm10 4v3.86A3 3 0 0 0 19 8V7h-2ZM5 7v1a3 3 0 0 0 2 2.86V7H5Z" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function MinhasCompeticoes() {
  return (
    <main className="min-h-screen bg-[#e5ebef] px-4 py-4 text-[#0b2f4f] sm:px-6 sm:py-5 lg:px-7">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-3 flex justify-end">
          <Link
            href="/competicoes/nova"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#f97316] px-4 text-sm font-semibold text-white transition hover:bg-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a3412] focus-visible:ring-offset-2"
          >
            <span aria-hidden="true">＋</span>
            Nova Competição
          </Link>
        </div>

        <div className="rounded-2xl bg-[#f7f8fa] p-4 md:p-5">
          <section aria-labelledby="recentes-titulo" className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <IconeSecao />
              <h1 id="recentes-titulo" className="text-base font-bold text-[#0b2f4f]">
                Competições Recentes
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {competicoesRecentes.map((competicao) => (
                <CompeticaoCard key={competicao.id} competicao={competicao} />
              ))}
            </div>
          </section>

          <section aria-labelledby="passadas-titulo">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <IconeSecao trofeu />
                <h2 id="passadas-titulo" className="text-base font-bold text-[#0b2f4f]">
                  Competições Passadas
                </h2>
              </div>
              <label className="flex items-center gap-1 text-xs text-[#334155]">
                <span className="sr-only">Filtrar competições passadas por cidade</span>
                <select
                  aria-label="Filtrar competições passadas por cidade"
                  defaultValue="Arapiraca"
                  className="min-h-11 rounded-md border-0 bg-transparent px-2 text-xs text-[#334155] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
                >
                  <option value="Arapiraca">Arapiraca</option>
                  <option value="Maceió">Maceió</option>
                  <option value="Recife">Recife</option>
                </select>
              </label>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {competicoesPassadas.map((competicao, index) => (
                <CompeticaoCard key={`${competicao.id}-${index}`} competicao={competicao} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
