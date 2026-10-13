# Instruções do Copilot — SportMatch (front-end)

O SportMatch é um sistema web que centraliza competições esportivas em Alagoas, com foco em **inclusão e acessibilidade** (atletas com deficiência visual, mobilidade reduzida, idosos com tremores). Todo código gerado deve respeitar as regras abaixo.

## Stack

- Next.js (App Router) + React + TypeScript (modo `strict`)
- Tailwind CSS para estilos (sem CSS solto)
- react-hook-form + zod (`@hookform/resolvers/zod`) para formulários
- Radix UI quando precisar de componentes complexos (dialog, select, etc.)
- Back-end: API REST em Spring Boot com autenticação JWT (URL em `NEXT_PUBLIC_API_URL`)
- Lint: ESLint com `jsx-a11y`. Todo código deve passar em `npm run lint`

## Estrutura de pastas

Organização por **feature**. Cada feature tem tudo que é seu.

```
src/
  app/                          # rotas; só montam páginas, sem lógica
  components/ui/                # componentes genéricos reutilizáveis
                                # (Button, Input, Select, FormField...)
  features/<feature>/           # ex.: competicao, usuario, espaco
    components/                 # componentes da feature (só UI)
    hooks/                      # estado e orquestração (useXxx)
    schemas/                    # schemas zod
    services/                   # chamadas à API
    types/                      # tipos próprios da feature
  lib/                          # utilitários (cliente http, formatadores)
```

## Regras de arquitetura

1. `page.tsx` apenas renderiza o componente da feature. Nada de lógica ou JSX extenso.
2. Componentes cuidam só de **UI**. Estado, validação e envio ficam em **hooks**.
3. Chamadas HTTP existem apenas em `services/`, usando o cliente em `lib/`. Nunca use `fetch` dentro de componente.
4. Cada arquivo tem **uma única responsabilidade** e idealmente até ~100 linhas. Se crescer, divida.
5. Antes de criar um componente, verifique se já existe em `components/ui/` ou na feature. Reutilize.
6. Use import absoluto com o alias `@/`. Evite caminhos relativos longos (`../../..`).
7. Use `export default` apenas em `page.tsx`/`layout.tsx`. Nos demais arquivos, use exports nomeados.
8. Marque `"use client"` somente nos componentes que realmente precisam (hooks, eventos). Prefira Server Components.

## TypeScript

- Proibido `any`. Use `unknown` e faça o estreitamento de tipo.
- Os tipos dos formulários são **inferidos do schema zod** (`z.infer<typeof schema>`). Não duplique tipos à mão.
- Tipe as props de todo componente e o retorno de funções públicas.
- Tipos de respostas da API ficam em `types/`.

## Formulários (react-hook-form + zod)

- Schema em `schemas/<nome>.schema.ts`. Mensagens de erro em português, claras e específicas (ex.: "Informe o número de vagas", não "Campo inválido").
- Use `useForm` com `zodResolver(schema)` e `mode: "onBlur"` ou `"onSubmit"`. Defina sempre `defaultValues`.
- O hook da feature (ex.: `useCadastroCompeticao`) concentra o `useForm`, o `onSubmit`, o estado de envio e o tratamento de erro da API.
- O componente do formulário recebe o resultado do hook e só renderiza.
- Campos numéricos usam `z.coerce.number()`. Datas e horários são validados no schema (ex.: fim depois do início).
- Erros vindos da API são exibidos com `setError` no campo correspondente ou como erro geral do formulário.
- Desabilite o botão de envio durante o submit e informe o estado ao usuário (texto e `aria-busy`).

## Acessibilidade (obrigatório, WCAG 2.2 AA)

- Todo `input`, `select` e `textarea` tem `<label htmlFor>` ligado ao `id`. Nunca use apenas `placeholder` como rótulo.
- Campos obrigatórios: atributo `aria-required="true"` e indicação visível (texto "obrigatório", não apenas cor ou asterisco).
- Erros: `aria-invalid="true"` e `aria-describedby` apontando para o `id` da mensagem. A mensagem usa `role="alert"` (ou fica em região `aria-live`).
- Ao enviar com erro, mova o foco para o **primeiro campo inválido** (`shouldFocusError` do react-hook-form) e/ou para um resumo de erros no topo.
- Agrupe campos relacionados com `<fieldset>` e `<legend>`.
- Use HTML semântico (`main`, `nav`, `section`, `h1`–`h6` em ordem, `button` para ações, `a` para navegação).
- Toda imagem tem `alt` descritivo (ou `alt=""` se for decorativa).
- Área de clique mínima de **44x44px** em botões e controles. Evite elementos pequenos e muito próximos.
- Contraste mínimo de **4.5:1** para texto normal e **3:1** para texto grande e ícones. Não use laranja claro sobre fundo claro.
- Todo o fluxo deve funcionar **somente com teclado**, com foco sempre visível (`focus-visible:ring`). Nunca remova o outline sem substituto.
- Não transmita informação apenas por cor.
- Ao mudar de tela ou concluir uma ação, gerencie o foco e avise leitores de tela (NVDA/VoiceOver).
- Prefira componentes do Radix UI a reimplementar select, dialog e similares.

## Estilo e design

- Mobile-first e responsivo. As telas devem funcionar em celulares comuns.
- Use classes Tailwind. Cores e espaçamentos recorrentes devem virar tokens no tema do Tailwind, sem valores soltos repetidos.
- Siga o design do Figma do SportMatch. Cor de destaque laranja, texto em azul-escuro, cartões brancos sobre fundo cinza-azulado. Ajuste os tons que não passarem no contraste.

## Nomenclatura e código

- Termos do domínio em português: `competicao`, `esporte`, `vagas`, `inscricao`, `espacoEsportivo`, `nivelAcessibilidade`. Termos técnicos em inglês: `hook`, `service`, `schema`.
- Componentes em `PascalCase`, hooks começam com `use`, arquivos de componente com o nome do componente.
- Funções pequenas, nomes que dispensam comentário. Comente só o "porquê" de lógica não óbvia.
- Sem código morto, `console.log` ou valores fixos (URLs, textos repetidos) espalhados pelo código.

## Segurança

- Nunca coloque segredos no código. Variáveis públicas usam o prefixo `NEXT_PUBLIC_`, e `.env.local` nunca é commitado.
- Nunca use `dangerouslySetInnerHTML` com conteúdo vindo do usuário.
- O token JWT não deve ser exposto em logs. Trate respostas 401 redirecionando para o login.

## Como trabalhar

1. Antes de escrever código, liste os arquivos que serão criados ou alterados e o que cada um faz.
2. Gere **um arquivo por vez**, seguindo a estrutura acima.
3. Ao terminar, confirme que `npm run lint` e `npm run build` passam e corrija os avisos.
4. Se uma regra deste arquivo conflitar com o pedido, aponte o conflito antes de seguir.
5. Se faltar informação (campo, endpoint, regra de negócio), pergunte em vez de inventar.

## Regras de negócio relevantes

- Usuários podem ser atletas, organizadores ou locadores de espaço.
- Toda competição tem `nivelAcessibilidade`, e esse valor deve respeitar a regra **RN07** (consistência com a acessibilidade do espaço esportivo escolhido).
- Filtros de competição são por esporte, localização e acessibilidade.
