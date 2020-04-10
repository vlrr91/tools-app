import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { Provider } from 'src/app/interfaces/enums'; 
import { AppLanguageService } from 'src/app/shared/services/app-language.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  emailVerified: boolean = true;
  sendEmail: boolean = false;
  pageTexts: any;
  tabsTexts: any;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private appLanguageService: AppLanguageService 
  ) {}

  async ngOnInit() {
    const user = await this.dataStorageService.getUser();
    if (user.provider === Provider.Email) {
      this.validateEmailState();
    }
    const pageTexts = await this.appLanguageService.getPageTexts('customerPage');
    const tabsTexts = await this.appLanguageService.getPageTexts('tabsTexts');
    this.pageTexts = pageTexts;
    this.tabsTexts = tabsTexts;
  }

  sendVerificationEmail() {
    const sub = this.authService.user.subscribe(
      u => {
        u.sendEmailVerification();
        this.sendEmail = true;
        sub.unsubscribe();
      }
    );
  }

  validateEmailState(): void {
    const sub = this.authService.user
      .subscribe(
        u => {
          this.emailVerified = u.emailVerified;
          sub.unsubscribe();
        }
      );
  }

  refresh(): void {
    const sub = this.authService.user
      .subscribe(
        async u => {
          await u.reload();
          this.validateEmailState();
          sub.unsubscribe();
        }
      );
  }
}
