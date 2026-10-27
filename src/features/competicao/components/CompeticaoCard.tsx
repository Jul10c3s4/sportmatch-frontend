import Link from "next/link";

import type { CompeticaoDetalhe } from "@/features/competicao/types/competicaoDetalhe";

type CompeticaoCardProps = {
  competicao: CompeticaoDetalhe;
};

export function CompeticaoCard({ competicao }: CompeticaoCardProps) {
  return (
    <Link
      href={`/competicoes/${competicao.id}`}
      className="group flex min-h-56 flex-col rounded-2xl border border-[#d7e0e8] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c2410c] hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="rounded-full bg-[#fff1e8] px-3 py-1 text-sm font-semibold text-[#9a3412]">
          {competicao.esporte}
        </span>
        <span className="text-sm font-semibold text-[#334155]">
          {competicao.atletasInscritos}/{competicao.limiteAtletas} atletas
        </span>
      </div>
      <h2 className="text-xl font-bold text-[#0b2f4f] group-hover:text-[#9a3412]">
        {competicao.nome}
      </h2>
      <p className="mt-2 text-sm text-[#475569]">
        {competicao.espacoEsportivo} · {competicao.cidade}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm">
        <span className="font-medium text-[#334155]">
          {competicao.dataInicio} · {competicao.horarioInicio}
        </span>
        <span className="font-bold text-[#9a3412]">
          {competicao.valorInscricao === 0
            ? "Gratuito"
            : `R$ ${competicao.valorInscricao.toFixed(2).replace(".", ",")}`}
        </span>
      </div>
      <span className="sr-only">Abrir detalhes da competição</span>
    </Link>
  );
}
