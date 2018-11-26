import { Component } from '@angular/core';

/**
 * Generated class for the BaseLabelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'base-label',
  templateUrl: 'base-label.html'
})
export class BaseLabelComponent {

  text: string;

  constructor() {
    console.log('Hello BaseLabelComponent Component');
    this.text = 'Hello World';
  }

}
