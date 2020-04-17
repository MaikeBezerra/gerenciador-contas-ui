import { Component } from '@angular/core';

import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibirMenu = false;
  
  constructor(private auth: AuthService){}
  
  usuario = this.auth.jwtPlayload.nome

  hasAuthority(permissao: string){
    return this.auth.temPermissao(permissao);
  }
}
