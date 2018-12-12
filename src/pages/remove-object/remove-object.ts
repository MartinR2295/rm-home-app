import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ObjectProvider } from '../../providers/object/object';
import { InventoryModel } from '../../app/models/InventoryModel';
import { ToastController } from 'ionic-angular';
import { ScannerComponent } from '../../components/scanner/scanner';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

/**
 * Generated class for the RemoveObjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remove-object',
  templateUrl: 'remove-object.html',
})
export class RemoveObjectPage {
  @ViewChild(ScannerComponent)
  private scannerComponent : ScannerComponent;

  arrayOfRMHObjects: InventoryModel[] = [];
  removeInstructions: String = ' Bitte scannen Sie das Objekt das sie herausnehmen wollen';
  public shouldScan: Boolean = true;
  alert: any;
  lastScannedQrCode: String = '';

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private objp: ObjectProvider,
    private toastCtrl: ToastController,
    private spinner: SpinnerDialog) { }

    ionViewDidEnter() {
    console.log('ionViewDidLoad RemoveObjectPage');
    this.scannerComponent.startScanner();
  }

/**
 * delegates to _startMovingProcess, passing the scan result
 * @param scanObject 
 */
  getScanResult(scanObject) {
    console.log('scanObject', scanObject);
    let scanedResult = scanObject;
    if (scanObject.result) {
      scanedResult = scanObject.result;
    }
    if (this.shouldScan) {
      this._startMovingProcess(scanedResult);
    }
  }
  
  /**
 * passed down to component as callback function, this allows us to 
 * work with the scan result
 * Here we start the process
 * @param scanObject 
 */
  _startMovingProcess(scanObject) {
    this.shouldScan = false; // stops us from receiving new scan results while moving

    if (this.lastScannedQrCode != scanObject) {
      this.spinner.show();
        this.lastScannedQrCode = scanObject;
        this._queryForObject(scanObject);      
        this.enableScan();
        this.spinner.hide();
        return;
     } else {
      this.enableScan();
      this.spinner.hide();
      return;
     }
    }

  /**
   * queries for the scanned object
   * @param qrCode String
   * @private
   */
  _queryForObject(qrCode) {
    this.objp.post(this.objp.backpointURL + `/inventory/takeout`, {'inventory_child_object_qr_code_string': qrCode})

    .then((res) => {
        this.arrayOfRMHObjects.push(JSON.parse(res.data).body.inventory_child_object);
      })
      .catch((error) => {
        const message = `An error has happened: ${JSON.parse(error.error).error.message}`;
      // this.alerthlpr.sendAlert('ERROR', message);

      this._sendToast(message);
      })
      .then(() => { //finally 
        console.log('finally queryForObject', this.arrayOfRMHObjects);
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
    console.log('ionViewWillLeave');
    this.scannerComponent.destroy();
  }

}