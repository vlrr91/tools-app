import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

import { OptionsPopover } from '../options-popover/options-popover';
import { StoreService } from 'src/app/shared/services/store.service';
import { Store } from 'src/app/interfaces/store';
import { AppLanguageService } from 'src/app/shared/services/app-language.service';

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
  titleText: string;

  constructor(
    private popoverCtrl: PopoverController,
    private storeService: StoreService,
    private alertCtrl: AlertController,
    private appLanguageService: AppLanguageService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getCurrentPosition();
    const pageTexts = await this.appLanguageService.getPageTexts('others');
    this.titleText = pageTexts.titleMapPage;

    this.storeService.getAllStores().subscribe(
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
    } catch (error) {
      this.currentLatitude = 4.6097102,
      this.currentLongitude = -74.081749
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
    const texts = await this.appLanguageService.getPageTexts('others');
    const alertMessage = texts.alertMessage;

    const alert = await this.alertCtrl.create({
      message: alertMessage,
      buttons: ['ok']
    });
    await alert.present();
  }
}