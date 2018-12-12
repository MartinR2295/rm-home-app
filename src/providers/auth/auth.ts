import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { LoginModel } from '../../app/models/LoginModel';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider extends BaseProvider {
   /** Calls a GET with passed data and options
   * @param data
   * @param options optional
   */

  getAuthToken(loginModel:LoginModel, callback) {
    this.post(BaseProvider.backpointURL+"/auth", loginModel)
    .then(res => {
      callback(res.status, res);
      console.log("then auth token")
      console.log(res.data); // data received by server
      return res;
    })
    .catch(error => {
      console.log(error.error); // error message as string
      console.log("catch auth token");
      console.log(error);
      callback(error.status, error);
      return error;
    });
  }

  logout() {
    this.session.logout();  
  }
}
