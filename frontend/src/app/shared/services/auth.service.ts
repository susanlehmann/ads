import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
@Injectable()
export class _AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  baseUrl = environment.baseUrl;

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  constructor(private Token: TokenService,
  	private http: HttpClient) { }


  loginSocial(user){
  	return this.http.post<any>(this.baseUrl + '/login/social', user);
  }

}
