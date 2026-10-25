import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail válido."),
  senha: z.string().min(1, "Informe sua senha."),
  lembrarSenha: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;