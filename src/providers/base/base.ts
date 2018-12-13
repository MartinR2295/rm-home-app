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

  getHeaders() {
   let token = '';
   console.log('authenticated IN BASE ', this.session.authenticated, this.session);
   console.log(this.session.getToken())
   if ('authenticated' in this.session) {
       token = this.session.authenticated.token;
       console.log('TOKEN is here', token);
   }

   if(token == undefined) {
     token = "";
   }

   let headers = {
    "api-key": "KcUt52Q6JC9PVeAFkwh63946k8CBt6ss",
    //'auth-token': token
    'auth-token': "050d0f7356aa413c65aabb24ff74a4af33ee4f9b34a51d9eb511e1466728a6f092378bdccff749d71ea283aa0994c3a0316ae3bd1cbb325abb2521f2884a48e4"
  }

  console.log("headers", headers);

    return headers;
  }

  get(url, data) {
    return this.http.get(url, data, this.getHeaders());
  }

  post(url, data) {
    return this.http.post(url, data, this.getHeaders());
  }
}
