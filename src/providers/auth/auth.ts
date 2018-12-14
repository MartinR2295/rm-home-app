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
      //return res;
      return res;
    })
    .catch(error => {
      callback(error.status, error);
      return error;
    });
  }

 

  logout() {
    this.session.logout();  
  }
}
