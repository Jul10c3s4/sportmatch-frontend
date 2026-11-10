import { httpClient } from "@/lib/http";

export type CriarUsuarioRequest = {
  email: string;
  senha: string;
  tipoUsuario: "atleta" | "organizador" | "locador";
};

export async function criarUsuario(payload: CriarUsuarioRequest) {
  return httpClient.post("/api/usuarios", payload);
}
