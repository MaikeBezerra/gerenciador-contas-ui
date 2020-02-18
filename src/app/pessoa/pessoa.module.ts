import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { PesquisaPessoasComponent } from './pesquisa-pessoas/pesquisa-pessoas.component';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';

import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    CadastroPessoaComponent,
    PesquisaPessoasComponent,
    PessoaListComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    TooltipModule
  ],
  exports: [
    CadastroPessoaComponent,
    PesquisaPessoasComponent
  ]
})
export class PessoaModule { }
