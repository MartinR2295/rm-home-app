import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class BaseProvider {
<<<<<<< HEAD
  static readonly backpointURL = "http://rm-home.rmst.eu";
=======
  static readonly backpointURL = "https://rm-home.rmst.eu";
>>>>>>> dee652bc44d8efa17af8d107693a0d0af92b1f9d
  constructor(public http: HTTP) {}

  getHeaders() {
    return {
      "api-key": "KcUt52Q6JC9PVeAFkwh63946k8CBt6ss"
    }
  }

  get(url, data) {
    return this.http.get(url, data, this.getHeaders());
  }

  post(url, data) {
    return this.http.post(url, data, this.getHeaders());
  }
}
