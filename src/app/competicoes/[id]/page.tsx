import { DetalheCompeticaoPage } from "@/features/competicao/components/DetalheCompeticaoPage";
import { competicoesMock } from "@/features/competicao/services/competicoes.mock";

type CompeticaoPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return competicoesMock.map(({ id }) => ({ id }));
}

export default async function CompeticaoPage({ params }: CompeticaoPageProps) {
  const { id } = await params;

  return <DetalheCompeticaoPage competicaoId={id} />;
}
