import { Component } from '@angular/core';

import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibirMenu = false;
  
  constructor(
      private auth: AuthService,
      private logoutService: LogoutService,
      private error: ErrorHandlerService,
      private router: Router){}
  
  usuario = this.auth.jwtPlayload.nome

  hasAuthority(permissao: string){
    return this.auth.temPermissao(permissao);
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.error.handle(erro));
  }
}
