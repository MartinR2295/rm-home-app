import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
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

  constructor(
     private qrScanner: QRScanner, private navController: NavController, private platform: Platform) {
  }
  
  /**
   * opens the scanner and calls itself again after
   * finished scan
   */
  startScanner() {

 this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
        this.qrScanner.show()
        window.document.querySelector('ion-app').classList.add('cameraView');

        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          if (this.shouldScan) {
            this.scanned(text);
          }

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

/**
 * destroy the scanner instance
 */
destroy() {
  window.document.querySelector('ion-app').classList.remove('cameraView');
  this.qrScanner.hide(); // hide camera preview
  this.qrScanner.destroy();
}



}
