import { Component, Input } from '@angular/core';

/**
 * Generated class for the BaseInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'base-input',
  templateUrl: 'base-input.html'
})
export class BaseInputComponent {

  @Input() value: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() disabled: boolean;
  @Input() id: string;
  @Input() class: string;
  @Input() isRequired: boolean; 
  @Input() label: string;
}
