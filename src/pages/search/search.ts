import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ObjectProvider } from '../../providers/object/object';
import { RMHObjectModel } from '../../app/models/RMHObjectModel';
import { ObjectDetailPage } from '../object-detail/object-detail';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchTerm: string = '';
  items: RMHObjectModel[] = [];//RMHObjectModel = new RMHObjectModel;
  offset: any = 0;
  searchTermTemp: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,public objProvider: ObjectProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
   this.filteredItems();
  
  }

  filteredItems(){
    console.log(this.searchTerm);
    if(this.searchTerm.length == 0)
    {
      this.items = [];
      this.offset = 0;
      return;
    }
    return this._queryForObject();
  }

   _queryForObject(offset: String = '') {
        // alert(this.searchTerm)
     return this.objProvider.searchObject("objects/search/" + this.searchTerm + offset).then((objects: any) => {
          console.log("objects", objects, JSON.parse(objects.data));
          if (this.searchTerm != this.searchTermTemp) {
            this.offset = 0;
            this.items = [];
          }
          this.searchTermTemp = this.searchTerm;
          JSON.parse(objects.data).body.forEach(element => {
            console.log("Element",element);
            this.items.push(element);
          });
          
        }).catch(error => {
            console.log("search api error", error.error); // error message as string
            return error;
        });
  }
  viewDetail(object) {
    console.log('object id is', object.object_id);
    this.navCtrl.push(ObjectDetailPage, 
      {'object'  : JSON.stringify(object)} );
  }

  doInfinite(infiniteScroll) {
    this.offset += 20;
    console.log('Begin async operation');
    this._queryForObject(`?offset=${this.offset.toString()}`).then((data) => {

      infiniteScroll.complete();
    });
    
  }
}
