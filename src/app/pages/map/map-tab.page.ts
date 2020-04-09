import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

import { OptionsPopover } from '../options-popover/options-popover';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Store } from 'src/app/interfaces/store';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.page.html',
  styleUrls: ['./map-tab.page.scss']
})
export class MapTabPage implements OnInit {
  stores: Array<Store>;
  currentLatitude: number;
  currentLongitude: number;
  
  constructor(
    private popoverCtrl: PopoverController,
    private firestoreService: FirestoreService
  ) { }

  async ngOnInit(): Promise<void> {
    const location = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = location.coords;
    this.currentLatitude = latitude;
    this.currentLongitude = longitude;

    this.firestoreService.getAllStores().subscribe(
      stores => {
        this.stores = stores;
      }
    )
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopover,
      event
    });
    await popover.present();
  }
}