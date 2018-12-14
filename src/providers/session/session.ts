import { Injectable } from '@angular/core';
import { LoginModel } from '../../app/models/LoginModel';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {

  public user:LoginModel = new LoginModel();
  public isAuthenticated:Boolean = false;
  public authenticated: any;
  public secureStorage: SecureStorage = new SecureStorage();

  constructor() { }

  /**
   * Saves the session
   * @param sessionData 
   */
  saveSession(sessionData) {
    this.authenticated = {
      token: sessionData.token,
      refreshToken: sessionData.refresh_token,
    };
    this.secureStorage.create('session').then((storage: SecureStorageObject) => {
      storage.set('authenticated', JSON.stringify(this.authenticated));
      storage.set('user', JSON.stringify(sessionData.user));
      this.isAuthenticated = true;
    })
  }

  /**
   * restores the user and token 
   */
 restore() {
  return  this.secureStorage.create('session').then((storage: SecureStorageObject) => {
      return storage.get('authenticated').then((authenticated: string) => {
       this.authenticated = JSON.parse(authenticated);
       storage.get('user').then((user: string) => {
        this.user = JSON.parse(user);
       })
       this.isAuthenticated = true;
       return true;
     })
     .catch((error) => {
       return false;
     })
 
    })
  }

  setUser(user) {
    this.user = user;
  }

  /**
   * set the local authenticated property to passed 
   * session data containing the token 
   * @param sessionData 
   */
  setAuthenticated(sessionData) {
    this.authenticated = {
      token: sessionData.token,
      refreshToken: sessionData.refresh_token,
    };
  }

  /**
  * clears the local storage and clears session variables containing user and 
  * login information   
  */
  logout() {
    this.secureStorage.create('session').then((storage: SecureStorageObject) => {
      storage.clear();
    });
    this.isAuthenticated = false;
    this.authenticated = {};
  }
}
