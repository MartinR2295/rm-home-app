import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { SessionProvider } from '../../providers/session/session';



@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public sessionProvider:SessionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  clickLogout() {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
    this.app.getRootNav().setRoot(LoginPage);
    this.sessionProvider.logout()
  }
}
