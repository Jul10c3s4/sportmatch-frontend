"use client";

import { useMemo, useState } from "react";

import { competicoesMock } from "@/features/competicao/services/competicoes.mock";
import type { CompeticaoDetalhe } from "@/features/competicao/types/competicaoDetalhe";

export type SituacaoCompeticao = "abertas" | "andamento" | "encerradas";
export type AbaPesquisa = "competicoes" | "pessoas";

function obterCidade(cidadeCompleta: string): string {
  return cidadeCompleta.split(",").at(-1)?.replace(" - AL", "").trim() ?? cidadeCompleta;
}

function converterData(data: string): Date {
  const [dia, mes, ano] = data.split("/").map(Number);
  return new Date(ano, mes - 1, dia);
}

function obterSituacao(competicao: CompeticaoDetalhe, hoje: Date): SituacaoCompeticao {
  const inicio = converterData(competicao.dataInicio);
  const fim = converterData(competicao.dataFim);

  if (fim < hoje) return "encerradas";
  if (inicio <= hoje) return "andamento";
  return "abertas";
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

export function usePesquisaCompeticoes() {
  const [busca, setBusca] = useState("");
  const [cidade, setCidade] = useState("Todas");
  const [esporte, setEsporte] = useState("Todos");
  const [acessibilidade, setAcessibilidade] = useState("Todas");
  const [aba, setAba] = useState<AbaPesquisa>("competicoes");

  const opcoes = useMemo(() => ({
    cidades: ["Todas", ...new Set(competicoesMock.map((competicao) => obterCidade(competicao.cidade)))],
    esportes: ["Todos", ...new Set(competicoesMock.map((competicao) => competicao.esporte))],
    acessibilidades: ["Todas", ...new Set(competicoesMock.map((competicao) => competicao.nivelAcessibilidade))],
  }), []);

  const competicoes = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return competicoesMock.filter((competicao) =>
      correspondeBusca(competicao, busca.trim()) &&
      (cidade === "Todas" || obterCidade(competicao.cidade) === cidade) &&
      (esporte === "Todos" || competicao.esporte === esporte) &&
      (acessibilidade === "Todas" || competicao.nivelAcessibilidade === acessibilidade),
    );
  }, [acessibilidade, busca, cidade, esporte]);

  const porSituacao = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return {
      abertas: competicoes.filter((competicao) => obterSituacao(competicao, hoje) === "abertas"),
      andamento: competicoes.filter((competicao) => obterSituacao(competicao, hoje) === "andamento"),
      encerradas: competicoes.filter((competicao) => obterSituacao(competicao, hoje) === "encerradas"),
    };
  }, [competicoes]);

  return {
    busca,
    setBusca,
    cidade,
    setCidade,
    esporte,
    setEsporte,
    acessibilidade,
    setAcessibilidade,
    aba,
    setAba,
    opcoes,
    porSituacao,
    total: competicoes.length,
  };
}
