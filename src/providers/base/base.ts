import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class BaseProvider {
  public readonly backpointURL = "https://rm-home.rmst.eu";
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
