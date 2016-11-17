import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import orderBy from 'lodash/orderBy';

import {HttpService} from '../../services/http.service';
import {TabPage} from '../common/tab';
import {InventoryDetailsPage} from './inventory-details';
import {InventoryActionsPage} from './inventory-actions';

@Component({
  templateUrl: 'inventory.html'
})
export class InventoryPage extends TabPage {
	items;
  sortMode: boolean;
  sortIcon: string;
  constructor(protected httpService: HttpService, protected nav: NavController, protected params: NavParams, 
    protected popoverCtrl: PopoverController, protected toastCtrl: ToastController) {
    super(httpService, nav, params);
    
    this.sortMode = true;
    this.sortIcon = "arrow-round-up";
  	this.httpService.getList(this.params.data.name).subscribe(
      response => {
        this.items = response;
        //console.log(data, this.items);
      },
      err => console.log(err),
      () => console.log("inventory - get inventory completed")
    );
  }

  openInventoryDetailsPage(item) {
    this.nav.push(InventoryDetailsPage, { item: item });
  }

  changeSortMode() {
    if (this.sortMode) {
      this.items = orderBy(this.items, ['name'], ['asc']);
      this.sortIcon = "arrow-round-up";
    }
    else {      
      this.items = orderBy(this.items, ['name'], ['desc']);
      this.sortIcon = "arrow-round-down";
    }

    this.sortMode = !this.sortMode;
  }

  showActions(event) {
    let popover = this.popoverCtrl.create(InventoryActionsPage);
    popover.present();
  }

  showStatus(item) {
    const toast = this.toastCtrl.create({
      message: `${item.statusInfo}`,
      duration: 1500,
      showCloseButton: true,
      closeButtonText: 'OK',
      dismissOnPageChange: true
    });
    toast.present();
  }
}