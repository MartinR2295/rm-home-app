import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { ObjectProvider } from '../../providers/object/object';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObjectEditPage');
    this.getObject();
  }

  clickSave(){
        this.spinnerDialog.show();
        this.editObject.qr_code_string = this.editObject.object_qr_code.qr_code_string;
        this.object.updateObject(`objects/${this.editObject.object_id}`,this.editObject,this.object.getHeaders())
        .then((item: any) => {
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


  getObject(){
    console.log(this.editObject.object_id)
    this.object.getObject(`objects/${this.editObject.object_id}/detail`, null, this.object.getHeaders())
    .then((res) => {
      JSON.parse(res.data).body.content.forEach(element => {
        console.log(element);
        this.editObject = element;
        this.content.push(this.editObject);
      })
    })
  }
}
