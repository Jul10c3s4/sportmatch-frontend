import { z } from "zod";

export const usuarioSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Informe seu e-mail.")
      .email("Informe um e-mail válido."),
    confirmEmail: z.string().trim().min(1, "Repita seu e-mail."),
    senha: z
      .string()
      .min(1, "Crie uma senha.")
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .max(50, "A senha deve ter no máximo 50 caracteres."),
    confirmSenha: z.string().min(1, "Repita sua senha."),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Os e-mails não coincidem.",
    path: ["confirmEmail"],
  })
  .refine((data) => data.senha === data.confirmSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmSenha"],
  });

export type UsuarioFormValues = z.infer<typeof usuarioSchema>;
