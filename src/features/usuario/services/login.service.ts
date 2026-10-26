type CredenciaisLogin = {
  email: string;
  senha: string;
};

export const credenciaisDemo = {
  email: "atleta@sportmatch.com",
  senha: "SportMatch123!",
} as const;

export function autenticarUsuarioMock({
  email,
  senha,
}: CredenciaisLogin): void {
  const emailNormalizado = email.trim().toLowerCase();
  const emailDemo = credenciaisDemo.email.toLowerCase();

  if (emailNormalizado !== emailDemo || senha !== credenciaisDemo.senha) {
    throw new Error("E-mail ou senha incorretos.");
  }
}
