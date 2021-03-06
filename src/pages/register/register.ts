import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, HideWhen } from 'ionic-angular';
import { RegisterModel } from '../../app/models/RegisterModel';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { ObjectProvider } from '../../providers/object/object';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { LoginModel } from '../../app/models/LoginModel';
import { SessionProvider } from '../../providers/session/session';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

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
  errorMessages:any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertHelper: AlertHelperProvider, 
    public authProvider:AuthProvider, 
    public objProvider: ObjectProvider, 
    public session: SessionProvider,
    private spinnerDialog: SpinnerDialog ) {
  }

  /**
   * Function für die Registrierung eines neuen Benutzers
   */
  clickButtonRegister(){
    let loginModel = new LoginModel();
    loginModel.username = this.registerData.user_username
    loginModel.password = this.registerData.user_password

    if(this.registerData.user_password == this.passwordWh){
      this.spinnerDialog.show();
      this.errorMessages = null;
      this.objProvider.post('https://rm-home.rmst.eu/users',this.registerData)
      .then((result) => {
        this.spinnerDialog.hide();
          this.alertHelper.sendAlert("Registriert","Sie wurden erfolgreich Registriert",[{text: "Ok", handler: () => {
            this.spinnerDialog.show();
            this.authProvider.getAuthToken(loginModel, (status: Number, response) => {
              this.spinnerDialog.hide();
              if(status == 200) {
                this._saveToSession(response);
                this.navCtrl.push(TabsPage);
              }
            }); 
        }}]);
      })
      .catch((error) => {
      this.spinnerDialog.hide();
      this.errorMessages = JSON.parse(error.error).error.message;

      });
    }
    else
    {
      this.errorMessages = [];
      this.errorMessages.push("Passwörter müssen übereinstimmen!");
    }
     
}
  /**
   * Saves passed response from login to the session provider,
   * making it available application wide
   * @param data 
   */
  _saveToSession(data) {
    this.session.saveSession(JSON.parse(data.data).body);
    this.session.setAuthenticated(JSON.parse(data.data).body);
    this.session.setUser(JSON.parse(data.data).body.user);
  }
  
}
