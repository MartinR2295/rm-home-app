import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the ScanViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-view',
  templateUrl: 'scan-view.html',
})
export class ScanViewPage {

  data: any;
  callback: any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private qrScanner: QRScanner) {
      this.callback = this.navParams.get('callback');
      this.data = this.navParams.get('data') || []
  }

  ionViewDidLoad() {
    console.log('hi');

 this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted

        this.qrScanner.show()
        window.document.querySelector('ion-app').classList.add('cameraView');

        let scanSub = this.qrScanner.scan().subscribe((text: string) => {

          console.log('Scanned something', text);
          window.document.querySelector('ion-app').classList.remove('cameraView');
          this.qrScanner.hide(); // hide camera preview
          
          scanSub.unsubscribe(); // stop scanning
          this.sendData(text);
        });


      } else if (status.denied) {
        // camera permission was permanently denied
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  sendData(scannedText)
{
  this.data.scannedText = scannedText;
  this.callback(this.data).then( () => { this.navCtrl.pop() });
}
}
