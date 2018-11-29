import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { LoginModel } from '../../app/models/LoginModel';
import { TabsPage } from '../tabs/tabs';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginData:LoginModel = new LoginModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertHelper: AlertHelperProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  clickLogin() {
    this.loginData.password = "TestPassw";
    this.loginData.username = "TestUsername";

    this.navCtrl.push(TabsPage);

    this.showError("Login Erfolgreich");
  }

  showError(text:string) {
    this.alertHelper.sendAlert("Error",text);
    //this.alertHelper.loadingAnimation();
    //this.alertHelper.test();
  }
}
