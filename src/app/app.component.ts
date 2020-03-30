import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppLanguageService } from './shared/services/app-language.service';
import { DataStorageService } from './shared/services/data-storage.service';
import { Role } from './interfaces/enums';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  menuTexts: any;
  isAlly: boolean;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appLanguage: AppLanguageService,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit(): Promise<void> {
    const menuTexts = await this.appLanguage.getMenuTexts();
    this.menuTexts = menuTexts;
    const user = await this.dataStorageService.getUser();
    if (user && user.selectedRole === Role.Ally) {
      this.isAlly = true;
    } 
  }

  signOut(): void {
    this.authService.logout();
  }
}
