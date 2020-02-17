import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-pessoas',
  templateUrl: './pesquisa-pessoas.component.html',
  styleUrls: ['./pesquisa-pessoas.component.css']
})
export class PesquisaPessoasComponent {
  pessoas = [
    {nome : "Maike Bezerra", cidade : "Jucás", estado: "CE", status : true}
  ];

}
