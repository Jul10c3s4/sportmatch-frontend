import { httpClient } from "@/lib/http";
import { CadastroEspacoFormData } from "../types/espaco";

export const espacoService = {
  async cadastrar(data: CadastroEspacoFormData) {
    return httpClient.post<{ message: string }>("/espacos", data);
  },
};