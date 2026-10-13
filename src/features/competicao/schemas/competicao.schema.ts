import { z } from "zod";

export const competicaoSchema = z
  .object({
    nome: z.string().trim().min(2, "Informe o nome da competição."),
    esporte: z.string().trim().min(1, "Selecione o esporte."),
    modalidade: z.string().trim().min(1, "Selecione a modalidade."),
    categoria: z.string().trim().min(1, "Informe a categoria."),
    formato: z.string().trim().min(1, "Selecione o formato."),
    nivelAcessibilidade: z.string().trim().min(1, "Selecione o nível de acessibilidade."),
    dataInicio: z.string().trim().min(1, "Informe a data de início."),
    dataFim: z.string().trim().min(1, "Informe a data de término."),
    horarioInicio: z.string().trim().min(1, "Informe o horário de início."),
    horarioFim: z.string().trim().min(1, "Informe o horário de término."),
    cep: z.string().trim().min(8, "Informe o CEP."),
    estado: z.string().trim().min(1, "Informe o estado."),
    cidade: z.string().trim().min(1, "Informe a cidade."),
    local: z.string().trim().min(1, "Informe o local da competição."),
    vagas: z.coerce.number().int("Informe um número inteiro de vagas.").min(1, "Informe o número de vagas."),
    equipeMinima: z.coerce.number().int("Informe um número inteiro válido.").min(1, "Informe o mínimo de atletas por equipe."),
    equipeMaxima: z.coerce.number().int("Informe um número inteiro válido.").min(1, "Informe o máximo de atletas por equipe."),
    valorInscricao: z.coerce.number().min(0, "Informe o valor da inscrição."),
    nivelCompeticao: z.string().trim().min(1, "Selecione o nível da competição."),
  })
  .refine(
    ({ dataInicio, dataFim }) => {
      if (!dataInicio || !dataFim) {
        return true;
      }

      return dataFim >= dataInicio;
    },
    {
      message: "A data final deve ser posterior ou igual à data inicial.",
      path: ["dataFim"],
    },
  )
  .refine(
    ({ horarioInicio, horarioFim }) => {
      if (!horarioInicio || !horarioFim) {
        return true;
      }

      return horarioFim >= horarioInicio;
    },
    {
      message: "O horário final deve ser posterior ou igual ao horário inicial.",
      path: ["horarioFim"],
    },
  )
  .refine(
    ({ equipeMinima, equipeMaxima }) => equipeMaxima >= equipeMinima,
    {
      message: "O máximo de atletas por equipe deve ser maior ou igual ao mínimo.",
      path: ["equipeMaxima"],
    },
  );
