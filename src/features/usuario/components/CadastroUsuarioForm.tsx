"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCadastroUsuario } from "@/features/usuario/hooks/useCadastroUsuario";

export function CadastroUsuarioForm() {
  const { form, onSubmit } = useCadastroUsuario();
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmSenhaVisivel, setConfirmSenhaVisivel] = useState(false);

  const hasGlobalError = Boolean(form.formState.errors.root);

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-4 py-8" aria-labelledby="cadastro-title">
      <div className="mx-auto flex min-h-[428px] max-w-[1200px] overflow-hidden bg-white shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <aside className="flex w-full items-center justify-center bg-white p-8 md:w-1/2" aria-label="Logo e apresentação do SportMatch">
          <div className="text-center">
            <Image
              src="/Logo%20Container.svg"
              alt="Logo SportMatch"
              width={160}
              height={96}
              priority
              className="mx-auto mb-6 h-auto w-40"
            />

            <h1 className="text-4xl font-black tracking-tight text-[#0d2947]">
              SportMatch
            </h1>

            <p className="mt-4 text-lg text-[#f97316]">
              Crie sua conta agora mesmo
            </p>
          </div>
        </aside>

        <section className="flex w-full items-center justify-center bg-[#e6edf2] p-6 md:w-1/2 md:p-10">
          <div className="w-full max-w-[360px]">
            <Link
              href="/login"
              className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#f97316] underline-offset-4 hover:text-[#ea580c] hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#fcd7a5]"
            >
              <span aria-hidden="true">←</span>
              <span>Voltar para login</span>
            </Link>

            <h2 id="cadastro-title" className="text-4xl font-bold text-[#0d2947]">
              Cadastre-se
            </h2>
            <p className="mt-2 text-base text-[#4b5d75]">
              Informe seu E-mail e crie uma senha
            </p>

            {hasGlobalError ? (
              <div
                role="alert"
                aria-live="assertive"
                className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700"
              >
                {form.formState.errors.root?.message}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
              <fieldset className="space-y-4 border-0 p-0">
                <legend className="sr-only">Dados de cadastro do usuário</legend>

                <div>
                  <label htmlFor="email" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                    <span>E-mail</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(form.formState.errors.email)}
                    aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                    {...form.register("email")}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#f59e0b] focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                  />
                  {form.formState.errors.email ? (
                    <p id="email-error" role="alert" className="mt-2 text-xs text-red-600">
                      {form.formState.errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="confirmEmail" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                    <span>Repita o e-mail</span>
                  </label>
                  <input
                    id="confirmEmail"
                    type="email"
                    placeholder="Confirme seu e-mail"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(form.formState.errors.confirmEmail)}
                    aria-describedby={form.formState.errors.confirmEmail ? "confirmEmail-error" : undefined}
                    {...form.register("confirmEmail")}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#f59e0b] focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                  />
                  {form.formState.errors.confirmEmail ? (
                    <p id="confirmEmail-error" role="alert" className="mt-2 text-xs text-red-600">
                      {form.formState.errors.confirmEmail.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="senha" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                    <span>Crie uma senha</span>
                  </label>
                  <div className="relative">
                    <input
                      id="senha"
                      type={senhaVisivel ? "text" : "password"}
                      placeholder="Crie sua senha"
                      autoComplete="new-password"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(form.formState.errors.senha)}
                      aria-describedby={form.formState.errors.senha ? "senha-error" : undefined}
                      {...form.register("senha")}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#f59e0b] focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                    />
                    <button
                      type="button"
                      onClick={() => setSenhaVisivel((visible) => !visible)}
                      aria-label={senhaVisivel ? "Esconder senha" : "Mostrar senha"}
                      aria-pressed={senhaVisivel}
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-[#4b5d75] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#fcd7a5]"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                        <circle cx="12" cy="12" r="2.5" />
                        {senhaVisivel ? null : <path d="m4 4 16 16" />}
                      </svg>
                    </button>
                  </div>
                  {form.formState.errors.senha ? (
                    <p id="senha-error" role="alert" className="mt-2 text-xs text-red-600">
                      {form.formState.errors.senha.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="confirmSenha" className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                    <span>Repita a senha</span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirmSenha"
                      type={confirmSenhaVisivel ? "text" : "password"}
                      placeholder="Repita sua senha"
                      autoComplete="new-password"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(form.formState.errors.confirmSenha)}
                      aria-describedby={form.formState.errors.confirmSenha ? "confirmSenha-error" : undefined}
                      {...form.register("confirmSenha")}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#f59e0b] focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                    />
                    <button
                      type="button"
                      onClick={() => setConfirmSenhaVisivel((visible) => !visible)}
                      aria-label={confirmSenhaVisivel ? "Esconder senha" : "Mostrar senha"}
                      aria-pressed={confirmSenhaVisivel}
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-[#4b5d75] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#fcd7a5]"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                        <circle cx="12" cy="12" r="2.5" />
                        {confirmSenhaVisivel ? null : <path d="m4 4 16 16" />}
                      </svg>
                    </button>
                  </div>
                  {form.formState.errors.confirmSenha ? (
                    <p id="confirmSenha-error" role="alert" className="mt-2 text-xs text-red-600">
                      {form.formState.errors.confirmSenha.message}
                    </p>
                  ) : null}
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                aria-busy={form.formState.isSubmitting}
                className="mt-4 h-12 w-full rounded-xl bg-[#4ec18a] text-base font-bold text-white transition hover:bg-[#42b07d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#bfe8d1] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {form.formState.isSubmitting ? "Enviando..." : "Próximo"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
