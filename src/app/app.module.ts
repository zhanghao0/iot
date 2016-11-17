import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import {nvD3} from '../pages/thirdparty/ng2-nvd3';

import {MyApp} from './app.component';
import {HttpService} from '../services/http.service';
import {TabPage} from '../pages/common/tab';
import {HomePage} from '../pages/home/home';
import {ProjectHomePage} from '../pages/home/project-home';
import {DashboardPage} from '../pages/dashboard/dashboard';
import {InventoryPage} from '../pages/inventory/inventory';
import {InventoryDetailsPage} from '../pages/inventory/inventory-details';
import {InventoryActionsPage} from '../pages/inventory/inventory-actions';
import {MapPage} from '../pages/map/map';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '7cfb9566'
  }
};

@NgModule({
  declarations: [
    MyApp,
    nvD3,
    TabPage,
    HomePage,
    ProjectHomePage,
    DashboardPage,
    InventoryPage,
    InventoryDetailsPage,
    InventoryActionsPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    nvD3,
    TabPage,
    HomePage,
    ProjectHomePage,
    DashboardPage,
    InventoryPage,
    InventoryDetailsPage,
    InventoryActionsPage,
    MapPage
  ],
  providers: [
    HttpService
  ]
})
export class AppModule {}
