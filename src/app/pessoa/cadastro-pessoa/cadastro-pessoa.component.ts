import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoasService } from '../pessoas.service';
import { Pessoa, Contato } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  idEstado: number;
  exibindoFormularioContato = false;
  contato: Contato;
  contatoIndex: number;

  constructor(
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private pessoaService: PessoasService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Nova Pessoa');

    const pessoaId = this.route.snapshot.params['id'];
    
    this.carregarEstados();

    if (pessoaId) {
      this.atualizarTitilo();
      this.carregarPessoa(pessoaId);
    }
  }
  
  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.pessoa.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  removerContato(index: number) {
    this.pessoa.contatos.splice(index, 1);
  }

  confirmarContato(frm: NgForm) {
    this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato);

    this.exibindoFormularioContato = false;
    console.log(this.pessoa)

    frm.reset();
  }

  clonarContato(contato: Contato): Contato {
    console.log(contato);
    
    return new Contato(contato.id,
      contato.nome, contato.email, contato.telefone);
  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.id }));
    })
    .catch(erro => this.erroHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.listarCidades(this.idEstado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.id }));
    })
    .catch(erro => this.erroHandler.handle(erro));
  }

  get editando() : boolean {
    return Boolean(this.pessoa.id)
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscarPorId(id)
      .then(pessoa => {
        this.pessoa = pessoa;
  
        this.idEstado = (this.pessoa.endereco.cidade) ?
          this.pessoa.endereco.cidade.estado.id : null;

        if(this.idEstado) {
          this.carregarCidades();
        }
      })
      .catch(erro => this.erroHandler.handle(erro));
  }
 
  nova(form : NgForm){
    form.reset();
    this.pessoa = new Pessoa();

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTitilo() {
    this.title.setTitle('Edição de Pessoa');
  }

  cadastrar(form: NgForm){
    if(this.editando) {
      this.atualizar(form);
    } else {
      this.salvar(form);
    }
  }

  salvar(form : NgForm) {
    this.pessoaService.salvar(this.pessoa)
    .then(() => {
      this.messageService.add(
        { 
          key: 'salvar',
          severity:'success', 
          summary: 'Pessoa adicionada com sucesso!',
          life: 3000
        })
      
      this.router.navigate(['/pessoas', this.pessoa.id]);
    })
    .catch(erro => this.erroHandler.handle(erro));
  }

  atualizar(form : NgForm) {
    
    console.log(this.pessoa)
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa => {
      this.messageService.add(
        { 
          key: 'salvar',
          severity:'success', 
          summary: 'Pessoa editada com sucesso!',
          life: 3000
        })
      
      this.pessoa = pessoa;
    })
    .catch(erro => this.erroHandler.handle(erro));
  }

}
