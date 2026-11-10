export type TipoUsuario = "atleta" | "organizador" | "locador";

export type Usuario = {
  id?: string;
  email: string;
  tipoUsuario?: TipoUsuario;
  criadoEm?: string;
};
