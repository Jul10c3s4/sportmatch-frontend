"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type UseFormReturn } from "react-hook-form";

import { autenticarUsuarioMock } from "@/features/usuario/services/login.service";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/usuario/schemas/login.schema";

type UseLoginResult = {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  senhaVisivel: boolean;
  status: string;
  alternarVisibilidadeSenha: () => void;
  avisarRecuperacaoIndisponivel: () => void;
};

export function useLogin(): UseLoginResult {
  const router = useRouter();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [status, setStatus] = useState("");
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      senha: "",
      lembrarSenha: false,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    try {
      autenticarUsuarioMock(values);
      router.push("/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Não foi possível entrar.";

      form.setError("root", { message });
    }
  });

  return {
    form,
    onSubmit,
    senhaVisivel,
    status,
    alternarVisibilidadeSenha: () => setSenhaVisivel((visivel) => !visivel),
    avisarRecuperacaoIndisponivel: () =>
      setStatus("A recuperação de senha ainda não está disponível."),
  };
}
