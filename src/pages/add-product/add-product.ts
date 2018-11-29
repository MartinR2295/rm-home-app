import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { ObjectProvider } from '../../providers/object/object';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
  providers: [QRScanner]
})
export class AddProductPage {

  model = new RMHObjectModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertHelperProvider, private qrScanner: QRScanner) {
  }

  ngOnInit() {
    console.log('test');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  addProduct() {
    console.log('spast', this.model.name);
    // this.model.save();
    this.alert.sendAlert('SPAST', 'NEGER');
  }

  scan() {

    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted

        var camtoast = this.alert.sendAlert('test', 'camera permission granted');
        // start scanning

        this.qrScanner.show()
        window.document.querySelector('ion-app').classList.add('cameraView');

        let scanSub = this.qrScanner.scan().subscribe((text: string) => {

          console.log('Scanned something', text);

          window.document.querySelector('ion-app').classList.remove('cameraView');
          this.qrScanner.hide(); // hide camera preview

          this.alert.sendAlert('test', text);
          scanSub.unsubscribe(); // stop scanning
        });


      } else if (status.denied) {
        this.alert.sendAlert('test', 'denied');
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        this.alert.sendAlert('test', 'not perm denied');
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));

    // window.document.querySelector('ion-app').classList.add('transparentBody');
    // const scanend = this.qrScanner.scan().subscribe((text: string) => {
    //   this.qrScanner.hide();
    //   scanend.unsubscribe();
    //   this.alert.sendAlert('test', text);
    //   console.log(text);
    // });
    // this.qrScanner.show().then(data => {
    //   console.log('data', data);
    // });

    // this.qrScanner.prepare()
    // .then((status: QRScannerStatus) => {
    //    if (status.authorized) {
    //      // camera permission was granted
    //     console.log('amera permission was granted');

    //      // start scanning
    //      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
    //        console.log('Scanned something', text);
    //        this.alert.sendAlert('test', text);
  
    //        this.qrScanner.hide(); // hide camera preview
    //        scanSub.unsubscribe(); // stop scanning
    //      });
  
    //    } else if (status.denied) {
    //      // camera permission was permanently denied
    //      // you must use QRScanner.openSettings() method to guide the user to the settings page
    //      // then they can grant the permission from there
    //    } else {
    //      // permission was denied, but not permanently. You can ask for permission again at a later time.
    //    }
    // })
    // .catch((e: any) => console.log('Error is', e));

    console.log('OHOHO');
  }

}
