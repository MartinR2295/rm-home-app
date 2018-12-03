import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterModel } from '../../app/models/RegisterModel';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { ObjectProvider } from '../../providers/object/object';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerData:RegisterModel = new RegisterModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertHelper: AlertHelperProvider, public authProvider:AuthProvider, public objProvider: ObjectProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  clickButtonRegister(){
    
      this.objProvider.post(this.objProvider.backpointURL +'/users',this.registerData);
  }

}
