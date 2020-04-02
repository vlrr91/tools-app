import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { OptionsPopover } from '../options-popover/options-popover';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user: User;

  constructor(
    private popoverCtrl: PopoverController,
    private dataStorageService: DataStorageService
  ) { }

  async ngOnInit(): Promise<void> {
    const user = await this.dataStorageService.getUser();
    this.user = user;
  }
  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: OptionsPopover,
      event
    });
    await popover.present();
  }
}
