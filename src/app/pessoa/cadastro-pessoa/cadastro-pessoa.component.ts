import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoasService } from '../pessoas.service';
import { Pessoa } from 'src/app/core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.css']
})
export class CadastroPessoaComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private pessoaService: PessoasService) { }

  ngOnInit(): void {
  }

  cadastrar(form : NgForm) {
    this.pessoaService.salvar(this.pessoa)
    .then(() => {
      this.messageService.add(
        { 
          key: 'salvar',
          severity:'success', 
          summary: 'Pessoa adicionada com sucesso!',
          life: 3000
        })
      
      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.erroHandler.handle(erro));
  }

}
