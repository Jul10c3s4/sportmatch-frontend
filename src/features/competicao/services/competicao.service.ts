import { httpClient } from "@/lib/http";
import type { CompeticaoFormValues } from "@/features/competicao/types/competicao";

export async function criarCompeticao(
  payload: CompeticaoFormValues,
): Promise<{ message: string }> {
  const response = await httpClient.post<{ message: string }>(
    "/competicoes",
    payload,
  );

  return response;
}
