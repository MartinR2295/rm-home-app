import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseViewComponent } from '../../base/base-view/base-view';
import { ThrowStmt } from '@angular/compiler';

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

  private _value: string;

  get value(): string {
    return this._value;
  }

  @Input() 
  set value(value: string) {
    this._value = value;
    this.valueChange.emit(this.value);
  }

  @Input() name: string;
  @Input() placeholder: string = "";
  @Input() type: string;
  @Input() disabled: boolean = false;
  @Input() id: string;
  @Input() class: string;
  @Input() isRequired: boolean; 
  @Input() label: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
}
