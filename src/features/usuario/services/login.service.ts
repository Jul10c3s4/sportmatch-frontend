type CredenciaisLogin = {
  email: string;
  senha: string;
};

export const credenciaisDemo = {
  email: "atleta@sportmatch.com",
  senha: "SportMatch123!",
  tipoUsuario: "atleta",
} as const;

export const credenciaisOrganizadorDemo = {
  email: "organizador@sportmatch.com",
  senha: "SportMatch123!",
  tipoUsuario: "organizador",
} as const;

export function autenticarUsuarioMock({
  email,
  senha,
}: CredenciaisLogin): { email: string; tipoUsuario: "atleta" | "organizador" | "locador" } {
  const emailNormalizado = email.trim().toLowerCase();

  const usuarioDemo = [credenciaisDemo, credenciaisOrganizadorDemo].find(
    ({ email: emailDemo, senha: senhaDemo }) =>
      emailNormalizado === emailDemo.toLowerCase() && senha === senhaDemo,
  );

  if (!usuarioDemo) {
    throw new Error("E-mail ou senha incorretos.");
  }

  const perfilUsuario = {
    email: usuarioDemo.email,
    tipoUsuario: usuarioDemo.tipoUsuario,
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem("sportmatch-user", JSON.stringify(perfilUsuario));
  }

  return perfilUsuario;
}
