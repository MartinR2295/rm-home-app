import { Injectable } from '@angular/core';
import { LoginModel } from '../../app/models/LoginModel';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {

 public authenticated: any;
 public user:LoginModel = new LoginModel();

  constructor() {
  }

  setToken(sessionData) {
    console.log('SESSIONDATA', sessionData);
    this.authenticated = {
      token: sessionData.token,
      refreshToken: sessionData.refresh_token,
    };
  }

  setUser(user) {
    this.user = user;
  }
}
