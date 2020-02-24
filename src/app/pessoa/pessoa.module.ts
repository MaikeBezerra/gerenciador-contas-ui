import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { PesquisaPessoasComponent } from './pesquisa-pessoas/pesquisa-pessoas.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CadastroPessoaComponent,
    PesquisaPessoasComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    CadastroPessoaComponent,
    PesquisaPessoasComponent
  ]
})
export class PessoaModule { }
