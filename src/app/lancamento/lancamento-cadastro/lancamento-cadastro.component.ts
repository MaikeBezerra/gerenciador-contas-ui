import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent {
  tipos = [
    {label: 'Receita', value : 'RECEITA'},
    {label: 'Despesa', value : 'DESPESA'}
  ]

  pessoas = [
    {label: 'Top Fit', value : 0},
    {label: 'Enel', value : 1}
  ]

  categorias = [
    {label: 'Academia', value : 0},
    {label: 'Conta de Luz', value : 1}
  ]

}
