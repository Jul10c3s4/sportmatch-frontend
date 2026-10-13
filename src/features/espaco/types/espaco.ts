export interface CadastroEspacoFormData {
  nome: string;
  tiposEspaco: string[];
  esportePrincipal: string;
  descricao: string;
  caracteristicasAcessibilidade: string[];
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  endereco: string;
  imagemCapa?: File | null;
}