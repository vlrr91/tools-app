import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OptionsPopover } from '../options-popover/options-popover';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.page.html',
  styleUrls: ['./chat-tab.page.scss']
})
export class ChatTabPage {
  
  constructor(private popoverCtrl: PopoverController) { }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopover,
      event
    });
    await popover.present();
  }
}