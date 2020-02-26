import { Component, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Table } from 'primeng/table/table';
import { MessageService, ConfirmationService } from 'primeng/api';

import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  providers: [MessageService]
})
export class LancamentosPesquisaComponent {
  
  @ViewChild('tabela', {static: true}) tabela: Table;
  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  lancamentos = [];

  constructor(
    private lancamentoService: LancamentoService,
    private erroHandler : ErrorHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total; 
        this.lancamentos = resultado.lancamentos
      }).catch(erro => this.erroHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(id: number) {
    this.confirmationService.confirm({
      message: 'Realmente deseja excluir o lancamento?',
      acceptLabel : 'Sim',
      rejectLabel : 'Não',
      accept: () => {
          this.excluirLancamento(id);
      }
    });
  }

  private excluirLancamento(id : number){
    this.lancamentoService.excluir(id)
      .then(() => {
        this.tabela.reset();
        this.messageService.add(
          { 
            key: 'del',
            severity:'success', 
            summary: 'Lançamento excluido com sucesso!',
            life: 3000
          })
      }).catch(erro => this.erroHandler.handle(erro));
  }
}
  