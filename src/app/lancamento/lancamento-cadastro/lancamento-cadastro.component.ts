import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { CategoriasService } from '../../categoria/categorias.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoasService} from '../../pessoa/pessoas.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';

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
      private pessoaService: PessoasService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title){ }

  ngOnInit() {
    this.title.setTitle('Novo lançamento')

    const codigoLancamento = this.route.snapshot.params['id'];

    if (codigoLancamento) {
      this.atualizarTitilo();
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }
  
  get editando() : boolean {
    return Boolean(this.lancamento.id)
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
      .then(lancamento => {
        this.lancamento = lancamento;
      })
      .catch(erro => this.erroHandler.handle(erro));
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

  salvar(form : NgForm) {
    if(this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.salvarLancamento(form);
    }
  }

  salvarLancamento(form: NgForm) {

    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamento => {
        this.messageService.add(
          { 
            key: 'salvar',
            severity:'success', 
            summary: 'Lançamento adicionado com sucesso!',
            life: 3000
          })
        
        this.router.navigate(['/lancamentos', lancamento.id]);
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  atualizarLancamento(form : NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.messageService.add(
          { 
            key: 'salvar',
            severity:'success', 
            summary: 'Lançamento editado com sucesso!',
            life: 3000
          })
        this.lancamento = lancamento;
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTitilo(){
    this.title.setTitle('Edição de Lançamento');
  }

}
