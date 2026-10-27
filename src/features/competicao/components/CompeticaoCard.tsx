import Image from "next/image";
import Link from "next/link";

import type { CompeticaoDetalhe } from "@/features/competicao/types/competicaoDetalhe";

type CompeticaoCardProps = {
  competicao: CompeticaoDetalhe;
};

function IconeInfo({ tipo }: { tipo: "participantes" | "calendario" | "horario" | "local" }) {
  const paths = {
    participantes: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2" />
        <path d="M3 19a6 6 0 0 1 12 0M15 15a4 4 0 0 1 6 3" />
      </>
    ),
    calendario: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 10h18" />
      </>
    ),
    horario: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    local: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[tipo]}
    </svg>
  );
}

function formatarData(data: string): string {
  const [dia, mes, ano] = data.split("/");
  return dia && mes && ano ? `${dia}/${mes}/${ano}` : data;
}

export function CompeticaoCard({ competicao }: CompeticaoCardProps) {
  const valor = competicao.valorInscricao === 0
    ? "Gratuito"
    : `R$ ${competicao.valorInscricao.toFixed(2).replace(".", ",")}`;

  return (
    <article className="overflow-hidden rounded-lg bg-white p-2 shadow-sm">
      <Link
        href={`/competicoes/${competicao.id}`}
        aria-label={`Ver detalhes de ${competicao.nome}`}
        className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2410c]"
      >
        <div className="relative h-28 overflow-hidden rounded-md sm:h-32">
          <Image
            src="/volei_praia_imagem.svg"
            alt="Imagem ilustrativa da competição"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 35vw, 25vw"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-[#0b2f4f]">
            <IconeInfo tipo="participantes" />
            {competicao.atletasInscritos}/{competicao.limiteAtletas}
          </span>
        </div>

        <div className="mt-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold text-[#0b2f4f] group-hover:text-[#9a3412]">
            {competicao.nome}
          </h3>
          <span className="shrink-0 rounded-full bg-[#e8f0ea] px-2 py-1 text-[9px] font-medium text-[#24543b]">
            {valor}
          </span>
        </div>

        <ul aria-label="Modalidade e categoria" className="mt-2 flex flex-wrap gap-1.5">
          {Array.from(new Set([competicao.esporte, competicao.modalidade, competicao.categoria])).map((tag) => (
            <li
              key={tag}
              className="max-w-full truncate rounded-full bg-[#e8e8e8] px-2 py-1 text-[10px] font-medium text-[#334155]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] leading-4 text-[#0b2f4f]">
          <span className="inline-flex items-center gap-1">
            <IconeInfo tipo="calendario" />
            {formatarData(competicao.dataInicio)}
          </span>
          <span className="inline-flex items-center gap-1">
            <IconeInfo tipo="horario" />
            {competicao.horarioInicio} - {competicao.horarioFim}
          </span>
        </div>

        <p className="mt-2 flex items-center gap-1 text-[10px] leading-4 text-[#0b2f4f]">
          <IconeInfo tipo="local" />
          <span className="line-clamp-1">{competicao.espacoEsportivo}</span>
        </p>

        <span className="mt-2 inline-flex min-h-8 items-center gap-1 text-[10px] font-semibold text-[#0b2f4f]">
          Ver mais
          <span aria-hidden="true" className="text-sm text-[#c2410c]">→</span>
        </span>
      </Link>
    </article>
  );
}
