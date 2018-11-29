import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BaseViewComponent } from './base/base-view/base-view';
import { BaseButtonComponent } from './base/buttons/base-button/base-button';
import { DarkButtonComponent } from './base/buttons/dark-button/dark-button';
import { LightButtonComponent } from './base/buttons/light-button/light-button';
import { BaseLabelComponent } from './base/labels/base-label/base-label';
import { NormalTextLabelComponent } from './base/labels/normal-text-label/normal-text-label';
import { LightGrayLabelComponent } from './base/labels/light-gray-label/light-gray-label';
import { HeaderLabelComponent } from './base/labels/header-label/header-label';
import { BaseInputComponent } from './input/base-input/base-input';
import { FormsModule } from '@angular/forms';
import { DefaultInputComponent } from './input/default-input/default-input';
import { TextIconInputComponent } from './input/text-icon-input/text-icon-input';
import { IonicModule } from 'ionic-angular';
import { MenuCardComponent } from './elements/cards/menu-card/menu-card';

@NgModule({
	declarations: [BaseViewComponent,
    BaseButtonComponent,
    DarkButtonComponent,
    LightButtonComponent,
    BaseLabelComponent,
    NormalTextLabelComponent,
    LightGrayLabelComponent,
    HeaderLabelComponent,
    BaseInputComponent,
    DefaultInputComponent,
    TextIconInputComponent,
    MenuCardComponent],
	imports: [BrowserModule, FormsModule, IonicModule],
	exports: [BaseViewComponent,
    BaseButtonComponent,
    DarkButtonComponent,
    LightButtonComponent,
    BaseLabelComponent,
    NormalTextLabelComponent,
    LightGrayLabelComponent,
    HeaderLabelComponent,
    BaseInputComponent,
    DefaultInputComponent,
    TextIconInputComponent,
    MenuCardComponent]
})
export class ComponentsModule {}
