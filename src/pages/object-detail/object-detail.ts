import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { InventoryModel } from '../../app/models/InventoryModel';
import { ObjectProvider } from '../../providers/object/object';
import { QRCodeModel } from '../../app/models/QRCodeModel';
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
    public objp: ObjectProvider) {
      console.log('constructor ObjectDetailPage');
    this.object = JSON.parse(this.navParams.get('object'));

    this.getContents(this.object.object_id);
    //this.getStack(this.object.object_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObjectDetailPage');
  }

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

    console.log("currentObjects: ", this.currentObjects)
  }

  clickObject(object) {
    console.log('object id is', object.object_id);
    this.navCtrl.push(ObjectDetailPage, 
      {'object'  : JSON.stringify(object)} );
  }

  getContents(id) {
    console.log(' start contents: ');
    this.objp.getObject(`objects/${id}/detail`, null, this.objp.getHeaders())
    .then((res) => {
      console.log(' content then: ', res);

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
      console.log('error getContents: ', error);

    })
  }

  getStack(id) {
    console.log(' start stack: ');
    this.objp.getObject(`objects/${id}/stack`, null, this.objp.getHeaders())
    .then((res) => {
      console.log('stack: ', res);

      var currentObject:RMHObjectModel = JSON.parse(res.data).body;

      while (currentObject.object_parent) {
        this.stack.push(currentObject); 

        if (currentObject.object_parent) {
          currentObject = currentObject.object_parent;
        }
      }
      this.stack.push(currentObject);
      this.segmentChanged();

      console.log('this.stack ', this.stack);
      
    })
    .catch((error) => {
      console.log('error getStack: ', error);

    })
  }
}
