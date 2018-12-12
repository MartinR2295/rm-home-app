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
   let token = '755dfce463d3dac8901e1789cd65ac36774dfdb878a8457c618f77be28729755ed625a70fba775c29a3f694c41467cf068574f1d888bfae769a7e6d564ecf480';
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
