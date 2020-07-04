import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
    { 
      path: 'lancamentos', 
      loadChildren: () => import('./lancamento/lancamento.module').then(m => m.LancamentoModule)
    },
  
    { 
      path: 'pessoas', 
      loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule)
    },

    { 
      path: 'dashboard', 
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },

    { 
      path: 'relatorios', 
      loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosModule)
    },

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }