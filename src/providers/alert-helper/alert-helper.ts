import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

//Test Loading Screen
// public loadingCtrl: LoadingController, private splashScreen: SplashScreen

/*
  Generated class for the AlertHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertHelperProvider {

  constructor( public alertCtrl: AlertController) {}

  /**
   * opens an alertbox
   * default button OK
   * @param title 
   * @param body 
   * @param buttons 
   */
  sendAlert(title, body, buttons:any = ['OK']) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: body,
      buttons
    });
    alert.present();
  }

  
  // loadingAnimation() {
  //   let loading = this.loadingCtrl.create({
  //     spinner: 'hide',
  //     content: "Hallo",
  //     duration: 5000
  //   });
  
  //   loading.onDidDismiss(() => {
  //     console.log('Laden abbrechen');
  //   });
  
  //   loading.present();
  // }

}
