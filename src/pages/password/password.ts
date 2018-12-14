import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { BaseProvider } from '../../providers/base/base';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { UserModel } from '../../app/models/UserModel';
import { Response } from '@angular/http';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

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
    public alertHelper:AlertHelperProvider,
    private spinnerDialog: SpinnerDialog
    ) {
  }

  //Passwort zurücksetzen
  clickReset(){
    this.spinnerDialog.show();
    //API Call auf den User Provider 
    this.userProvider.resetUserPassword(this.userData).then((item: string) => {
      this.spinnerDialog.hide();
      this.alertHelper.sendAlert("Erfolg",item);
    }).catch(error => {
        this.spinnerDialog.hide();
        this.alertHelper.sendAlert("Fehler",JSON.parse(error.error).error.message);
        return error;
    });
  }

}
