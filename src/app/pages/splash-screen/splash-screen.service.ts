import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';

import { DataStorageService } from '../../shared/services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  constructor(
    private afRemoteConfig: AngularFireRemoteConfig,
    private dataStorageService: DataStorageService
  ) {}

  getAllAppTexts(): Promise<string> {
    return this.afRemoteConfig.strings.texts.toPromise();
  }

  async loadingComplete(): Promise<void> {
    const texts = await this.getAllAppTexts();
    await this.dataStorageService.setTextsApplication(texts);
  }
}