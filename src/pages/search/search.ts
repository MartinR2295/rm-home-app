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
   this.filteredItems();
  
  }

  filteredItems(){
    if(this.searchTerm.length == 0)
    {
      this.items = [];
      this.offset = 0;
      return;
    }
    return this._queryForObject();
  }

  /**
   * queries for object with optional offset param
   * @param offset 
   */
   _queryForObject(offset: String = '') {
        // alert(this.searchTerm)
        if (this.searchTerm != this.searchTermTemp) {
        this.offset = 0;
        this.items = [];
           }
           this.searchTermTemp = this.searchTerm;
     return this.objProvider.searchObject("objects/search/" + this.searchTerm + offset).then((objects: any) => {
          JSON.parse(objects.data).body.forEach(element => {
            this.items.push(element);
          });
          
        }).catch(error => {
            return error;
        });
  }
  viewDetail(object) {
    this.navCtrl.push(ObjectDetailPage, 
      {'object'  : JSON.stringify(object)} );
  }

  /**
   * ionic infinite scroll loads data as long as there are any
   * @param infiniteScroll 
   */
  doInfinite(infiniteScroll) {
    this.offset += 20;
    this._queryForObject(`?offset=${this.offset.toString()}`).then((data) => {

      infiniteScroll.complete();
    });
    
  }
}
