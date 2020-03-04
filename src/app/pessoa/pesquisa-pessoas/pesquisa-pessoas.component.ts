import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table/table';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaFiltro, PessoasService } from '../pessoas.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pesquisa-pessoas',
  templateUrl: './pesquisa-pessoas.component.html',
  styleUrls: ['./pesquisa-pessoas.component.css']
})
export class PesquisaPessoasComponent implements OnInit{
  
  @ViewChild('tabela', {static: true}) tabela: Table;
  pessoas = [];
  totalRegistros = 0;
  filtro = new PessoaFiltro();

  constructor(
      private pessoaService : PessoasService,
      private erroHandler : ErrorHandlerService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Pessoas')
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total; 
        this.pessoas = resultado.pessoas
      }).catch(erro => this.erroHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(id: number) {
    this.confirmationService.confirm({
      message: 'Realmente deseja excluir essa Pessoa?',
      acceptLabel : 'Sim',
      rejectLabel : 'Não',
      accept: () => {
          this.excluirPessoa(id);
      }
    });
  }

  mudarStatus(pessoa : any) {
    let novoStatus = !pessoa.ativo;
    
    this.pessoaService.mudarStatus(pessoa.id, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativo' : 'inativo';

        pessoa.ativo = novoStatus;
        this.messageService.add(
          { 
            key: 'del',
            severity:'success', 
            summary: `Status alterado para ${acao} com sucesso!`,
            life: 3000
          })
      }).catch(erro => this.erroHandler.handle(erro));
  }

  private excluirPessoa(id : number){
    this.pessoaService.excluir(id)
      .then(() => {
        this.tabela.reset();
        this.messageService.add(
          { 
            key: 'del',
            severity:'success', 
            summary: 'Pessoa excluida com sucesso!',
            life: 3000
          })
      }).catch(erro => this.erroHandler.handle(erro));
  }

}
