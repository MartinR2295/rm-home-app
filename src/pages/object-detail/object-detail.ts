import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { InventoryModel } from '../../app/models/InventoryModel';
import { ObjectProvider } from '../../providers/object/object';
import { QRCodeModel } from '../../app/models/QRCodeModel';
import { ObjectEditPage } from '../object-edit/object-edit';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
/**
 * Generated class for the ObjectDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-object-detail',
  templateUrl: 'object-detail.html',
})
export class ObjectDetailPage {

  object:RMHObjectModel;
  displayMode:string = "position";
  testObject:RMHObjectModel = new RMHObjectModel();
  stack:RMHObjectModel[] = [];
  content:RMHObjectModel[] = [];
  currentObjects:RMHObjectModel[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public objp: ObjectProvider,
    private spinnerDialog: SpinnerDialog) {
    this.object = JSON.parse(this.navParams.get('object'));
    this.getObjectDetails(this.object.object_id);
  }

  /**
   * change the objects, if the user switch the segment element
   */
  segmentChanged() {
    switch (this.displayMode) {
      case "position":
        this.currentObjects = this.stack;
        break;
      case "content":
        this.currentObjects = this.content;
        break;
      default:
        break;
    }

  }

  /**
   * open a new object detail-screen, if the user click on a single object
   * @param object 
   */
  clickObject(object) {
    if(object.object_id != this.object.object_id) { //check if the user click on the current shown object
      this.navCtrl.push(ObjectDetailPage, 
      {'object'  : JSON.stringify(object)} );
    }
  }

  /**
   * api call to get the content, the position and the details of the object itself
   * @param id 
   */
  getObjectDetails(id) {
    this.spinnerDialog.show(); //show spinner
    this.objp.getObject(`objects/${id}/detail`, null, this.objp.getHeaders())
    .then((res) => {
      this.spinnerDialog.hide();
      JSON.parse(res.data).body.content.forEach(element => {
        var cObj:RMHObjectModel = element;
        cObj.object_qr_code = new QRCodeModel();
        cObj.object_qr_code.qr_code_string = cObj.qr_code_string;
        this.content.push(cObj);
      });
      
      var currentObject:RMHObjectModel = JSON.parse(res.data).body.stack;

      while (currentObject.object_parent) {
        this.stack.push(currentObject); 

        if (currentObject.object_parent) {
          currentObject = currentObject.object_parent;
        }
      }
      this.stack.push(currentObject);
      this.segmentChanged();
    })
    .catch((error) => {
      this.spinnerDialog.hide();
    })
  }
  editObject(){
    this.navCtrl.push(ObjectEditPage, 
      {'object'  : JSON.stringify(this.object)} );
  }
}
