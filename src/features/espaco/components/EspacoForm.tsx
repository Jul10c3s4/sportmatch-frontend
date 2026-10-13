"use client";

import { useRef, useState } from "react";
import { useCadastroEspaco } from "../hooks/useCadastroEspaco";

function Icon({ name }: { name: string }) {
  const size = 18;
  const icons: Record<string, React.ReactNode> = {
    search: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="5.5" />
        <path d="M16 16 21 21" />
      </svg>
    ),
    bell: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
        <path d="M10 20a2 2 0 0 0 4 0" />
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
    location: (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.5" />
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

export function EspacoForm() {
  const { form, onSubmit, isSubmitting, feedbackMessage } = useCadastroEspaco();
  const { register, setValue, formState: { errors } } = form;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imagemCapa", file);
      setFileName(file.name);
    }
  };

  return (
    <main className="min-h-screen bg-[#edf1f4] p-0 text-[#1e2a36]">
      <div className="min-h-screen p-8">
        <main className="flex-1">
          <header className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 id="page-title" className="text-[2.5rem] font-bold tracking-[-0.06em] text-[#1e2a36]">
                Cadastro de Espaço
              </h1>
              <p className="mt-1 text-base text-[#5d6875]">
                Cadastre e gerencie seus espaços esportivos
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative block">
                <span className="sr-only">Buscar rachas, campeonatos</span>
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7c8795]">
                  <Icon name="search" />
                </span>
                <input
                  type="search"
                  placeholder="Buscar rachas, campeonatos..."
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

          <form
            onSubmit={onSubmit}
            aria-labelledby="page-title"
            className="rounded-[24px] border border-[#e3e7eb] bg-white p-6 shadow-[0_8px_28px_rgba(17,24,39,0.04)]"
          >
            {feedbackMessage && (
              <div
                role="alert"
                aria-live="polite"
                className="mb-6 rounded-xl bg-orange-50 p-4 text-sm font-medium text-orange-900 border border-orange-200"
              >
                {feedbackMessage}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Coluna 1: Informações do Espaço */}
                <section aria-labelledby="sec-info" className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff2e7] text-[#f39a4f]">
                      <Icon name="trophy" />
                    </span>
                    <h2 id="sec-info" className="text-[1.8rem] font-bold leading-none text-[#1f2937]">
                      Informações do espaço
                    </h2>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="nome" className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                      Nome do espaço esportivo
                    </label>
                    <input
                      id="nome"
                      type="text"
                      placeholder="Ex: Arena Soccer Arapiraca"
                      aria-invalid={!!errors.nome}
                      aria-describedby={errors.nome ? "nome-error" : undefined}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition placeholder:text-slate-400 focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                      {...register("nome")}
                    />
                    {errors.nome && (
                      <p id="nome-error" role="alert" className="text-xs font-medium text-red-600">
                        {errors.nome.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tiposEspaco" className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                      Tipo de espaço
                    </label>
                    <select
                      id="tiposEspaco"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                      onChange={(e) => setValue("tiposEspaco", [e.target.value])}
                    >
                      <option value="Quadra Poliesportiva">Quadra Poliesportiva</option>
                      <option value="Campo Sintético">Campo Sintético</option>
                      <option value="Arena de Beach Tennis">Arena de Beach Tennis</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="esportePrincipal" className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                      Esporte principal
                    </label>
                    <select
                      id="esportePrincipal"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                      {...register("esportePrincipal")}
                    >
                      <option value="Futsal">Futsal</option>
                      <option value="Futebol Society">Futebol Society</option>
                      <option value="Vôlei">Vôlei</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="descricao" className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                      Descrição do espaço
                    </label>
                    <textarea
                      id="descricao"
                      rows={4}
                      placeholder="Ex: Espaço coberto de alto padrão com vestiários novos e lanchonete anexa. Ótima localização..."
                      aria-invalid={!!errors.descricao}
                      aria-describedby={errors.descricao ? "descricao-error" : undefined}
                      className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] p-3 text-sm text-[#0f172a] shadow-sm transition placeholder:text-slate-400 focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5] resize-y"
                      {...register("descricao")}
                    />
                    {errors.descricao && (
                      <p id="descricao-error" role="alert" className="text-xs font-medium text-red-600">
                        {errors.descricao.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="acessibilidade" className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                      Características de acessibilidade
                    </label>
                    <select
                      id="acessibilidade"
                      aria-label="Escolha as opções de acessibilidade"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                      onChange={(e) => setValue("caracteristicasAcessibilidade", [e.target.value])}
                    >
                      <option value="">Escolha as opções de acessibilidade</option>
                      <option value="Rampa de Acesso">Rampa de Acesso</option>
                      <option value="Banheiro Acessível">Banheiro Acessível</option>
                      <option value="Vagas Reservadas">Vagas Reservadas</option>
                    </select>
                  </div>
                </section>

                {/* Coluna 2: Endereço & Imagem */}
                <div className="space-y-6">
                  <section aria-labelledby="sec-endereco" className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff2e7] text-[#f39a4f]">
                        <Icon name="location" />
                      </span>
                      <h2 id="sec-endereco" className="text-[1.8rem] font-bold leading-none text-[#1f2937]">
                        Endereço e localização
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="cep" className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                          CEP
                        </label>
                        <input
                          id="cep"
                          type="text"
                          placeholder="57300-000"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition placeholder:text-slate-400 focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                          {...register("cep")}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="estado" className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                          Estado
                        </label>
                        <input
                          id="estado"
                          type="text"
                          placeholder="Alagoas"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition placeholder:text-slate-400 focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                          {...register("estado")}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="cidade" className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                          Cidade
                        </label>
                        <input
                          id="cidade"
                          type="text"
                          placeholder="Arapiraca"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition placeholder:text-slate-400 focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                          {...register("cidade")}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="bairro" className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                          Bairro
                        </label>
                        <input
                          id="bairro"
                          type="text"
                          placeholder="Ex: Centro"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition placeholder:text-slate-400 focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                          {...register("bairro")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="endereco" className="flex items-center gap-2 text-sm font-semibold text-[#1f2937]">
                        Endereço
                      </label>
                      <input
                        id="endereco"
                        type="text"
                        placeholder="Ex: Rua Principal, 123"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-sm text-[#0f172a] shadow-sm transition placeholder:text-slate-400 focus:border-[#f59e0b] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#fcd7a5]"
                        {...register("endereco")}
                      />
                    </div>
                  </section>

                  <section aria-labelledby="sec-imagem" className="space-y-3">
                    <div className="flex items-center gap-3 text-[1.05rem] font-semibold text-[#1f2937]">
                      <span className="text-[#f39a4f]">
                        <Icon name="upload" />
                      </span>
                      <h3 id="sec-imagem" className="text-xl font-bold text-[#1f2937]">
                        Imagem de capa
                      </h3>
                    </div>
                    <p className="text-xs text-[#6b7280]">
                      Selecione um banner para destacar seu espaço esportivo
                    </p>

                    <input
                      ref={fileInputRef}
                      id="imagemCapa"
                      type="file"
                      accept="image/png, image/jpeg"
                      className="sr-only"
                      onChange={handleFileChange}
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                      className="flex min-h-[170px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#efb77d] bg-[#fff8f1] px-6 py-8 text-center transition hover:border-[#f39a4f] hover:bg-[#fff3e6] focus:outline-none focus:ring-4 focus:ring-[#f5cba7]/60"
                    >
                      <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5d7b3] text-[#b86a1f]">
                        <Icon name="upload" />
                      </span>
                      <span className="text-lg font-semibold text-[#1f2937]">
                        {fileName ? `Arquivo selecionado: ${fileName}` : "Clique aqui para enviar uma imagem"}
                      </span>
                      <span className="mt-2 text-xs text-[#6b7280]">
                        Formatos recomendados: PNG ou JPG com proporção 16:9
                      </span>
                    </button>
                  </section>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-xl bg-[#f39a4f] px-10 py-3 text-base font-semibold text-white shadow-[0_8px_18px_rgba(243,154,79,0.32)] transition hover:bg-[#e88c35] focus:outline-none focus:ring-4 focus:ring-[#f5cba7]/60 disabled:cursor-not-allowed disabled:bg-[#fdba74]"
                >
                  {isSubmitting ? "Enviando..." : "Próximo"}
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </main>
  );
}