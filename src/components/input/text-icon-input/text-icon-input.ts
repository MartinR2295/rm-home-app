import { Component, Input } from '@angular/core';
import { DefaultInputComponent } from '../default-input/default-input';

/**
 * Generated class for the TextIconInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'text-icon-input',
  templateUrl: 'text-icon-input.html'
})
export class TextIconInputComponent extends DefaultInputComponent {
  @Input() icon:string = "close";
}
