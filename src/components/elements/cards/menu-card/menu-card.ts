import { Component, Input } from '@angular/core';
import { BaseViewComponent } from '../../../base/base-view/base-view';

/**
 * Generated class for the MenuCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu-card',
  templateUrl: 'menu-card.html'
})
export class MenuCardComponent extends BaseViewComponent {
  @Input() icon:any;
  @Input() text:any;
}
