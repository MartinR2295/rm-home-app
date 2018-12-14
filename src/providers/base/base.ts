import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { SessionProvider } from '../session/session';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class BaseProvider {
  static readonly backpointURL = "https://rm-home.rmst.eu";
  constructor(public http: HTTP, public session: SessionProvider) {}

  /**
   * get Headers for api requests (api-key and auth-token)
   */
  getHeaders() {
   let token = '';
   console.log('authenticated IN BASE ', this.session.authenticated, this.session);
   if ('authenticated' in this.session) { //get token from the session
       token = this.session.authenticated.token;
       console.log('TOKEN is here', token);
   }

   if(token == undefined) {
     token = "";
   }

   let headers = {
    "api-key": "KcUt52Q6JC9PVeAFkwh63946k8CBt6ss",
    'auth-token': token
  }

  console.log("headers", headers);

    return headers;
  }

  /**
   * make a get request
   * @param url 
   * @param data 
   */
  get(url, data) {
    return this.http.get(url, data, this.getHeaders());
  }

  /**
   * make a post request
   * @param url 
   * @param data 
   */
  post(url, data) {
    return this.http.post(url, data, this.getHeaders());
  }
}
