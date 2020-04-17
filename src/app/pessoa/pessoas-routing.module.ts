import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PesquisaPessoasComponent } from './pesquisa-pessoas/pesquisa-pessoas.component';
import { CadastroPessoaComponent } from './cadastro-pessoa/cadastro-pessoa.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
    { 
      path: 'pessoas', 
      component: PesquisaPessoasComponent,
      canActivate: [AuthGuard], 
      data:{roles: ['ROLE_PESQUISAR_PESSOA']} 
    },
    { 
      path: 'pessoas/nova', 
      component: CadastroPessoaComponent,
      canActivate: [AuthGuard], 
      data:{roles: ['ROLE_CADASTRAR_PESSOA']} 
    },
    { 
      path: 'pessoas/:id', 
      component: CadastroPessoaComponent,
      canActivate: [AuthGuard], 
      data:{roles: ['ROLE_CADASTRAR_PESSOA']} 
    },

];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class PessoasRoutingModule { }