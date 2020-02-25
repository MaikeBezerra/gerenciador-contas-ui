import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService, ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

@NgModule({
  declarations: [ NavbarComponent],
  imports: [
    CommonModule,
  ],
  exports: [ NavbarComponent ],
  providers: [
    MessageService,
    ConfirmationService,
    ErrorHandlerService
  ]
})
export class CoreModule { }
