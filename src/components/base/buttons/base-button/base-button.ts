import { Component } from '@angular/core';
import { BaseViewComponent } from '../../base-view/base-view';

/**
 * Generated class for the BaseButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'base-button',
  templateUrl: 'base-button.html'
})
export class BaseButtonComponent extends BaseViewComponent {

  text: string = "ButtonText";

  constructor() {
    super()
  }

}
