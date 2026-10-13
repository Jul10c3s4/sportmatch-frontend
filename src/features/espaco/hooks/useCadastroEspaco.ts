import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { espacoSchema } from "../schemas/espaco.schema";
import { CadastroEspacoFormData } from "../types/espaco";
import { espacoService } from "../services/espaco.service";

export function useCadastroEspaco() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const form = useForm<CadastroEspacoFormData>({
    resolver: zodResolver(espacoSchema),
    defaultValues: {
      nome: "",
      tiposEspaco: [],
      esportePrincipal: "",
      descricao: "",
      caracteristicasAcessibilidade: [],
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      endereco: "",
    },
  });

  const onSubmit = async (data: CadastroEspacoFormData) => {
    setIsSubmitting(true);
    setFeedbackMessage(null);
    try {
      await espacoService.cadastrar(data);
      setFeedbackMessage("Espaço cadastrado com sucesso!");
    } catch (error) {
      setFeedbackMessage("Erro ao cadastrar o espaço. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, onSubmit: form.handleSubmit(onSubmit), isSubmitting, feedbackMessage };
}