import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObjectDetailPage } from './object-detail';

@NgModule({
  declarations: [
    ObjectDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ObjectDetailPage),
  ],
})
export class ObjectDetailPageModule {}
