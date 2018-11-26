import { Component } from '@angular/core';

/**
 * Generated class for the HeaderLabelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-label',
  templateUrl: 'header-label.html'
})
export class HeaderLabelComponent {

  text: string;

  constructor() {
    console.log('Hello HeaderLabelComponent Component');
    this.text = 'Hello World';
  }

}
