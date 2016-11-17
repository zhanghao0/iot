import {Component} from '@angular/core';
import {NavParams, ToastController} from 'ionic-angular';

@Component({
  templateUrl: 'inventory-details.html'
})
export class InventoryDetailsPage {
	item;
  constructor(private params: NavParams, protected toastCtrl: ToastController) {
  	this.item = params.data.item;
  }

  showComponentStatus(componentItem) {
    const toast = this.toastCtrl.create({
      message: `${componentItem.statusInfo}`,
      duration: 50000,
      showCloseButton: true,
      closeButtonText: `OK`,
      dismissOnPageChange: true
    });
    toast.present();
  }
}