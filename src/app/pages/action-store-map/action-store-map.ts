import { Component, OnInit } from "@angular/core";
import { NavParams, ModalController, NavController} from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'action-store-map',
  templateUrl: './action-store-map.html',
  styleUrls: ['./action-store-map.scss']
})
export class ActionStoreMapComponent implements OnInit {
  idAlly: string;
  store: any;

  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService,
    private navCtrl: NavController,
    navParams: NavParams
  ) {
    this.idAlly = navParams.get('idAlly');
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.firestoreService.getStore(this.idAlly).subscribe(
      store => {
        this.store = store;
      }
    );
  }

  openChat(): void {
    this.navCtrl.navigateForward(`/chat/${this.idAlly}`);
    this.dismiss();
  }

  openStore(): void {
    this.navCtrl.navigateForward(`/ally/${this.idAlly}`);
    this.dismiss();
  }
}