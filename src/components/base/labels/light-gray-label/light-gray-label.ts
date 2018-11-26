import { Component } from '@angular/core';

/**
 * Generated class for the LightGrayLabelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'light-gray-label',
  templateUrl: 'light-gray-label.html'
})
export class LightGrayLabelComponent {

  text: string;

  constructor() {
    console.log('Hello LightGrayLabelComponent Component');
    this.text = 'Hello World';
  }

}
