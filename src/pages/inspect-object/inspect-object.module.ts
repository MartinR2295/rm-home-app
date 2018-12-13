import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectObjectPage } from './inspect-object';

@NgModule({
  declarations: [
    InspectObjectPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectObjectPage),
  ],
})
export class InspectObjectPageModule {}
