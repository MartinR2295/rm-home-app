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

  constructor(private secureStorage: SecureStorage) {
  }


  /**
   * Saves the session
   * @param sessionData 
   */
  saveSession(sessionData) {
    console.log('the sessionData', sessionData);
    this.authenticated = {
      token: sessionData.token,
      refreshToken: sessionData.refresh_token,
    };
    this.secureStorage.create('session').then((storage: SecureStorageObject) => {
      storage.set('authenticated', JSON.stringify(this.authenticated));
      storage.set('user', JSON.stringify(sessionData.user));
      this.isAuthenticated = true;
      console.log('should be token', this.authenticated);
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

  getToken() {
    console.log('getToken', this.authenticated);
    return this.authenticated;
  }

  logout() {
    this.secureStorage.create('session').then((storage: SecureStorageObject) => {
      storage.clear();
    });
    this.isAuthenticated = false;
    this.authenticated = {};
  }
}
