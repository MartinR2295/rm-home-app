import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class BaseProvider {
  static readonly backpointURL = "http://rm-home.rmst.eu";
  constructor(public http: HTTP) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('rCBst3ERrvYYsj59C9PnN7VNMvvfgr4n54', 'KcUt52Q6JC9PVeAFkwh63946k8CBt6ss'); 
  }

  get(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, data, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
