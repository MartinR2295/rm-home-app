import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';

/*
  Generated class for the ObjectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ObjectProvider extends BaseProvider {

  public backpointURL: String = BaseProvider.backpointURL;

  /** Calls a GET with passed data and options
   * @param data 
   * @param options optional
   * @param route the route (eg. object)
   */
  getObject(route, data, options = this.getHeaders()) {
   return this.http.get(BaseProvider.backpointURL + `/${route}`, data, options)
  }

  /** Calls a DELETE with passed data and options
   * @param data 
   * @param options 
   * @param route the route (eg. object)
   */
  deleteObject(route, data, options = {}) {
   return this.http.delete(BaseProvider.backpointURL + `/${route}`, data, options)
    .then(res => {
      console.log(res.data); // data received by server
      return res;
    })
    .catch(error => {
      console.log(error.error); // error message as string
      return error;
    });   
  }  

  /** Calls a POST on passed data and options
   * @param data 
   * @param options 
   * @param route the route (eg. object)
   */
  addObject(route, data, options = {}) {
    console.log(BaseProvider.backpointURL + `/${route}`);
   return this.http.post(BaseProvider.backpointURL + `/${route}`, data, options)
   
  }
  /** Calls a UPDATE on passed data and options
   * @param data 
   * @param options 
   * @param route the route (eg. object)
   */
  updateObject(route, data, options = {}) {
    console.log(BaseProvider.backpointURL + `/${route}`);
   return this.http.put(BaseProvider.backpointURL + `/${route}`, data, options)
    .then(res => {
      console.log(res.data); // data received by server
      return res;
    })
    .catch(error => {
      console.log(error.error); // error message as string
      return error;
    });    
  }

  /** Search Query, calls GET with passed data and options
   * @param data 
   * @param options 
   * @param route the route (eg. object)
   */
  searchObject(route) {
    return this.http.get(BaseProvider.backpointURL + `/${route}`,null,this.getHeaders())
    // .then(res => {
    //   console.log(res.data); // data received by server
    //   return JSON.parse(res.data);
    // })
    // .catch(error => {
    //   console.log(error.error); // error message as string
    //   return error;
    // });    
  }

  /** gets the object stack
   * @param data 
   * @param options 
   */
  getObjectStack(route, data, options) {
    return this.http.get(BaseProvider.backpointURL + `/${route}`,null,this.getHeaders())
  }  
}
