"use client";

import { LoginFields } from "@/features/usuario/components/LoginFields";
import { useLogin } from "@/features/usuario/hooks/useLogin";

export function LoginForm() {
  const {
    form,
    onSubmit,
    senhaVisivel,
    status,
    alternarVisibilidadeSenha,
    avisarCadastroIndisponivel,
    avisarRecuperacaoIndisponivel,
  } = useLogin();
  const { isSubmitting } = form.formState;

  return (
    <section className="w-full max-w-[420px]">
      <h1 className="text-2xl font-extrabold tracking-tight text-[#092d4a] lg:text-[28px]">
        Bem vindo ao SportMatch
      </h1>
      <p className="mt-2 text-sm text-[#405466]">
        aqui você encontra as melhores rachas na sua região
      </p>

      <form className="mt-8 space-y-5" noValidate onSubmit={onSubmit}>
        <LoginFields
          form={form}
          senhaVisivel={senhaVisivel}
          alternarVisibilidadeSenha={alternarVisibilidadeSenha}
          avisarRecuperacaoIndisponivel={avisarRecuperacaoIndisponivel}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="min-h-11 w-full rounded-md bg-[#08764e] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#065f3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a4a12] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? "Validando..." : "Acessar"}
        </button>
        <button
          type="button"
          onClick={avisarCadastroIndisponivel}
          className="min-h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-[#252d34] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a4a12] focus-visible:ring-offset-2"
        >
          Cadastrar
        </button>
        <p role="status" aria-live="polite" className="min-h-5 text-center text-sm text-[#173a55]">
          {status}
        </p>
      </form>
    </section>
  );
}
