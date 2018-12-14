import { Component } from '@angular/core';

/**
 * Generated class for the StackElementComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'stack-element',
  templateUrl: 'stack-element.html'
})
export class StackElementComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
