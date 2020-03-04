import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PesquisaPessoasComponent } from './pesquisa-pessoas/pesquisa-pessoas.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';

const routes: Routes = [
    { path: 'pessoas', component: PesquisaPessoasComponent },
    { path: 'pessoas/nova', component: CadastroPessoaComponent },
    { path: 'pessoas/:id', component: CadastroPessoaComponent },

];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class PessoasRoutingModule { }