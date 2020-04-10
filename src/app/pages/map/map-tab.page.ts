import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
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
    private firestoreService: FirestoreService,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit(): Promise<void> {
   await this.getCurrentPosition();
  
    this.firestoreService.getAllStores().subscribe(
      stores => {
        this.stores = stores;
      }
    )
  }

  private async getCurrentPosition() {
    try {
      const location = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = location.coords;
      this.currentLatitude = latitude;
      this.currentLongitude = longitude;
    } catch(error) {
      this.currentLatitude = 4.6097102,
      this.currentLongitude =  -74.081749
      await this.presentAlert();
    }
  }

  async presentPopover(event: Event): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopover,
      event
    });
    await popover.present();
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Permiso Geolocalización',
      message: 'Es necesario que aceptes permiso, para una mejor experiencia',
      buttons: ['ok']
    });
    await alert.present();
  }
}