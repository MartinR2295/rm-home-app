import { Component, Input } from '@angular/core';
import { BaseViewComponent } from '../../base/base-view/base-view';

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
export class BaseInputComponent extends BaseViewComponent {

  @Input() value: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() disabled: boolean = false;
  @Input() id: string;
  @Input() class: string;
  @Input() isRequired: boolean; 
  @Input() label: string;
  @Input() model: string;
}
