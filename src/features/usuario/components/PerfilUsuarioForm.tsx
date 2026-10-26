"use client";

import { useState } from "react";

import { usePerfilUsuario } from "@/features/usuario/hooks/usePerfilUsuario";

const esportes = [
  "Ciclismo",
  "Corrida",
  "Musculação",
  "Futebol",
  "Basquete",
  "Vôlei",
  "Yoga",
  "Natação",
  "Boxe",
  "Futsal",
  "Jiu-jitsu",
  "Karatê",
  "Skate",
  "Surfe",
  "Handebol",
  "Futvôlei",
  "Tênis de mesa",
  "Cross-fit",
];

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-[#405466]">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClassName =
  "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-[#102f48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316]";

export function PerfilUsuarioForm() {
  const { form, onSubmit, status } = usePerfilUsuario();
  const [esportesSelecionados, setEsportesSelecionados] = useState(["Ciclismo", "Futebol", "Vôlei"]);
  const { errors } = form.formState;

  function alternarEsporte(esporte: string) {
    setEsportesSelecionados((atual) =>
      atual.includes(esporte) ? atual.filter((item) => item !== esporte) : [...atual, esporte],
    );
  }

  return (
    <main className="min-h-screen bg-[#e5ebef] px-4 py-5 sm:px-6" aria-labelledby="perfil-title">
      <div className="mx-auto max-w-[1120px]">
        <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-extrabold text-[#092d4a]" id="perfil-title">
              Dados Pessoais
            </p>
            <p className="mt-1 text-xs text-[#f97316]">
              Mantenha o seu perfil atualizado para encontrar as melhores partidas
            </p>
          </div>
          <div className="flex h-10 min-w-[220px] items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-400" aria-label="Busca de partidas">
            Buscar rachas, campeonatos...
            <span aria-hidden="true">⌕</span>
          </div>
        </header>

        <form onSubmit={onSubmit} noValidate>
          <div className="grid gap-6 rounded-2xl bg-white p-5 shadow-sm lg:grid-cols-[1.2fr_0.8fr] lg:p-6">
            <div className="space-y-6">
              <section aria-labelledby="informacoes-perfil-title">
                <h2 id="informacoes-perfil-title" className="border-b border-slate-200 pb-2 text-base font-semibold text-[#092d4a]">
                  Informações do perfil
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field id="nomeCompleto" label="Nome completo" error={errors.nomeCompleto?.message}>
                    <input id="nomeCompleto" {...form.register("nomeCompleto")} className={inputClassName} />
                  </Field>
                  <Field id="nomeSocial" label="Como deseja ser chamado?" error={errors.nomeSocial?.message}>
                    <input id="nomeSocial" {...form.register("nomeSocial")} className={inputClassName} />
                  </Field>
                  <Field id="perfil" label="Perfil" error={errors.perfil?.message}>
                    <select id="perfil" {...form.register("perfil")} className={inputClassName}>
                      <option>Atleta</option>
                      <option>Organizador</option>
                      <option>Locador de espaço</option>
                    </select>
                  </Field>
                </div>
              </section>

              <section aria-labelledby="informacoes-pessoais-title">
                <h2 id="informacoes-pessoais-title" className="border-b border-slate-200 pb-2 text-base font-semibold text-[#092d4a]">
                  Informações pessoais
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field id="genero" label="Gênero" error={errors.genero?.message}>
                    <select id="genero" {...form.register("genero")} className={inputClassName}>
                      <option>Masculino</option>
                      <option>Feminino</option>
                      <option>Prefiro não informar</option>
                    </select>
                  </Field>
                  <Field id="cpf" label="CPF" error={errors.cpf?.message}>
                    <input id="cpf" {...form.register("cpf")} className={inputClassName} />
                  </Field>
                  <Field id="telefone" label="Telefone" error={errors.telefone?.message}>
                    <input id="telefone" type="tel" autoComplete="tel" {...form.register("telefone")} className={inputClassName} />
                  </Field>
                  <Field id="dataNascimento" label="Data de nascimento" error={errors.dataNascimento?.message}>
                    <input id="dataNascimento" type="date" {...form.register("dataNascimento")} className={inputClassName} />
                  </Field>
                </div>
              </section>

              <section aria-labelledby="endereco-title">
                <h2 id="endereco-title" className="border-b border-slate-200 pb-2 text-base font-semibold text-[#092d4a]">
                  Endereço
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(130px,0.65fr)_1fr_1fr]">
                  <Field id="cep" label="CEP" error={errors.cep?.message}>
                    <input id="cep" inputMode="numeric" autoComplete="postal-code" {...form.register("cep")} className={inputClassName} />
                  </Field>
                  <Field id="estado" label="Estado" error={errors.estado?.message}>
                    <input id="estado" autoComplete="address-level1" {...form.register("estado")} className={inputClassName} />
                  </Field>
                  <Field id="cidade" label="Cidade" error={errors.cidade?.message}>
                    <input id="cidade" autoComplete="address-level2" {...form.register("cidade")} className={inputClassName} />
                  </Field>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_minmax(90px,0.25fr)]">
                  <Field id="endereco" label="Endereço" error={errors.endereco?.message}>
                    <input id="endereco" autoComplete="street-address" {...form.register("endereco")} className={inputClassName} />
                  </Field>
                  <Field id="numero" label="Número" error={errors.numero?.message}>
                    <input id="numero" inputMode="numeric" {...form.register("numero")} className={inputClassName} />
                  </Field>
                </div>
                <div className="mt-4 max-w-[520px]">
                  <Field id="complemento" label="Complemento" error={errors.complemento?.message}>
                    <input id="complemento" {...form.register("complemento")} className={inputClassName} />
                  </Field>
                </div>
              </section>
            </div>

            <aside className="space-y-7" aria-label="Foto e preferências do perfil">
              <section aria-labelledby="foto-title">
                <h2 id="foto-title" className="text-base font-semibold text-[#092d4a]">Foto de perfil</h2>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#f97316] text-lg font-bold text-[#f97316]" aria-label="Avatar com as iniciais JS">
                    JS
                  </div>
                  <div className="flex min-w-[150px] flex-1 flex-col gap-2">
                    <button type="button" className="min-h-10 rounded-md bg-[#ff6b0b] px-4 text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#092d4a]">Galeria</button>
                    <button type="button" className="min-h-10 rounded-md border border-[#ff6b0b] px-4 text-xs font-semibold text-[#ff6b0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#092d4a]">Tirar foto</button>
                  </div>
                </div>
              </section>

              <section aria-labelledby="esportes-title">
                <h2 id="esportes-title" className="border-b border-slate-200 pb-2 text-base font-semibold text-[#092d4a]">Esportes de interesse</h2>
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Selecione seus esportes de interesse">
                  {esportes.map((esporte) => {
                    const selecionado = esportesSelecionados.includes(esporte);
                    return (
                      <button
                        key={esporte}
                        type="button"
                        aria-pressed={selecionado}
                        onClick={() => alternarEsporte(esporte)}
                        className={selecionado ? "min-h-8 rounded-full border border-[#ff6b0b] bg-[#fff3eb] px-2.5 text-xs font-medium text-[#ff6b0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#092d4a]" : "min-h-8 rounded-full border border-slate-200 bg-white px-2.5 text-xs text-[#405466] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#092d4a]"}
                      >
                        {esporte}
                      </button>
                    );
                  })}
                </div>
              </section>
            </aside>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-end gap-4">
            <p role="status" aria-live="polite" className="text-sm text-[#08764e]">{status}</p>
            <button type="submit" className="min-h-11 min-w-[180px] rounded-md bg-[#ff6b0b] px-5 text-sm font-semibold text-white transition hover:bg-[#e85e05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#092d4a] focus-visible:ring-offset-2">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}