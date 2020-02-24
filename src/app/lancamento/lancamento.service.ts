import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment'

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
    const headers = new HttpHeaders({'Authorization': 'Basic YWRtaW46YWRtaW4='});
   
    return this.http.get(`${this.lancamentoUrl}`, {headers, params})
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
}
