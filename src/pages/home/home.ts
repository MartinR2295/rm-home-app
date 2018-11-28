import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  inputVal:string = "Eingabe"

  constructor(public navCtrl: NavController) {

  }

  petar() {
    console.log("here")
    console.log(this.inputVal);
  }

}
