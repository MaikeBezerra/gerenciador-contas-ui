import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';

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
    RouterModule,
    
    ButtonModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    ToastModule,
    DropdownModule,
    PanelModule,
    DialogModule,

    SharedModule,
    PessoasRoutingModule
  ],
  exports: []
})
export class PessoaModule { }
