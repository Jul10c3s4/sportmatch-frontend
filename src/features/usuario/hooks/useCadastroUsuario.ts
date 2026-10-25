"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  usuarioSchema,
  type UsuarioFormValues,
} from "@/features/usuario/schemas/usuario.schema";
import { criarUsuario } from "@/features/usuario/services/usuario.service";

export function useCadastroUsuario() {
  const router = useRouter();
  const form = useForm<UsuarioFormValues>({
    resolver: zodResolver(usuarioSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      confirmEmail: "",
      senha: "",
      confirmSenha: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (values) => {
      try {
        await criarUsuario({
          email: values.email,
          senha: values.senha,
        });

        form.reset();
  router.push("/dashboard");
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Não foi possível criar o usuário.";

        form.setError("root", {
          message,
        });
      }
    },
    (formErrors) => {
      const firstError = Object.keys(formErrors)[0] as keyof UsuarioFormValues | undefined;

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
