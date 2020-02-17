import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styles: []
})
export class PessoaListComponent implements OnInit {
  
  pessoas = [
    {nome : "Maike Bezerra", cidade : "Jucás", estado: "CE", status : true}
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
