import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjectEditPage } from './object-edit';

@NgModule({
  declarations: [
    ObjectEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjectEditPage),
  ],
})
export class ObjectEditPageModule {}
