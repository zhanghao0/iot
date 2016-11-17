import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DashboardPage} from '../dashboard/dashboard';
import {InventoryPage} from '../inventory/inventory';
import {MapPage} from '../map/map';

@Component({
  templateUrl: 'project-home.html'
})
export class ProjectHomePage {
	project;
  tab1;
  tab2;
  tab3;
  constructor(private nav: NavController, private params: NavParams) {
  	this.project = params.data;
    this.tab1 = DashboardPage;
    this.tab2 = InventoryPage;
    this.tab3 = MapPage;
  }

  selectTab(tab) {
  	//console.log(this.nav.parent, this.nav);

  	//does not work since default behaviour (show tab) is still triggered
  	//this.nav.push(tab);
  	//console.log(this.nav.parent, this.nav);
  }
}