"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";

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
  avisarCadastroIndisponivel: () => void;
  avisarRecuperacaoIndisponivel: () => void;
};

export function useLogin(): UseLoginResult {
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

  const onSubmit = form.handleSubmit(() => {
    setStatus("A autenticação ainda não está conectada.");
  });

  return {
    form,
    onSubmit,
    senhaVisivel,
    status,
    alternarVisibilidadeSenha: () => setSenhaVisivel((visivel) => !visivel),
    avisarCadastroIndisponivel: () =>
      setStatus("O cadastro ainda não está disponível."),
    avisarRecuperacaoIndisponivel: () =>
      setStatus("A recuperação de senha ainda não está disponível."),
  };
}
