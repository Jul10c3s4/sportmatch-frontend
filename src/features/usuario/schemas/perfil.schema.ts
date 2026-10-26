import { z } from "zod";

export const perfilSchema = z.object({
  nomeCompleto: z.string().trim().min(1, "Informe seu nome completo."),
  nomeSocial: z.string().trim(),
  perfil: z.string().min(1, "Selecione um perfil."),
  genero: z.string().min(1, "Selecione seu gênero."),
  cpf: z.string().trim().min(1, "Informe seu CPF."),
  telefone: z.string().trim().min(1, "Informe seu telefone."),
  dataNascimento: z.string().min(1, "Informe sua data de nascimento."),
  cep: z.string().trim().min(8, "Informe um CEP válido."),
  estado: z.string().trim().min(1, "Informe seu estado."),
  cidade: z.string().trim().min(1, "Informe sua cidade."),
  endereco: z.string().trim().min(1, "Informe seu endereço."),
  numero: z.string().trim().min(1, "Informe o número."),
  complemento: z.string().trim(),
});

export type PerfilFormValues = z.infer<typeof perfilSchema>;