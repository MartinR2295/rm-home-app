import { NgModule } from '@angular/core';
import { BaseViewComponent } from './base/base-view/base-view';
import { BaseButtonComponent } from './base/buttons/base-button/base-button';
import { DarkButtonComponent } from './base/buttons/dark-button/dark-button';
import { LightButtonComponent } from './base/buttons/light-button/light-button';
import { BaseLabelComponent } from './base/labels/base-label/base-label';
import { NormalTextLabelComponent } from './base/labels/normal-text-label/normal-text-label';
import { LightGrayLabelComponent } from './base/labels/light-gray-label/light-gray-label';
import { HeaderLabelComponent } from './base/labels/header-label/header-label';
@NgModule({
	declarations: [BaseViewComponent,
    BaseButtonComponent,
    DarkButtonComponent,
    LightButtonComponent,
    BaseLabelComponent,
    NormalTextLabelComponent,
    LightGrayLabelComponent,
    HeaderLabelComponent],
	imports: [],
	exports: [BaseViewComponent,
    BaseButtonComponent,
    DarkButtonComponent,
    LightButtonComponent,
    BaseLabelComponent,
    NormalTextLabelComponent,
    LightGrayLabelComponent,
    HeaderLabelComponent]
})
export class ComponentsModule {}
