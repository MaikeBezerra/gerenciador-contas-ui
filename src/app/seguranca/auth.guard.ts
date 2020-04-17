import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private auth: AuthService,
    private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const permissoes = next.data.roles;
      
      if(this.auth.isAccessTokenInvalido()){
        return this.auth.obterNovoAccessToken()
          .then(() => {
            if(this.auth.isAccessTokenInvalido()){
              this.router.navigate(['login'])
              return false;
            }
            return true;
          });
      }

      else if(permissoes && !this.auth.temAlgumaPermissao(permissoes)){
        this.router.navigate(['/nao-autorizado'])
        return false;
      }

      return true;
  }
  
}
