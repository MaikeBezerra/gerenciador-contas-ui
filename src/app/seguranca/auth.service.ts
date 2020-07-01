import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPlayload: any;

  constructor(
    private http: HttpClient, 
    private jwtHelper: JwtHelperService
    ) { 
      this.carregarToken();
    }

  login(usuario: string, senha: string): Promise<void> {
    const headers = 
        new HttpHeaders({
          'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
          'Content-Type' : 'application/x-www-form-urlencoded'
        });
    
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, 
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        const responseError = response.error;
        if(response.status === 400) {
          if(responseError.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {    
    const headers = 
        new HttpHeaders({
          'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
          'Content-Type' : 'application/x-www-form-urlencoded'
        });

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response['access_token']);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPlayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string){
    return this.jwtPlayload && this.jwtPlayload.authorities.includes(permissao);
  }

  temAlgumaPermissao(permissoes) {
    for(const permissao of permissoes) {
      if(this.temPermissao(permissao)){
        return true;
      }
    }
    return false;
  }

  private armazenarToken(token: string){
    this.jwtPlayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
