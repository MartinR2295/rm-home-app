import { NgModule } from '@angular/core';
import { BaseViewComponent } from './base/base-view/base-view';
import { BaseButtonComponent } from './base/buttons/base-button/base-button';
import { DarkButtonComponent } from './base/buttons/dark-button/dark-button';
import { LightButtonComponent } from './base/buttons/light-button/light-button';
@NgModule({
	declarations: [BaseViewComponent,
    BaseButtonComponent,
    DarkButtonComponent,
    LightButtonComponent],
	imports: [],
	exports: [BaseViewComponent,
    BaseButtonComponent,
    DarkButtonComponent,
    LightButtonComponent]
})
export class ComponentsModule {}
