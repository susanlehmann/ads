import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  private iss = {
    login: '/login',
    signup: '/signup'
  };

  constructor() { }

  handle(token, user) {
    this.set(token, user);
    // this.set(user);
  }




  set(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  get() {
    return localStorage.getItem('token');
  }
  /*

  setUser(user) {
    localStorage.setItem('user', user);
  }


  getUser() {
    return localStorage.getItem('user');
  }

  remove() {
    localStorage.removeItem('token');
  }
  */

  getUser() {
    return localStorage.getItem('user');
  }


  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }
  // this.token.payload(get())   ==> Return Second token ??
  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}
