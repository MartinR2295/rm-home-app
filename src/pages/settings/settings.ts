import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterModel } from '../../app/models/RegisterModel';
import { SessionProvider } from '../../providers/session/session';
import { BaseProvider } from '../../providers/base/base';
import { UserProvider } from '../../providers/user/user';
import { UserModel } from '../../app/models/UserModel';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  userData:UserModel = new UserModel();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public app: App, 
    public session:SessionProvider, 
    public userProvider:UserProvider,
    public baseProvider:BaseProvider,
    public alertHelper:AlertHelperProvider,
    private spinnerDialog: SpinnerDialog 
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage'); 
    this.getUser(); 
  }

  clickLogout() {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
    this.app.getRootNav().setRoot(LoginPage);
    this.session.logout()
  }

  clickSave(){
    this.spinnerDialog.show();
    //userData:UserModel
    this.userProvider.updateUserData(this.userData)
    .then((item: any) => {
      this.spinnerDialog.hide();
      this.alertHelper.sendAlert("Erfolg","Daten wurden erfolgreich gespeichert");
      this.userData.user_email = JSON.parse(item.data).body.user_email;
      this.userData.user_username = JSON.parse(item.data).body.user_username;
    }).catch(error => {
      this.spinnerDialog.hide();
      console.log("error",error); // error message as string
      return error;
  });
}

  getUser(){
    this.spinnerDialog.show()
    this.userProvider.getUserData().then((item: UserModel) => {
      this.spinnerDialog.hide();
      this.userData = item;
    }).catch(error => {
        this.spinnerDialog.hide();
        console.log("error",error); // error message as string
        return error;
    });
  }

  _saveToSession(data) {
    this.session.setUser(JSON.parse(data.data).body.user);
  }
}
