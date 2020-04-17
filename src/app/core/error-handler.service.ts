import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private message : MessageService,
    private router: Router) { }

  handle(erroResponse: any) { 
    if (typeof erroResponse === 'string') {
      this.emiteMessage(erroResponse);
    } 
    
    else if (erroResponse instanceof NotAuthenticatedError) {
      this.router.navigate(['/login']);
      this.emiteMessage('Sessão inspirada realize novo Login!');
    }

    else if (erroResponse.error[0]) {
      this.emiteMessage(erroResponse.error[0].messageUsuario);
    } 
    
    else {
      this.emiteMessage('Erro no serviço. Tente novamente depois')
    }
  }

  private emiteMessage( message: string){
    this.message.add({
      key: "toastyError",
      severity:'error',
      summary: message,  
      life : 3000
    });
  }
}
