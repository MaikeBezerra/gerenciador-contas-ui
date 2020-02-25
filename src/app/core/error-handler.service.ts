import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private message : MessageService) { }

  handle(erroResponse: HttpErrorResponse) { 
    if (erroResponse.error[0]) {
      this.emiteMessage(erroResponse.error[0].messageUsuario);
    } else {
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
