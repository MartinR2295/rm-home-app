import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { LoginModel } from '../../app/models/LoginModel';
import { TabsPage } from '../tabs/tabs';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpResponse } from '@angular/common/http';
import { RegisterPage } from '../register/register';
import { RegisterModel } from '../../app/models/RegisterModel';
import { SessionProvider } from '../../providers/session/session';

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
  errorMessage:any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertHelper: AlertHelperProvider,
    public authProvider:AuthProvider,
    public session: SessionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  clickLogin() {
    this.authProvider.getAuthToken(this.loginData, (status: Number, response) => {
      if(status == 200) {
        this._saveToSession(response);
        console.log(this.loginData, 'response: ', response);
        this.navCtrl.push(TabsPage);
      } else {
        this.errorMessage = JSON.parse(error.error).error.message
        this.errorMessage("Benutzername oder Passwort falsch")
        console.error("credentials error");
      }
    });
  }

  clickRegister(){
    this.navCtrl.push(RegisterPage);
  }

  showError(text:string) {
    this.alertHelper.sendAlert("Error",text);
  }

  /**
   * Saves passed response from login to the session provider,
   * making it available application wide
   * @param data 
   */
  _saveToSession(data) {
    this.session.setToken(JSON.parse(data.data).body);
    this.session.setUser(JSON.parse(data.data).body.user);
  }
}
