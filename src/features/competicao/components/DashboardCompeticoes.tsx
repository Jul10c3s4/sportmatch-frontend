import { CompeticaoCard } from "@/features/competicao/components/CompeticaoCard";
import { competicoesMock } from "@/features/competicao/services/competicoes.mock";

export function DashboardCompeticoes() {
  return (
    <main className="min-h-screen bg-[#e7edf1] px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9a3412]">
            SportMatch
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#0b2f4f] sm:text-4xl">
            Competições
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#475569]">
            Encontre uma competição em Alagoas e confira os detalhes de
            acessibilidade, local e inscrição.
          </p>
        </header>

        <section aria-labelledby="competicoes-disponiveis">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <h2
              id="competicoes-disponiveis"
              className="text-xl font-bold text-[#0b2f4f]"
            >
              Competições disponíveis
            </h2>
            <p className="text-sm text-[#475569]">
              {competicoesMock.length} eventos
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {competicoesMock.map((competicao) => (
              <CompeticaoCard key={competicao.id} competicao={competicao} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
