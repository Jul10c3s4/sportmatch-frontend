"use client";

import type { ReactNode } from "react";

import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { useCadastroCompeticao } from "@/features/competicao/hooks/useCadastroCompeticao";

const esportes = [
  { value: "futebol", label: "Futebol" },
  { value: "volei", label: "Vôlei" },
  { value: "basquete", label: "Basquete" },
  { value: "atletismo", label: "Atletismo" },
  { value: "handebol", label: "Handebol" },
];

const modalidades = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "misto", label: "Misto" },
  { value: "junior", label: "Júnior" },
  { value: "adulto", label: "Adulto" },
];

const categorias = [
  { value: "amador", label: "Amador" },
  { value: "profissional", label: "Profissional" },
  { value: "universitario", label: "Universitário" },
  { value: "infantil", label: "Infantil" },
];

const formatos = [
  { value: "mata-mata", label: "Mata-mata" },
  { value: "grupos", label: "Fase de grupos" },
  { value: "todos-contra-todos", label: "Todos contra todos" },
  { value: "desafios", label: "Desafios" },
];

const niveisAcessibilidade = [
  { value: "baixo", label: "Baixo" },
  { value: "medio", label: "Médio" },
  { value: "alto", label: "Alto" },
];

const niveisCompeticao = [
  { value: "iniciante", label: "Iniciante" },
  { value: "intermediario", label: "Intermediário" },
  { value: "avancado", label: "Avançado" },
];

function Icon({ name }: { name: string }) {
  const size = 18;
  const icons: Record<string, ReactNode> = {
    home: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="5.5" />
        <path d="M16 16 21 21" />
      </svg>
    ),
    trophy: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 4h8v2a4 4 0 0 1-8 0V4Z" />
        <path d="M8 4H5a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4h1" />
        <path d="M16 4h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4h-1" />
        <path d="M12 12v4" />
        <path d="M9 20h6" />
      </svg>
    ),
    bell: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
        <path d="M10 20a2 2 0 0 0 4 0" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21a8 8 0 1 0-16 0" />
        <circle cx="12" cy="8" r="4" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
        <circle cx="10" cy="7" r="3" />
        <path d="M20 19v-1a4 4 0 0 0-3-3.87" />
        <path d="M16 4.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    upload: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M4 18.5v.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
      </svg>
    ),
  };

  return icons[name] ?? null;
}

