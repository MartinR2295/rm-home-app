import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ObjectProvider } from '../../providers/object/object';
import { InventoryModel } from '../../app/models/InventoryModel';
import { ToastController } from 'ionic-angular';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { ScannerComponent } from '../../components/scanner/scanner';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { ObjectDetailPage } from '../object-detail/object-detail';

/**
 * Generated class for the InspectObjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inspect-object',
  templateUrl: 'inspect-object.html',
})
export class InspectObjectPage {

  @ViewChild(ScannerComponent)
  private scannerComponent : ScannerComponent;

  model: RMHObjectModel = null;
  public shouldScan: Boolean = true;
  alert: any;
  lastScannedQrCode: String = '';

    constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private objp: ObjectProvider,
    private toastCtrl: ToastController,
    private spinner: SpinnerDialog) { }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.scannerComponent.startScanner();
  }

/**
 * delegates to _startInspectProcess, passing the scan result
 * @param scanObject 
 */
getScanResult(scanObject) {
  let scanedResult = scanObject;
  if (scanObject.result) {
    scanedResult = scanObject.result;
  }
  if (this.shouldScan) {
    this._startInspectProcess(scanedResult);
  }
}

  /**
 * passed down to component as callback function, this allows us to 
 * work with the scan result
 * Here we start the process
 * @param scanObject 
 */
_startInspectProcess(scanObject) {
  this.shouldScan = false; // stops us from receiving new scan results while moving
  if (this.lastScannedQrCode != scanObject) {

    this.lastScannedQrCode = scanObject;
    this.spinner.show();
      this._queryForObject(scanObject);      
      return;
   } else {
    this.enableScan();
    this.spinner.hide();
    return;
   }
  }


  /**
   * queries for the scanned object
   * @param object RMHObjectModel object
   * @private
   */
  _queryForObject(qrCode) {
    this.objp.getObject(`objects/${qrCode}/qr`, null, this.objp.getHeaders())

    .then((res) => {

        this.model = JSON.parse(res.data).body;
        this._sendToast('Erfolgreich gescannt');    
      })
      .catch((error) => {
        const message = `An error has happened: ${JSON.parse(error.error).error.message}`;
      // this.alerthlpr.sendAlert('ERROR', message);

      this._sendToast(message);
      })
      .then(() => { //finally 
        this.enableScan();
        this.spinner.hide();
      })
  }


  /**
   * sets the propertry shouldScan to true
   */
  enableScan() {
    this.shouldScan = true;
}

/**
 * sends a toast message with given parameter
 * @param message 
 */
_sendToast(message) {
  this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'bottom'
  }).present();
}

/**
 * destroy the scanner when page is left / tabs changed
 */
ionViewWillLeave() {
  this.scannerComponent.destroy();
}

viewDetailPage(object) {
  this.navCtrl.push(ObjectDetailPage, 
    {'object'  : JSON.stringify(object)} );
}

}
