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

  /** Calls a GET with passed data and options
   * @param data 
   * @param options optional
   */
  getObject(data, options = {}) {
   return this.http.get(BaseProvider.backpointURL, data, options)
    .then(res => {
      console.log(res.data); // data received by server
      return res;
    })
    .catch(error => {
      console.log(error.error); // error message as string
      return error;
    });
  }

  /** Calls a DELETE with passed data and options
   * @param data 
   * @param options 
   */
  deleteObject(data, options = {}) {
   return this.http.delete(BaseProvider.backpointURL, data, options)
    .then(res => {
      console.log(res.data); // data received by server
      return res;
    })
    .catch(error => {
      console.log(error.error); // error message as string
      return error;
    });   
  }  

  /** Calls a UPDATE on passed data and options
   * @param data 
   * @param options 
   */
  updateObject(data, options = {}) {
   return this.http.put(BaseProvider.backpointURL, data, options)
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
   */
  searchObject(data, options = {}) {
    this.http.get(BaseProvider.backpointURL, data, options)
    .then(res => {
      console.log(res.data); // data received by server
      return res;
    })
    .catch(error => {
      console.log(error.error); // error message as string
      return error;
    });    
  }

  /** gets the object stack
   * @param data 
   * @param options 
   */
  getObjectStack(data, options) {
    
  }  
}
