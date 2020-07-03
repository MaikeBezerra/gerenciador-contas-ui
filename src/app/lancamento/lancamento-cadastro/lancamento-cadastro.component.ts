import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formulario: FormGroup;

  constructor(
      private categoriaService: CategoriasService,
      private lancamentoService: LancamentoService,
      private messageService: MessageService,
      private erroHandler: ErrorHandlerService,
      private pessoaService: PessoasService,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title,
      private formBuilder: FormBuilder){ }

  ngOnInit() {
    this.configurarFormulario();

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
    return Boolean(this.formulario.get('id').value)
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [null, [ Validators.required, Validators.minLength(5) ]],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        id: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        id: [ null, Validators.required ],
        nome: []
      }),
      observacao: []
    });
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
      .then(lancamento => {
        this.formulario .patchValue(lancamento);
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

  salvar() {
    if(this.editando) {
      this.atualizarLancamento();
    } else {
      this.salvarLancamento();
    }
  }

  salvarLancamento() {

    this.lancamentoService.adicionar(this.formulario.value)
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

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        this.messageService.add(
          { 
            key: 'salvar',
            severity:'success', 
            summary: 'Lançamento editado com sucesso!',
            life: 3000
          });
        this.formulario.patchValue(lancamento);
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTitilo(){
    this.title.setTitle('Edição de Lançamento');
  }

}
