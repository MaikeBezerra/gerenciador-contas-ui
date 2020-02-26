import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriasService } from '../../categoria/categorias.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoasService} from '../../pessoa/pessoas.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit{
  tipos = [
    {label: 'Receita', value : 'RECEITA'},
    {label: 'Despesa', value : 'DESPESA'}
  ]

  pessoas = [];
  categorias = [];
  lancamento = new Lancamento();

  constructor(
      private categoriaService: CategoriasService,
      private lancamentoService: LancamentoService,
      private messageService: MessageService,
      private erroHandler: ErrorHandlerService,
      private pessoaService: PessoasService){ }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarPessoas() {    
    return this.pessoaService.listarPessoas()
      .then(pessoas => {
        this.pessoas = 
          pessoas.map( pessoa => ({
            label: pessoa.nome, value: pessoa.id
          }))
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listar()
      .then(categorias => {
        this.categorias = 
          categorias.map(categoria => ({ 
            label: categoria.nome, value: categoria.id 
          }))
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  salvar(form: NgForm) {

    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messageService.add(
          { 
            key: 'salvar',
            severity:'success', 
            summary: 'Lançamento adicionado com sucesso!',
            life: 3000
          })
        
        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.erroHandler.handle(erro));
  }
}
