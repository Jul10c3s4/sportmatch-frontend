import Image from "next/image";
import Link from "next/link";

import { buscarCompeticaoMock } from "@/features/competicao/services/competicoes.mock";
import type { CompeticaoDetalhe } from "@/features/competicao/types/competicaoDetalhe";

function LinhaDetalhe({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm leading-6">
      <dt className="font-bold text-[#0b2f4f]">{rotulo}:</dt>
      <dd className="text-[#475569]">{valor}</dd>
    </div>
  );
}

function CardCronograma({ competicao }: { competicao: CompeticaoDetalhe }) {
  const etapas = [
    { titulo: "Início das inscrições", data: competicao.dataInicioInscricoes },
    { titulo: "Término das inscrições", data: competicao.dataFimInscricoes },
    {
      titulo: "Início da competição",
      data: `${competicao.dataInicio} · ${competicao.horarioInicio}`,
      destaque: true,
    },
    {
      titulo: "Término da competição",
      data: `${competicao.dataFim} · ${competicao.horarioFim}`,
    },
  ];

  return (
    <section
      aria-labelledby="cronograma-titulo"
      className="rounded-2xl border border-[#d7e0e8] bg-white p-5 shadow-sm"
    >
      <h2 id="cronograma-titulo" className="mb-5 text-lg font-bold text-[#0b2f4f]">
        Cronograma
      </h2>
      <ol className="space-y-4">
        {etapas.map((etapa) => (
          <li key={etapa.titulo} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={[
                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                etapa.destaque
                  ? "bg-[#c2410c] text-white"
                  : "bg-[#e7edf1] text-[#0b2f4f]",
              ].join(" ")}
            >
              <span className="h-2.5 w-2.5 rounded-sm border-2 border-current" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#334155]">{etapa.titulo}</p>
              <p className="mt-0.5 text-sm text-[#475569]">{etapa.data}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function DetalheCompeticaoPage({ competicaoId }: { competicaoId: string }) {
  const competicao = buscarCompeticaoMock(competicaoId);

  if (!competicao) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#e7edf1] p-6">
        <section className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#0b2f4f]">
            Competição não encontrada
          </h1>
          <p className="mt-3 text-[#475569]">
            Não encontramos esse evento. Volte à lista para escolher outra competição.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[#c2410c] px-5 font-semibold text-white hover:bg-[#9a3412] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
          >
            Voltar às competições
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#e7edf1] px-4 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              aria-label="Voltar ao dashboard"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-xl text-[#0b2f4f] hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
            >
              <span aria-hidden="true">←</span>
            </Link>
            <h1 className="text-2xl font-bold text-[#0b2f4f] sm:text-3xl">
              {competicao.nome}
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="rounded-full bg-[#fef3c7] px-3 py-2 text-[#713f12]">
              {competicao.atletasInscritos}/{competicao.limiteAtletas} atletas
            </span>
            <span className="text-[#166534]">
              {competicao.valorInscricao === 0
                ? "Gratuito"
                : `R$ ${competicao.valorInscricao.toFixed(2).replace(".", ",")}`}
            </span>
          </div>
        </header>

        <div className="relative mb-6 h-48 overflow-hidden rounded-2xl sm:h-64">
          <Image
            src="/volei_praia_imagem.svg"
            alt={`Partida de ${competicao.modalidade} na praia`}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1152px"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b2f4f]/70 to-transparent px-6 pb-5 pt-12 text-white">
            <p className="text-sm font-semibold">{competicao.modalidade}</p>
            <p className="text-lg font-bold">{competicao.cidade}</p>
          </div>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[1.4fr_0.9fr]">
          <section
            aria-labelledby="detalhes-evento"
            className="rounded-2xl border border-[#d7e0e8] bg-white p-5 shadow-sm sm:p-6"
          >
            <h2 id="detalhes-evento" className="mb-4 flex items-center gap-3 text-lg font-bold text-[#0b2f4f]">
              <span aria-hidden="true" className="h-4 w-4 rounded-sm bg-[#c2410c]" />
              Detalhes do Evento
            </h2>
            <dl className="space-y-1.5">
              <LinhaDetalhe rotulo="Esporte" valor={competicao.esporte} />
              <LinhaDetalhe rotulo="Modalidade" valor={competicao.modalidade} />
              <LinhaDetalhe rotulo="Categoria" valor={competicao.categoria} />
              <LinhaDetalhe rotulo="Subcategoria" valor={competicao.subcategoria} />
              <LinhaDetalhe rotulo="Formato da competição" valor={competicao.formato} />
              <LinhaDetalhe rotulo="Nível de acessibilidade" valor={competicao.nivelAcessibilidade} />
              <LinhaDetalhe rotulo="Máximo de atletas por equipe" valor={String(competicao.atletasPorEquipe.maximo)} />
              <LinhaDetalhe rotulo="Mínimo de atletas por equipe" valor={String(competicao.atletasPorEquipe.minimo)} />
            </dl>
          </section>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <section
              aria-labelledby="local-evento"
              className="overflow-hidden rounded-2xl border border-[#d7e0e8] bg-white p-5 shadow-sm"
            >
              <h2 id="local-evento" className="mb-3 text-base font-bold text-[#0b2f4f]">
                <span aria-hidden="true" className="mr-2 text-[#c2410c]">●</span>
                {competicao.espacoEsportivo}
              </h2>
              <div
                role="img"
                aria-label={`Mapa ilustrativo de ${competicao.cidade}`}
                className="relative h-24 overflow-hidden rounded-xl bg-[#eaf0e8]"
              >
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,#cbd5e1_41%,#cbd5e1_47%,transparent_48%),linear-gradient(20deg,transparent_32%,#fff_33%,#fff_39%,transparent_40%),linear-gradient(90deg,transparent_58%,#cbd5e1_59%,#cbd5e1_65%,transparent_66%)]" />
                <span aria-hidden="true" className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#c2410c] text-sm font-bold text-white shadow">●</span>
                <p className="absolute bottom-1 left-2 rounded bg-white/90 px-2 py-1 text-xs font-medium text-[#334155]">
                  {competicao.endereco} · {competicao.cidade}
                </p>
              </div>
            </section>
            <CardCronograma competicao={competicao} />
          </div>
        </div>

        <button
          type="button"
          disabled
          aria-label="Inscreva-se na competição. Inscrições on-line disponíveis em breve."
          className="mt-6 min-h-12 w-full cursor-not-allowed rounded-lg bg-[#c2410c] px-5 font-semibold text-white opacity-90"
        >
          Inscreva-se na Competição
        </button>
        <p className="mt-2 text-center text-sm text-[#475569]">
          Inscrições on-line disponíveis em breve.
        </p>
      </div>
    </main>
  );
}
