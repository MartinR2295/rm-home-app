import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddProductPage } from './../add-product/add-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  inputVal:string = ""
  pushPage: any;

  constructor(public navCtrl: NavController) {
    this.pushPage = AddProductPage;
  }

  petar() {
    this.navCtrl.push(this.pushPage);
  }
}
