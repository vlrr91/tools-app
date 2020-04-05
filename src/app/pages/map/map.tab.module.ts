import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapTabPage } from './map-tab.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: MapTabPage }]),
    AgmCoreModule.forRoot({
      apiKey: ''
    })

  ],
  declarations: [MapTabPage]
})
export class MapTabModule { }