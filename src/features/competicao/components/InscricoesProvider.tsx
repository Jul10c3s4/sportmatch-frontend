"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import {
  InscricoesContext,
  type InscricoesContextValue,
} from "@/features/competicao/hooks/useInscricoes";
import { competicoesMock } from "@/features/competicao/services/competicoes.mock";
import type { CompeticaoDetalhe } from "@/features/competicao/types/competicaoDetalhe";
import { ToastInscricao } from "@/features/competicao/components/ToastInscricao";

type InscricoesProviderProps = {
  children: ReactNode;
};

export function InscricoesProvider({ children }: InscricoesProviderProps) {
  const [competicoes, setCompeticoes] = useState(competicoesMock);
  const competicoesRef = useRef<CompeticaoDetalhe[]>(competicoesMock);
  const [inscricoesAtleta, setInscricoesAtleta] = useState<string[]>([]);
  const inscricoesAtletaRef = useRef(new Set<string>());
  const [toastKey, setToastKey] = useState(0);
  const [toastMensagem, setToastMensagem] = useState("");

  const inscrever = useCallback((competicaoId: string): boolean => {
    const competicao = competicoesRef.current.find(({ id }) => id === competicaoId);

    if (
      !competicao ||
      inscricoesAtletaRef.current.has(competicaoId) ||
      competicao.atletasInscritos >= competicao.limiteAtletas
    ) {
      return false;
    }

    inscricoesAtletaRef.current.add(competicaoId);
    setInscricoesAtleta((atuais) => [...atuais, competicaoId]);
    const competicoesAtualizadas = competicoesRef.current.map((item) =>
      item.id === competicaoId
        ? { ...item, atletasInscritos: item.atletasInscritos + 1 }
        : item,
    );

    competicoesRef.current = competicoesAtualizadas;
    setCompeticoes(competicoesAtualizadas);
    setToastMensagem("Você se inscreveu com sucesso!");
    setToastKey((key) => key + 1);
    return true;
  }, []);

  const cancelarInscricao = useCallback((competicaoId: string): boolean => {
    if (!inscricoesAtletaRef.current.has(competicaoId)) {
      return false;
    }

    inscricoesAtletaRef.current.delete(competicaoId);
    setInscricoesAtleta((atuais) => atuais.filter((id) => id !== competicaoId));
    const competicoesAtualizadas = competicoesRef.current.map((competicao) =>
      competicao.id === competicaoId
        ? { ...competicao, atletasInscritos: competicao.atletasInscritos - 1 }
        : competicao,
    );

    competicoesRef.current = competicoesAtualizadas;
    setCompeticoes(competicoesAtualizadas);
    setToastMensagem("Sua inscrição foi cancelada.");
    setToastKey((key) => key + 1);
    return true;
  }, []);

  useEffect(() => {
    if (toastKey === 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => setToastKey(0), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [toastKey]);

  const contextValue: InscricoesContextValue = {
    competicoes,
    inscricoesAtleta,
    inscrever,
    cancelarInscricao,
  };

  return (
    <InscricoesContext.Provider value={contextValue}>
      {children}
      {toastKey > 0 && (
        <ToastInscricao mensagem={toastMensagem} />
      )}
    </InscricoesContext.Provider>
  );
}
