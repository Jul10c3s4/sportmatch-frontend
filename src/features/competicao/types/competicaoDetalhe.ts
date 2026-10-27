export type CompeticaoDetalhe = {
  id: string;
  nome: string;
  esporte: string;
  modalidade: string;
  categoria: string;
  subcategoria: string;
  formato: string;
  nivelAcessibilidade: string;
  atletasPorEquipe: {
    maximo: number;
    minimo: number;
  };
  atletasInscritos: number;
  limiteAtletas: number;
  valorInscricao: number;
  espacoEsportivo: string;
  endereco: string;
  cidade: string;
  dataInicioInscricoes: string;
  dataFimInscricoes: string;
  dataInicio: string;
  dataFim: string;
  horarioInicio: string;
  horarioFim: string;
};
