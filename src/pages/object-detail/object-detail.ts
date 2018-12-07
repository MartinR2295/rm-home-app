import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';

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

  displayMode:string = "position";
  testObject:RMHObjectModel = new RMHObjectModel();
  stack:RMHObjectModel[] = [];
  content:RMHObjectModel[] = [];
  currentObjects:RMHObjectModel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.testObject.object_name = "iPhone";
    this.testObject.qr_code_string = "obj0000000000000012";

    for (let index = 0; index < 30; index++) {
      var obj = new RMHObjectModel();
      obj.object_name = "TestObj"+index;
      obj.id = index;
      obj.qr_code_string = "obj000000000000"+index;
      this.stack.push(obj);
    }

    for (let index = 0; index < 30; index++) {
      var obj = new RMHObjectModel();
      obj.object_name = "TestContent"+index;
      obj.id = index;
      obj.qr_code_string = "obj000000000000"+index;
      this.content.push(obj);
    }

    this.currentObjects = this.stack;
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
}
