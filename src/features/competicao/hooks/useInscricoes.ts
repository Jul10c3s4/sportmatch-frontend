"use client";

import { createContext, useContext } from "react";

import type { CompeticaoDetalhe } from "@/features/competicao/types/competicaoDetalhe";

export type InscricoesContextValue = {
  competicoes: CompeticaoDetalhe[];
  inscricoesAtleta: string[];
  inscrever: (competicaoId: string) => boolean;
  cancelarInscricao: (competicaoId: string) => boolean;
};

export const InscricoesContext = createContext<InscricoesContextValue | null>(null);

export function useInscricoes(): InscricoesContextValue {
  const context = useContext(InscricoesContext);

  if (!context) {
    throw new Error("useInscricoes deve ser usado dentro de InscricoesProvider.");
  }

  return context;
}
