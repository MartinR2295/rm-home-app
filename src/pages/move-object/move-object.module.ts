import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoveObjectPage } from './move-object';

@NgModule({
  declarations: [
    MoveObjectPage,
  ],
  imports: [
    IonicPageModule.forChild(MoveObjectPage),
  ],
})
export class MoveObjectPageModule {}
