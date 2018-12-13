import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { ObjectProvider } from '../../providers/object/object';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { QRCodeModel } from '../../app/models/QRCodeModel';

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
      console.log("Object", this.editObject);
      if(this.editObject.object_qr_code == undefined) {
          this.editObject.object_qr_code = new QRCodeModel();
          this.editObject.object_qr_code.qr_code_string = this.editObject.qr_code_string;
      }
  }

  clickSave(){
        this.spinnerDialog.show();
        this.editObject.qr_code_string = this.editObject.object_qr_code.qr_code_string;
        this.object.updateObject(`objects/${this.editObject.object_id}`,this.editObject,this.object.getHeaders())
        .then((item: any) => {
        console.log("item", item);
        this.spinnerDialog.hide();
        this.alertHelper.sendAlert("Erfolg","Objekt wurde erfolgreich editiert");
        this.editObject.object_name = JSON.parse(item.data).body.object_name;
        this.editObject.qr_code_string = JSON.parse(item.data).body.object_qr_code.qr_code_string;
      }).catch(error => {
        this.spinnerDialog.hide();
        console.log("error",error); // error message as string
        this.alertHelper.sendAlert("Fehler",JSON.parse(error.message));
        return error;
    });
}
}
