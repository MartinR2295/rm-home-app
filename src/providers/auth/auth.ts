import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';

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
  getObject(data, options = {}) {
    return this.http.post(BaseProvider.backpointURL+"/", data, options)
     .then(res => {
       console.log(res.data); // data received by server
       return res;
     })
     .catch(error => {
       console.log(error.error); // error message as string
       return error;
     });
   }
}
