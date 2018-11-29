import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

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
  sendAlert(title, body, buttons = ['OK']) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: body,
      buttons
    });
    alert.present();
  }

}
