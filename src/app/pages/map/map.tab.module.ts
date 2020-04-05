import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapTabPage } from './map-tab.page';
import { StoresMap } from './components/stores-map/stores-map';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: MapTabPage }])
  ],
  declarations: [MapTabPage, StoresMap]
})
export class MapTabModule { }