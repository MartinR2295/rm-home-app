import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { ObjectProvider } from '../../providers/object/object';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { QRCodeModel } from '../../app/models/QRCodeModel';
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

  model:RMHObjectModel = new RMHObjectModel();
  qrcode:QRCodeModel = new QRCodeModel();
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertHelperProvider, private qrScanner: QRScanner, private objp: ObjectProvider) {
  }

  ngOnInit() {
    console.log('test');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  addProduct() {
    this.model.qrCode = this.qrcode;
    let message: string;
    let title: string = 'SUCCESS';

    console.log('spast', this.model);
    
    this.objp.addObject('objects', this.model).then(data => {
      console.log(data);
      message = `Your object with the name ${this.model.name} and the qrcode ${this.model.qrCode.codeString} was added`;
    })
    .catch(error => {
      message = `An error has happened: ${error}`;
      title = 'ERROR';
    })
    .then(() => {
      this.alert.sendAlert(title, message);
    });
   
  }

  scan() {

    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted

        this.qrScanner.show()
        window.document.querySelector('ion-app').classList.add('cameraView');

        let scanSub = this.qrScanner.scan().subscribe((text: string) => {

          console.log('Scanned something', text);
          this.qrcode.codeString = text;
          window.document.querySelector('ion-app').classList.remove('cameraView');
          this.qrScanner.hide(); // hide camera preview

          scanSub.unsubscribe(); // stop scanning
        });


      } else if (status.denied) {
        // camera permission was permanently denied
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => console.log('Error is', e));

  }

}
