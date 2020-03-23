import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';

import { SplashScreenService } from './splash-screen.service';
import { AuthService } from '../shared/services/auth.service';
import { DataStorageService } from '../shared/services/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private splashScreenService: SplashScreenService,
    private navCtrl: NavController,
    private dataStorageService: DataStorageService
  ) { }

  async ngOnInit() {
    await this.splashScreenService.loadingComplete();
 
    this.subscription = this.authService.user.subscribe(
      async firebaseUser => {
        if (!firebaseUser) {
            this.navCtrl.navigateRoot('/login');
        } else {
          const storageUser = await this.dataStorageService.getUser();
          if (storageUser) {
            this.navCtrl.navigateRoot(`/${storageUser.selectedRole}`);
          } else {
            this.navCtrl.navigateRoot('/login');
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
