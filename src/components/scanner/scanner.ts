import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Subscription } from 'rxjs/Subscription';
import {NavController, Platform} from 'ionic-angular';
/**
 * Generated class for the ScannerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scanner',
  templateUrl: 'scanner.html'
})
export class ScannerComponent {


  text: string;
  data: any;
  @Output() onScan: EventEmitter<any> = new EventEmitter();
  @Input() shouldScan: Boolean = true;
  shouldDestroyScanner: Boolean = false;

  constructor(
     private qrScanner: QRScanner, private navController: NavController, private platform: Platform) {
  }
  ngAfterViewInit() {
    this.startScanner();
  }
  /**
   * opens the scanner on init
   */
  startScanner() {
    console.log('hi');

 this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        this.qrScanner.show()
        window.document.querySelector('ion-app').classList.add('cameraView');

        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('shouldScan inside component', this.shouldScan);
          if (this.shouldScan) {
            this.scanned(text);
          }

          if (this.shouldDestroyScanner) {
            console.log('gay faggot');
            window.document.querySelector('ion-app').classList.remove('cameraView');
            this.qrScanner.hide(); // hide camera preview
            
            scanSub.unsubscribe(); // stop scanning
            this.qrScanner.destroy();
          } else
          this.startScanner();
        });


      } else if (status.denied) {
        // camera permission was permanently denied
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  /**
   * closes the scanner view on exit
   */
  ngOnDestroy() {
   this.destroy();
  }

    /**
   * EventEmitter onScan provides a callback functionality to receive
   * the scan result
   * @param scannedText 
   */
  scanned(scannedEntry: any): void {
    this.onScan.emit([scannedEntry]);
}

destroy() {
  window.document.querySelector('ion-app').classList.remove('cameraView');
  this.qrScanner.hide(); // hide camera preview
  this.shouldDestroyScanner = true;
  this.qrScanner.destroy();
  console.log('destroyed');
}



}
