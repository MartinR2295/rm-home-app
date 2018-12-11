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

  getUserData() {
    return this.http.get(BaseProvider.backpointURL + "/user",null,this.getHeaders()).then((item: any) => {
      var userData:UserModel = new UserModel()
      userData.user_email = JSON.parse(item.data).body.user_email;
      userData.user_username = JSON.parse(item.data).body.user_username;
      return userData;
    })
  }

  updateUserData(userModel:UserModel) {
    return this.http.put(BaseProvider.backpointURL + "/user",userModel,this.getHeaders())
  }

}
