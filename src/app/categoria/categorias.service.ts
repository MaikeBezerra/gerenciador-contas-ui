import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http : HttpClient) { }

  listar() : Promise<any> {

    return this.http.get(`${this.categoriaUrl}`)
      .toPromise()
      .then(response => response);
  }

}
