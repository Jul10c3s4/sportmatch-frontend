import { z } from "zod";

export const espacoSchema = z.object({
  nome: z.string().min(3, "O nome do espaço deve ter no mínimo 3 caracteres"),
  tiposEspaco: z.array(z.string()).min(1, "Selecione ao menos um tipo de espaço"),
  esportePrincipal: z.string().min(1, "Selecione o esporte principal"),
  descricao: z.string().min(10, "A descrição deve conter no mínimo 10 caracteres"),
  caracteristicasAcessibilidade: z.array(z.string()),
  cep: z.string().regex(/^\d{5}-\d{3}$/, "Informe um CEP válido no formato 00000-000"),
  estado: z.string().min(2, "Informe o estado"),
  cidade: z.string().min(2, "Informe a cidade"),
  bairro: z.string().min(2, "Informe o bairro"),
  endereco: z.string().min(5, "Informe o endereço completo"),
  imagemCapa: z.any().optional(),
});