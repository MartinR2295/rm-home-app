import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { BaseProvider } from '../../providers/base/base';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { UserModel } from '../../app/models/UserModel';
import { Response } from '@angular/http';

/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

  userData:UserModel = new UserModel();
  errorMessages:any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userProvider:UserProvider,
    public baseProvider:BaseProvider,
    public alertHelper:AlertHelperProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

  clickReset(){
    this.userProvider.resetUserPassword(this.userData).then((item: string) => {
      console.log("Item",item)
      this.alertHelper.sendAlert("Erfolg",item);
    }).catch(error => {
        console.log("error",error); // error message as string
        this.alertHelper.sendAlert("Fehler",JSON.parse(error.error).error.message);
        return error;
    });
  }

}