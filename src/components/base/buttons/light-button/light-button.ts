import { Component } from '@angular/core';

/**
 * Generated class for the LightButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'light-button',
  templateUrl: 'light-button.html'
})
export class LightButtonComponent {

  text: string;

  constructor() {
    console.log('Hello LightButtonComponent Component');
    this.text = 'Hello World';
  }

}
