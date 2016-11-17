import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {HttpService} from '../../services/http.service';

@Component({
  template: ''
})
export class TabPage {

  constructor(protected httpService: HttpService, protected nav: NavController, protected params: NavParams) {
  }

  navBack() {
    //console.log(this, this.nav, this.nav.parent, this.nav.parent.parent);
    this.nav.parent.parent.pop();
  }
}