import { Component, Input } from '@angular/core';

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

  @Input() text: string;

  constructor() {
  }

}
