import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController, MenuController } from "@ionic/angular";
import { Plugins } from '@capacitor/core';

import { AppLanguageService } from 'src/app/shared/services/app-language.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  showSkip = true;
  pageTexts: any;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    private appLanguage: AppLanguageService,
    private navCtrl: NavController,
    private menu: MenuController
  ) {}

  async ngOnInit() {
    this.pageTexts = await this.appLanguage.getPageTexts('welcomePage');
  }

  async startApp(): Promise<void> {
    await this.navCtrl.navigateRoot('/login')
    await Storage.set({ key: 'didWelcome', value: 'true' })
  }

  onSlideChangeStart(event): void {
    event.target.isEnd().then((isEnd: Boolean) => {
      this.showSkip = !isEnd
    })
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }
}
