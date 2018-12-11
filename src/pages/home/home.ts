import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddProductPage } from './../add-product/add-product';
import { SearchPage } from '../search/search';
import { ObjectDetailPage } from '../object-detail/object-detail';
import { MoveObjectPage } from '../move-object/move-object';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  push(p:string){
    switch (p) {
      case 'search':
        console.log("click on object detail");
        this.navCtrl.push(ObjectDetailPage);
        break;
      case 'add':
        this.navCtrl.push(AddProductPage);
        break;
      case 'move':
        this.navCtrl.push(MoveObjectPage);
      default:
        break;
    }
  }

  clickAddObject() {
    this.navCtrl.push(AddProductPage);
  }
}
