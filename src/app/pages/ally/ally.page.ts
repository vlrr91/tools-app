import { Component, OnInit } from '@angular/core';
import { AppLanguageService } from 'src/app/shared/services/app-language.service';

@Component({
  selector: 'app-ally',
  templateUrl: './ally.page.html',
  styleUrls: ['./ally.page.scss'],
})
export class AllyPage implements OnInit {
  emailVerified: boolean;
  tabsTexts: any;

  constructor(private appLanguageService: AppLanguageService) {}

  async ngOnInit(): Promise<void> {
    const tabsTexts = await this.appLanguageService.getPageTexts('tabsTexts');
    this.tabsTexts = tabsTexts;
  }
}
