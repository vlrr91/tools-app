import { Component } from "@angular/core";
import { NavParams, ModalController} from '@ionic/angular';

@Component({
  selector: 'action-store-map',
  templateUrl: './action-store-map.html',
  styleUrls: ['./action-store-map.scss']
})
export class ActionStoreMapComponent {
  idAlly: string;

  constructor(
    private modalCtrl: ModalController,
    navParams: NavParams
  ) {
    this.idAlly = navParams.get('idAlly');
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }
}