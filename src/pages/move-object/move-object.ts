import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { ObjectProvider } from '../../providers/object/object';
import { InventoryModel } from '../../app/models/InventoryModel';
import { ToastController } from 'ionic-angular';
import { ScannerComponent } from '../../components/scanner/scanner';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
/**
 * Generated class for the MoveObjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-move-object',
  templateUrl: 'move-object.html',
})
export class MoveObjectPage {
  @ViewChild(ScannerComponent)
  private scannerComponent : ScannerComponent;

  arrayOfRMHObjects: InventoryModel[] = [];
  moveInstructions: String = ' Bitte scannen Sie das Objekt in das sie etwas hineinlegen wollen';
  destinationObject: RMHObjectModel = null;
  public shouldScan: Boolean = true;
  lastScannedQrCode: String = '';

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private objp: ObjectProvider,
    private toastCtrl: ToastController,
    private spinner: SpinnerDialog) { }

    ionViewDidEnter() {
    console.log('ionViewDidLoad MoveObjectPage');
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
    
    if (this.lastScannedQrCode === scanObject) {
      console.log('SAME');
      return;
    }
    this.shouldScan = false; // stops us from receiving new scan results while moving
    
    if (this.lastScannedQrCode != scanObject) {
      console.log('cock GORILLA');
      this.spinner.show();
      this.lastScannedQrCode = scanObject;
      if (!this.destinationObject) {
      
        // this.lastScannedQrCode = scanObject;
        this._queryForObject(scanObject);
      } else if (scanObject === this.destinationObject.object_qr_code.qr_code_string) {
      
        this._sendToast('Sie können nicht ein Objekt in das selbe Objekt verschieben!');
        this.enableScan();
        this.spinner.hide();
        return;
      } else {
        // this.lastScannedQrCode = scanObject;
        this._moveObject(scanObject);
        return;
      }
      console.log('lul', scanObject);
     } else {
      console.log('spinner HIDE');
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

        this.destinationObject = JSON.parse(res.data).body;
        console.log('this.destinationObject', this.destinationObject);
        this.moveInstructions = `Scanne jetzt bitte Objekte die du in '${this.destinationObject.object_name}' hineinlegen willst!`;
        this._sendToast('Erfolgreich hinzugefügt');        
      })
      .catch((error) => {
        const message = `An error has happened: ${JSON.parse(error.error).error.message}`;
      // this.alerthlpr.sendAlert('ERROR', message);

      this._sendToast(message);
      })
      .then(() => { //finally 
        console.log('finally queryForObject');
        this.enableScan();
        this.spinner.hide();
      })
  }

  /**
   * queries for inventory and adds the result to the 
   * RMHObject List 
   * @param qrCode 
   * @private
   */
  _moveObject(qrCode) {
    this.objp.post(this.objp.backpointURL + '/inventory', this._invetoryObjectFactory(qrCode))
    
    .then((res) => {
      console.log('res from moving', JSON.parse(res.data).body);
      this.arrayOfRMHObjects.push(JSON.parse(res.data).body.inventory_child_object);
      this._sendToast('Erfolgreich hinzugefügt');
    })

    .catch((error) => {
      const message = `An error has happened: ${JSON.parse(error.error).error.message}`;      
      // this.alerthlpr.sendAlert('ERROR', message);

      this._sendToast(message);

    })

    .then(() => { //finally 
      console.log('moveObject finally', this.arrayOfRMHObjects);
      this.enableScan();
      this.spinner.hide();

    })
  }
/**
 * returns object with proper format for querying
 * @param qrCode 
 * @private
 */
  _invetoryObjectFactory(qrCode) {
    return {
      'inventory_object_qr_code_string': this.destinationObject.object_qr_code.qr_code_string,
      'inventory_child_object_qr_code_string': qrCode,
    }
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
   * Resets everything so you can scan something else
   */
  reset() {
    this.arrayOfRMHObjects = [];
    this.moveInstructions = ' Bitte scannen Sie das Objekt in das sie etwas hineinlegen wollen';
    this.destinationObject = null;
    this.shouldScan = true;
    this.lastScannedQrCode = '';
  }

  /**
   * destroy the scanner when page is left / tabs changed
   */
  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.scannerComponent.destroy();
  }
  
}
