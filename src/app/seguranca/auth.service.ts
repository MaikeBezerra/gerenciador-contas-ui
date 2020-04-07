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

    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then(response => {
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        console.log(response);
      });
  }

  private armazenarToken(token: string){
    console.log(token);

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
