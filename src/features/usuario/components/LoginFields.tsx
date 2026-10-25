"use client";

import type { UseFormReturn } from "react-hook-form";

import type { LoginFormValues } from "@/features/usuario/schemas/login.schema";

type LoginFieldsProps = {
  form: UseFormReturn<LoginFormValues>;
  senhaVisivel: boolean;
  alternarVisibilidadeSenha: () => void;
};

export function LoginFields({
  form,
  senhaVisivel,
  alternarVisibilidadeSenha,
}: LoginFieldsProps) {
  const { errors } = form.formState;

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="login-email" className="text-xs font-semibold text-[#173a55]">
          E-mail
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="Digite seu email"
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          {...form.register("email")}
          className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-[#102f48] placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a4a12]"
        />
        {errors.email ? (
          <p id="login-email-error" role="alert" className="text-xs font-medium text-red-700">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="login-senha" className="text-xs font-semibold text-[#173a55]">
          Sua senha
        </label>
        <div className="relative">
          <input
            id="login-senha"
            type={senhaVisivel ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Digite sua senha"
            aria-required="true"
            aria-invalid={Boolean(errors.senha)}
            aria-describedby={errors.senha ? "login-senha-error" : undefined}
            {...form.register("senha")}
            className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 pr-12 text-sm text-[#102f48] placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a4a12]"
          />
          <button
            type="button"
            onClick={alternarVisibilidadeSenha}
            aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
            aria-pressed={senhaVisivel}
            className="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-md text-[#23445e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9a4a12]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M2.5 12s3.3-6 9.5-6 9.5 6 9.5 6-3.3 6-9.5 6-9.5-6-9.5-6Z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          </button>
        </div>
        {errors.senha ? (
          <p id="login-senha-error" role="alert" className="text-xs font-medium text-red-700">
            {errors.senha.message}
          </p>
        ) : null}
      </div>

      <label htmlFor="lembrarSenha" className="flex min-h-11 cursor-pointer items-center gap-2 text-xs text-[#405466]">
        <input
          id="lembrarSenha"
          type="checkbox"
          {...form.register("lembrarSenha")}
          className="h-4 w-4 rounded border-slate-300 accent-[#9a4a12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9a4a12]"
        />
        Lembrar minha senha
      </label>
    </>
  );
}