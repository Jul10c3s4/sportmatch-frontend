"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  loginSchema,
  type LoginFormValues,
} from "@/features/usuario/schemas/login.schema";

export function useLogin() {
  const router = useRouter();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
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
    router.push("/dashboard");
  });

  return {
    form,
    onSubmit,
    senhaVisivel,
    alternarVisibilidadeSenha: () => setSenhaVisivel((visivel) => !visivel),
  };
}