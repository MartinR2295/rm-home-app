import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginModel } from '../../app/models/LoginModel';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpResponse } from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  clickLogin() {
    let that = this;
    this.authProvider.getAuthToken(this.loginData, function(status:Number, response) {
      if(status == 200) {
        that.navCtrl.push(TabsPage);
      } else {
        console.error("credentials error");
      }
    });
  }
}
