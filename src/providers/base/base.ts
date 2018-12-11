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
   let token = '39be75070992aac40234aadf7684f0966568fac56c54e87f81e6aea676e80c339cc532430ff63954637cd6d5521dd13d9526fd076fa1321fc57783637ad2acae';
   console.log('authenticated IN BASE ', this.session.authenticated, this.session);
   console.log(this.session.getToken())
   if ('authenticated' in this.session) {
       token = this.session.authenticated.token;
       console.log('TOKENS', token);
   }

    return {
      "api-key": "KcUt52Q6JC9PVeAFkwh63946k8CBt6ss",
      'auth-token': token
    }
  }

  get(url, data) {
    return this.http.get(url, data, this.getHeaders());
  }

  post(url, data) {
    return this.http.post(url, data, this.getHeaders());
  }
}
