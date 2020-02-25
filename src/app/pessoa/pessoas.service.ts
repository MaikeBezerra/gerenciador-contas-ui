import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http : HttpClient) { }

  pesquisar(filtro : PessoaFiltro) : Promise<any> {
    const params = new HttpParams()
      .set('nome', filtro.nome ? filtro.nome : "")
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());
      
    const headers = new HttpHeaders({'Authorization': 'Basic YWRtaW46YWRtaW4='});

    return this.http.get(`${this.pessoasUrl}`, {headers, params})
      .toPromise()
      .then(response => {
        const pessoas = response['content'];
        const resultado = {
          pessoas, 
          total: response['totalElements']
        }
        return resultado;
      }); 
  }

  excluir(id: number): Promise<void> {
    const headers = new HttpHeaders({'Authorization': 'Basic YWRtaW46YWRtaW4='});
    return this.http.delete(`${this.pessoasUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null);
  }

  mudarStatus(id: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders({
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
        'Content-Type': 'application/json'
      });

    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo, {headers})
      .toPromise()
      .then(() => null);
  }
}