import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface LancamentoFiltro {
  descricao : string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';

  constructor(private http : HttpClient) { }

  pesquisar(filtro : LancamentoFiltro) : Promise<any> {
    let params = new HttpParams;
    const headers = new HttpHeaders({'Authorization': 'Basic YWRtaW46YWRtaW4='});
   
    if (filtro.descricao) {
      params = new HttpParams().set('descricao', filtro.descricao);
    } 

    return this.http.get(`${this.lancamentoUrl}`, {headers, params})
      .toPromise()
      .then(response => response['content']); 
  }
}
