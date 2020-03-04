import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { PesquisaPessoasComponent } from './pesquisa-pessoas/pesquisa-pessoas.component';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CadastroPessoaComponent,
    PesquisaPessoasComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    HttpClientModule,
    
    ButtonModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    ToastModule,
   
    SharedModule,
    PessoasRoutingModule
  ],
  exports: []
})
export class PessoaModule { }
