import { Component } from '@angular/core';
import { BaseLabelComponent } from '../base-label/base-label';

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
export class NormalTextLabelComponent extends BaseLabelComponent {

  text: string;

}
