import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { InventoryModel } from '../../app/models/InventoryModel';
import { ObjectProvider } from '../../providers/object/object';
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
  content:InventoryModel[] = [];
  currentObjects:RMHObjectModel[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public objp: ObjectProvider) {
    this.object = JSON.parse(this.navParams.get('object'));

    this.getContents(this.object.object_id);
    this.getStack(this.object.object_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObjectDetailPage');
  }

  segmentChanged(event) {
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

  getContents(id) {
    this.objp.getObject(`objects/${id}/content`, null, this.objp.getHeaders())

    .then((res) => {
      this.content = JSON.parse(res.data).body;
    })
    .catch((error) => {
      console.log('error: ', error);

    })
    .then(() => { //finally 

    })
  }

  getStack(id) {
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

      console.log('this.stack ', this.stack);
      
    })
    .catch((error) => {
      console.log('error: ', error);

    })
    .then(() => { //finally 

    })
  }
}
