"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { competicaoSchema } from "@/features/competicao/schemas/competicao.schema";
import { criarCompeticao } from "@/features/competicao/services/competicao.service";
import type { CompeticaoFormValues } from "@/features/competicao/types/competicao";

const defaultValues: CompeticaoFormValues = {
  nome: "",
  esporte: "",
  modalidade: "",
  categoria: "",
  formato: "",
  nivelAcessibilidade: "",
  dataInicio: "",
  dataFim: "",
  horarioInicio: "",
  horarioFim: "",
  cep: "",
  estado: "",
  cidade: "",
  local: "",
  vagas: 0,
  equipeMinima: 0,
  equipeMaxima: 0,
  valorInscricao: 0,
  nivelCompeticao: "",
};

export function useCadastroCompeticao() {
  const form = useForm<CompeticaoFormValues>({
    resolver: zodResolver(competicaoSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues,
  });

  const onSubmit = form.handleSubmit(
    async (values) => {
      try {
        await criarCompeticao(values);
        form.reset();
        form.setFocus("nome");
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Não foi possível cadastrar a competição.";

        form.setError("root", {
          message,
        });
      }
    },
    (formErrors) => {
      const firstError = Object.keys(formErrors)[0] as keyof CompeticaoFormValues | undefined;

      if (firstError) {
        const field = document.getElementById(firstError);
        field?.focus();
      }
    },
  );

  return {
    form,
    onSubmit,
  };
}