export function CompeticaoForm() {
  const { form, onSubmit } = useCadastroCompeticao();
  const { register, formState } = form;
  const { errors, isSubmitting } = formState;

  return (
    <main className="min-h-screen bg-[#edf1f4] p-0 text-[#1e2a36]">
      <div className="min-h-screen p-8">
        <main className="flex-1">
          <header className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[2.5rem] font-bold tracking-[-0.06em] text-[#1e2a36]">
                Cadastro de Competição
              </h1>
              <p className="mt-1 text-base text-[#5d6875]">
                Crie e gerencie novos competições e regras esportivas
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative block">
                <span className="sr-only">Buscar competições</span>
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7c8795]">
                  <Icon name="search" />
                </span>
                <input
                  type="search"
                  placeholder="Buscar competições..."
                  className="h-11 w-[280px] rounded-xl border border-[#dfe5eb] bg-white pl-11 pr-4 text-sm text-[#1f2937] placeholder:text-[#98a2af] focus:border-[#f39a4f] focus:outline-none focus:ring-4 focus:ring-[#f5cba7]/40"
                />
              </label>

              <button
                type="button"
                aria-label="Notificações"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#dfe5eb] bg-white text-[#62707a] transition hover:border-[#f39a4f] hover:text-[#f39a4f]"
              >
                <Icon name="bell" />
              </button>
            </div>
          </header>

          <form noValidate onSubmit={onSubmit} className="rounded-[24px] border border-[#e3e7eb] bg-white p-6 shadow-[0_8px_28px_rgba(17,24,39,0.04)]" aria-describedby="form-status">
            <div className="space-y-6">
              <section className="space-y-5 border-b border-[#e5e7eb] pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff2e7] text-[#f39a4f]">
                    <Icon name="trophy" />
                  </span>
                  <h2 className="text-[1.8rem] font-bold leading-none text-[#1f2937]">Informações do evento</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">

                <InputField id="nome" label="Nome da competição" field="nome" register={register} error={errors.nome} placeholder="Ex.: Copa municipal de futebol" />

                <SelectField id="esporte" label="Esporte" field="esporte" register={register} error={errors.esporte} options={esportes} placeholder="Selecione o esporte" />

                <SelectField id="modalidade" label="Modalidade" field="modalidade" register={register} error={errors.modalidade} options={modalidades} placeholder="Selecione a modalidade" />

                <SelectField id="categoria" label="Categoria" field="categoria" register={register} error={errors.categoria} options={categorias} placeholder="Selecione a categoria" />

                <SelectField id="formato" label="Formato" field="formato" register={register} error={errors.formato} options={formatos} placeholder="Selecione o formato" />

                <SelectField id="nivelAcessibilidade" label="Nível de acessibilidade" field="nivelAcessibilidade" register={register} error={errors.nivelAcessibilidade} options={niveisAcessibilidade} placeholder="Selecione o nível" />
                </div>
              </section>

              <section className="space-y-5 border-b border-[#e5e7eb] pb-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff2e7] text-[#f39a4f]">
                        <Icon name="calendar" />
                      </span>
                      <h2 className="text-[1.8rem] font-bold leading-none text-[#1f2937]">Cronograma</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InputField id="dataInicio" label="Início" field="dataInicio" register={register} error={errors.dataInicio} type="date" />
                      <InputField id="dataFim" label="Término" field="dataFim" register={register} error={errors.dataFim} type="date" />
                      <InputField id="horarioInicio" label="Hora início" field="horarioInicio" register={register} error={errors.horarioInicio} type="time" />
                      <InputField id="horarioFim" label="Hora término" field="horarioFim" register={register} error={errors.horarioFim} type="time" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff2e7] text-[#f39a4f]">
                        <Icon name="location" />
                      </span>
                      <h2 className="text-[1.8rem] font-bold leading-none text-[#1f2937]">Local da competição</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InputField id="cep" label="CEP" field="cep" register={register} error={errors.cep} placeholder="00000-000" autoComplete="postal-code" />
                      <InputField id="estado" label="Estado" field="estado" register={register} error={errors.estado} placeholder="Alagoas" />
                      <InputField id="cidade" label="Cidade" field="cidade" register={register} error={errors.cidade} placeholder="Maceió" />
                      <InputField id="local" label="Local" field="local" register={register} error={errors.local} placeholder="Arena esportiva" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-5 border-b border-[#e5e7eb] pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff2e7] text-[#f39a4f]">
                    <Icon name="users" />
                  </span>
                  <h2 className="text-[1.8rem] font-bold leading-none text-[#1f2937]">Equipes e atletas</h2>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField id="vagas" label="Vagas" field="vagas" register={register} error={errors.vagas} type="number" min="1" placeholder="32" />
                      <InputField id="valorInscricao" label="Valor da inscrição" field="valorInscricao" register={register} error={errors.valorInscricao} type="number" min="0" step="0.01" placeholder="75.00" />
                      <InputField id="equipeMinima" label="Mínimo por equipe" field="equipeMinima" register={register} error={errors.equipeMinima} type="number" min="1" placeholder="5" />
                      <InputField id="equipeMaxima" label="Máximo por equipe" field="equipeMaxima" register={register} error={errors.equipeMaxima} type="number" min="1" placeholder="11" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[1.05rem] font-semibold text-[#1f2937]">
                      <span className="text-[#f39a4f]">
                        <Icon name="upload" />
                      </span>
                      <h3 className="text-xl font-bold text-[#1f2937]">Imagem de capa</h3>
                    </div>

                  <label
                    htmlFor="cover-image"
                    className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#efb77d] bg-[#fff8f1] px-6 py-8 text-center transition hover:border-[#f39a4f] hover:bg-[#fff3e6]"
                  >
                    <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5d7b3] text-[#b86a1f]">
                      <Icon name="upload" />
                    </span>
                    <span className="text-lg font-semibold text-[#1f2937]">Clique aqui para enviar uma imagem</span>
                    <span className="mt-2 text-xs text-[#6b7280]">Formatos recomendados: PNG, JPG ou WEBP</span>
                    <input id="cover-image" type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" aria-label="Enviar imagem de capa da competição" />
                  </label>

                    <div className="mt-4">
                      <SelectField id="nivelCompeticao" label="Nível da competição" field="nivelCompeticao" register={register} error={errors.nivelCompeticao} options={niveisCompeticao} placeholder="Selecione o nível da competição" />
                    </div>
                  </div>
                </div>
              </section>

              <div id="form-status" aria-live="polite" className="min-h-6">
                {errors.root ? (
                  <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                    {errors.root.message}
                  </p>
                ) : null}
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#edf0f2] bg-[#f8fafc] px-3 py-2">
                  <div className="flex items-center gap-2 text-sm text-[#4b5563]">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f4e8dc] text-[#d9802a]">
                      <Icon name="trophy" />
                    </span>
                    <span>Competição pronta para publicação</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="inline-flex items-center justify-center rounded-xl bg-[#f39a4f] px-6 py-3 text-base font-semibold text-white shadow-[0_8px_18px_rgba(243,154,79,0.32)] transition hover:bg-[#e88c35] focus:outline-none focus:ring-4 focus:ring-[#f5cba7]/60 disabled:cursor-not-allowed disabled:bg-[#fdba74]"
                  >
                    {isSubmitting ? "Salvando..." : "Criar Competição"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </main>
  );
}
