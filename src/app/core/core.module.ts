import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { MessageService, ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AuthService } from '../seguranca/auth.service';
import { DashboardService } from '../dashboard/dashboard.service'

@NgModule({
  declarations: [ NavbarComponent, PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ NavbarComponent ],
  providers: [
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    AuthService,
    DashboardService,
    Title
  ]
})
export class CoreModule { }
