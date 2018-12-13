import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { ObjectProvider } from '../../providers/object/object';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { QRCodeModel } from '../../app/models/QRCodeModel';
import { SessionProvider } from '../../providers/session/session';
import { ScanViewPage } from '../scan-view/scan-view';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  model:RMHObjectModel = new RMHObjectModel();
  qrcode:QRCodeModel = new QRCodeModel();
  public isCamera: Boolean = false;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alert: AlertHelperProvider, 
    private objp: ObjectProvider,
    public session: SessionProvider,
    private spinnerDialog: SpinnerDialog) {
  }

  /**
   * persist object model against backend 
   */
  addProduct() {
    this.model.object_qr_code = this.qrcode;
    let message: string;
    let title: string = 'SUCCESS';
    console.log('THIS SESSION INSIDE ADD PRODUCT', this.session.authenticated, '<--- authenticated inside add product');
    console.log(this.objp.getHeaders());
    this.spinnerDialog.show();
    this.objp.addObject('objects', this.model, this.objp.getHeaders()).then(data => {
      message = `Das Objekt mit dem Namen ${this.model.object_name} und dem Code ${this.model.qr_code_string} wurde hinzugefügt!`;
      this.model.object_qr_code.qr_code_string = null;
      this.model.object_name = null;
      this.model.qr_code_string = null
    })
    .catch((error) => {
      message = `Es ist ein Fehler aufgetreten: ${JSON.parse(error.error).error.message}`;
      console.log('error in add product', error);
      title = 'ERROR';
    })
    .then(() => {
      this.spinnerDialog.hide();
      this.alert.sendAlert(title, message);
    });
   
  }
/**
 * opens the scan view with data and callback parameter
 */
  scan() {
    this.navCtrl.push(ScanViewPage, {
      data: null,
    callback: this.getData
    });
  }
/**
 * callback handler for scan view
 */
  getData = data =>
{
  return new Promise((resolve, reject) => {
    this.model.qr_code_string = data.scannedText;
    if (data.scannedText.result) {
      this.model.qr_code_string = data.scannedText.result;
    }
    console.log(data.scannedText);
    resolve();
  });
};
}
