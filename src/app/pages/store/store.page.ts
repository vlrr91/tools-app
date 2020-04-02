import { Component, OnInit } from '@angular/core';
import { OptionsPopover } from '../options-popover/options-popover';
import { PopoverController } from '@ionic/angular';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Store } from 'src/app/interfaces/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  store: Store;

  constructor(
    private popoverCtrl: PopoverController,
    private dataStorageService: DataStorageService,
    private firestoreService: FirestoreService
  ) { }

  async ngOnInit() {
    const { uid } = await this.dataStorageService.getUser();
    this.firestoreService.getStore(uid).subscribe(
      store => {
        console.log(store);
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
