import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { UserModel } from '../../app/models/UserModel';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider extends BaseProvider {

  //Aufruf auf die API um die Userdaten des angemeldeten Benutzers auszulesen
  getUserData() {
    return this.http.get(BaseProvider.backpointURL + "/user",null,this.getHeaders()).then((item: any) => {
      var userData:UserModel = new UserModel()
      userData.user_email = JSON.parse(item.data).body.user_email;
      userData.user_username = JSON.parse(item.data).body.user_username;
      return userData;
    })
  }

  //Aufruf auf die API um die Userdaten aktuallisieren zu Können
  //Parameter mit dem UserModel (Inhalte sind Benutzername und E-Mail)
  updateUserData(userModel:UserModel) {
    return this.http.put(BaseProvider.backpointURL + "/user",userModel,this.getHeaders());
  }

  //Aufruf auf die APi um das Passwort zurückzusetzen
  //Parameter mit dem UserModel (Inhalte sind Benutzername, E-Mail und Passwort)
  resetUserPassword(userModel:UserModel) {
    return this.http.post(BaseProvider.backpointURL + "/password/reset", userModel, this.getHeaders()).then((item: any) => {
      return JSON.parse(item.data).body;
    });
  }

}
