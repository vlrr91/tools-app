import { Component, OnInit } from '@angular/core';
import { MenuController } from "@ionic/angular";

import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Provider } from 'src/app/interfaces/enums'; 

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  emailVerified: boolean = true;
  sendEmail: boolean = false;
  pageTexts: any;
  msgValidateText: string;
  sendMsgBtnText: string;
  refreshBtnText: string;
  msgSendText: string;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private menu: MenuController
  ) {
    this.menu.enable(true, 'first');
  }

  async ngOnInit() {
    const user = await this.dataStorageService.getUser();
    if (user.provider === Provider.Email) {
      this.validateEmailState();
    }
    this.dataStorageService.getTextsApplication().then(
      texts => {
        this.pageTexts = texts.customerPage;
        this.msgValidateText = this.pageTexts.messageValidate;
        this.sendMsgBtnText = this.pageTexts.sendMessageButton;
        this.refreshBtnText = this.pageTexts.refreshButton;
        this.msgSendText = this.pageTexts.messageSend;
      }
    );
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
