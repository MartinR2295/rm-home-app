import { Component } from '@angular/core';

/**
 * Generated class for the NormalTextLabelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'normal-text-label',
  templateUrl: 'normal-text-label.html'
})
export class NormalTextLabelComponent {

  text: string;

  constructor() {
    console.log('Hello NormalTextLabelComponent Component');
    this.text = 'Hello World';
  }

}
