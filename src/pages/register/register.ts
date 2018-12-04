import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterModel } from '../../app/models/RegisterModel';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { ObjectProvider } from '../../providers/object/object';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

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

  passwordWh:string;
  registerData:RegisterModel = new RegisterModel();
  errorMessage:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertHelper: AlertHelperProvider, public authProvider:AuthProvider, public objProvider: ObjectProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /**
   * Function für die Registrierung eines neuen Benutzers
   */
  clickButtonRegister(){
    if(this.registerData.user_password == this.passwordWh){
      this.errorMessage = null;
      this.objProvider.post('https://rm-home.rmst.eu/users',this.registerData)
      .then((result) => {
        console.log("success");
          this.alertHelper.sendAlert("Registriert","Sie wurden erfolgreich Registriert",[{text: "Ok", handler: () => {
          this.navCtrl.push(TabsPage);
        }}]);

      })
      .catch((error) => {
      this.errorMessage = JSON.parse(error.error).error.message;
       console.log(JSON.parse(error.error).error.message);
       
      });
    }
    else
    {
      this.errorMessage.push("Passwörter müssen übereinstimmen!");
    }
     
}

}
