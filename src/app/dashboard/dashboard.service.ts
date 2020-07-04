import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentoUrl = "http://localhost:8080/lancamentos"

  constructor(private http: HttpClient) { }

  lancamentosPorCategoria() : Promise<Array<any>> {
    return this.http.get(`${this.lancamentoUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  lancamentosPorDia() : Promise<Array<any>> {
    return this.http.get(`${this.lancamentoUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response as Array<any>;
        this.converterStringParaDatas(dados);

        return dados;
      });
  }
  converterStringParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
