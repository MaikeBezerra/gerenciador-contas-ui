import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment'

import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao : string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(private http : HttpClient) { }

  pesquisar(filtro : LancamentoFiltro) : Promise<any> {
    const params = new HttpParams()
      .set('descricao', filtro.descricao ? filtro.descricao : '')
      .set('dataVencimentoDe', filtro.dataVencimentoInicio ? 
            moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD') : '')
      .set('dataVencimentoAte', filtro.dataVencimentoFim ? 
            moment(filtro.dataVencimentoFim).format('YYYY-MM-DD') : '')
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());
    //const headers = new HttpHeaders({'Authorization': 'Basic YWRtaW46YWRtaW4='});
   
    return this.http.get(`${this.lancamentoUrl}`, {params})
      .toPromise()
      .then(response => {
        const lancamentos = response['content'];
        const resultado = {
          lancamentos, 
          total: response['totalElements']
        }
        return resultado;
      }); 
  }

  excluir(id: number): Promise<void> {
    const headers = new HttpHeaders({'Authorization': 'Basic YWRtaW46YWRtaW4='});
    return this.http.delete(`${this.lancamentoUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW46YWRtaW4=',
      'Content-Type': 'application/json'
    });

    lancamento.dataVencimento = this.converteDataParaString(lancamento.dataVencimento);
    lancamento.dataPagamento = this.converteDataParaString(lancamento.dataPagamento);

    return this.http.post(this.lancamentoUrl,
        JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;
        return lancamento;
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento>{
    const headers = this.headersBasic();
    
    lancamento.dataVencimento = this.converteDataParaString(lancamento.dataVencimento);
    lancamento.dataPagamento = this.converteDataParaString(lancamento.dataPagamento);

    return this.http.put(`${this.lancamentoUrl}/${lancamento.id}`, 
        JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;
        return lancamento;
      });
  }

  buscarPorId(id: number): Promise<Lancamento>{
    return this.http.get(`${this.lancamentoUrl}/${id}`)
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;

        lancamento.dataVencimento = this.converteStringParaData(lancamento.dataVencimento);
        lancamento.dataPagamento = this.converteStringParaData(lancamento.dataPagamento);

        return lancamento;
      });
  }

  private converteStringParaData(data: string) : Date {
    if(data) {
      return moment(data, 'YYYY-MM-DD').toDate();
    }
  }

  private converteDataParaString(data: string) : string {
    if(data) {
      return moment(data).format('DD/MM/YYYY');
    }
  }

  private headersBasic() : HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic YWRtaW46YWRtaW4=',
      'Content-Type': 'application/json'
    });
  }
}
