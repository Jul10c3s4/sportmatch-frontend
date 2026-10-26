"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  perfilSchema,
  type PerfilFormValues,
} from "@/features/usuario/schemas/perfil.schema";

const defaultValues: PerfilFormValues = {
  nomeCompleto: "João Silva",
  nomeSocial: "João",
  perfil: "Atleta",
  genero: "Masculino",
  cpf: "123.456.789-00",
  telefone: "(82) 99999-1234",
  dataNascimento: "1995-11-16",
  cep: "57300-000",
  estado: "Alagoas",
  cidade: "Arapiraca",
  endereco: "Rua Estudante José de Oliveira",
  numero: "150",
  complemento: "Apartamento 302",
};

export function usePerfilUsuario() {
  const [status, setStatus] = useState("");
  const form = useForm<PerfilFormValues>({
    resolver: zodResolver(perfilSchema),
    mode: "onBlur",
    defaultValues,
  });

  const onSubmit = form.handleSubmit(() => {
    setStatus("Alterações salvas com sucesso.");
  });

  return { form, onSubmit, status };
}