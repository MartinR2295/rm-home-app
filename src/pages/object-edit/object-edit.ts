import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { ObjectProvider } from '../../providers/object/object';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { QRCodeModel } from '../../app/models/QRCodeModel';
import { ScanViewPage } from '../scan-view/scan-view';

/**
 * Generated class for the ObjectEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-object-edit',
  templateUrl: 'object-edit.html',
})
export class ObjectEditPage {

  editObject: RMHObjectModel;// = new RMHObjectModel();
  content:RMHObjectModel[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public object: ObjectProvider, 
    public alertHelper:AlertHelperProvider,
    private spinnerDialog: SpinnerDialog) {
      this.editObject = JSON.parse(this.navParams.get('object'));
      if(this.editObject.object_qr_code == undefined) {
          this.editObject.object_qr_code = new QRCodeModel();
          this.editObject.object_qr_code.qr_code_string = this.editObject.qr_code_string;
      }
  }

  //Speichern Methode um die Änderungen an die API zu schicken
  clickSave(){
        this.spinnerDialog.show();
        this.editObject.qr_code_string = this.editObject.object_qr_code.qr_code_string;
        //API Call auf den Object Provider mit der richtigen Route
        this.object.updateObject(`objects/${this.editObject.object_id}`,this.editObject,this.object.getHeaders())
        .then((item: any) => {
          this.spinnerDialog.hide();
          //Wenn ein Fehler auftritt mit dem Alert Helper eine POPup Nachricht anzeigen
          if(item.status >= 300 || item.status < 200) {
            this.alertHelper.sendAlert("Fehler",JSON.parse(item.error).error.message);
            return;
          }
          this.alertHelper.sendAlert("Erfolg","Objekt wurde erfolgreich editiert");
          this.editObject.object_name = JSON.parse(item.data).body.object_name;
          this.editObject.qr_code_string = JSON.parse(item.data).body.object_qr_code.qr_code_string;
      }).catch(error => {
          this.spinnerDialog.hide();
          this.alertHelper.sendAlert("Fehler",JSON.parse(error.message));
          return error;
    });
  }

  //Object Löschen um das Objekt komplett aus dem System zu entfernen
  deleteObject() {
    this.spinnerDialog.show();
    //API Call auf den Object Provider
      this.object.deleteObject(`objects/${this.editObject.object_id}`,null,this.object.getHeaders())
      .then((item: any) => {
        this.spinnerDialog.hide();
        if(item.status >= 300 || item.status < 200) {
          this.alertHelper.sendAlert("Fehler",JSON.parse(item.error).error.message);
          return;
        }
        this.alertHelper.sendAlert("Erfolg","Objekt wurde erfolgreich gelöscht");
        this.navCtrl.popToRoot();
    }).catch(error => {
        this.spinnerDialog.hide();
        this.alertHelper.sendAlert("Fehler",JSON.parse(error.message));
        return error;
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
    this.editObject.object_qr_code.qr_code_string = data.scannedText;
    if (data.scannedText.result) {
      this.editObject.object_qr_code.qr_code_string = data.scannedText.result;
    }
    resolve();
  });
};
}
