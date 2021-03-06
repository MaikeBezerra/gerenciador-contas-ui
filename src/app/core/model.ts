export class Pessoa {
  id: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
  contatos = new Array<Contato>();
}

export class Contato {
  id: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(id?: number,
    nome?: string,
    email?: string,
    telefone?: string) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
  }
}

export class Estado {
  id: number;
  nome: string
}

export class Cidade {
  id: number;
  nome: string
  estado = new Estado();
}

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();
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