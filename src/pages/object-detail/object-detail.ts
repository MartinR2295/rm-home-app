import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
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

  model:RMHObjectModel = new RMHObjectModel();
  object_id;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public objp: ObjectProvider) {
    this.object_id = this.navParams.get('object_id');

    this.getContents(this.object_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObjectDetailPage');
  }

  segmentChanged(event) {
    console.log("event", event);
  }

  getContents(id) {
    this.objp.getObject(`objects/${id}/content`, null, this.objp.getHeaders())

    .then((res) => {
      console.log('result: ', res);
    })
    .catch((error) => {
      console.log('error: ', error);

    })
    .then(() => { //finally 

    })
  }

  getStack(id) {
    this.objp.getObject(`objects/${id}/content`, null, this.objp.getHeaders())

    .then((res) => {
      console.log('result: ', res);
    })
    .catch((error) => {
      console.log('error: ', error);

    })
    .then(() => { //finally 

    })
  }
}
