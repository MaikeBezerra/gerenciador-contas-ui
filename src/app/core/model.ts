export class Pessoa {
  id: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
}

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Categoria {
  id: number;
}

export class Lancamento {
  id: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: any;
  dataPagamento: any;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}