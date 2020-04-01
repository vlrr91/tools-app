import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OptionsPopover } from '../options-popover/options-popover';

@Component({
  selector: 'app-map-tab',
  templateUrl: './map-tab.page.html',
  styleUrls: ['./map-tab.page.scss']
})
export class MapTabPage {
  
  constructor(private popoverCtrl: PopoverController) { }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopover,
      event
    });
    await popover.present();
  }
}