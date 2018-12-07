import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertHelperProvider } from '../../providers/alert-helper/alert-helper';
import { ObjectProvider } from '../../providers/object/object';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { QRCodeModel } from '../../app/models/QRCodeModel';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SessionProvider } from '../../providers/session/session';
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
  providers: [BarcodeScanner]
})
export class AddProductPage {

  model:RMHObjectModel = new RMHObjectModel();
  qrcode:QRCodeModel = new QRCodeModel();
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private alert: AlertHelperProvider, 
    private barcodeScanner: BarcodeScanner,
    private objp: ObjectProvider,
    public session: SessionProvider) {
  }

  ngOnInit() {
    console.log('test');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  addProduct() {
    this.model.object_qr_code = this.qrcode;
    let message: string;
    let title: string = 'SUCCESS';
    console.log('THIS SESSION INSIDE ADD PRODUCT', this.session.authenticated, '<--- authenticated inside add product');
    console.log(this.objp.getHeaders());
    this.objp.addObject('objects', this.model, this.objp.getHeaders()).then(data => {
      message = `Your object with the name ${this.model.object_name} and the qrcode ${this.model.qr_code_string} was added`;
    })
    .catch((error) => {
      message = `An error has happened: ${error}`;
      console.log('error in add product', error);
      title = 'ERROR';
    })
    .then(() => {
      this.alert.sendAlert(title, message);
    });
   
  }

  scan() {

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
          this.model.qr_code_string = barcodeData.text;
     }).catch(err => {
         console.log('Error', err);
     });

    // this.qrScanner.prepare()
    // .then((status: QRScannerStatus) => {
    //   if (status.authorized) {
    //     // camera permission was granted

    //     this.qrScanner.show()
    //     window.document.querySelector('ion-app').classList.add('cameraView');

    //     let scanSub = this.qrScanner.scan().subscribe((text: string) => {

    //       console.log('Scanned something', text);
    //       this.qrcode.codeString = text;
    //       window.document.querySelector('ion-app').classList.remove('cameraView');
    //       this.qrScanner.hide(); // hide camera preview

    //       scanSub.unsubscribe(); // stop scanning
    //     });


    //   } else if (status.denied) {
    //     // camera permission was permanently denied
    //   } else {
    //     // permission was denied, but not permanently. You can ask for permission again at a later time.
    //   }
    // })
    // .catch((e: any) => console.log('Error is', e));

  }

}
