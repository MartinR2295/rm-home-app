import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanViewPage } from './scan-view';

@NgModule({
  declarations: [
    ScanViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanViewPage),
  ],
})
export class ScanViewPageModule {}
