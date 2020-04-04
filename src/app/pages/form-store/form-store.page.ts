import { Component, OnInit, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Plugins } from "@capacitor/core";

import { AppLanguageService } from 'src/app/shared/services/app-language.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-form-store',
  templateUrl: './form-store.page.html',
  styleUrls: ['./form-store.page.scss'],
})
export class FormStorePage implements OnInit {
  form: FormGroup;
  pageTexts: any;
  formMessages: any;
  location: any;
  currentLatitude: number;
  currentLongitude: number;

  constructor(
    private formBuilder: FormBuilder,
    private appLanguage: AppLanguageService,
    private navCtrl: NavController
  ) {
    this.buildForm();
  }

  async ngOnInit() {
    this.pageTexts = await this.appLanguage.getPageTexts('formStorePage');
    this.formMessages = await this.appLanguage.getPageTexts('formMessages');

    const location = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = location.coords;
    this.currentLatitude = latitude;
    this.currentLongitude = longitude;
    console.log(this.currentLatitude, this.currentLongitude)
  }

  createStore(): void {
    if (this.form.valid) {
      // window.dispatchEvent(new CustomEvent('user:ally'));
      // this.navCtrl.navigateRoot('/ally');
      console.log(this.location);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      nit: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      cellPhone: ['', Validators.required],
      localPhone: ['', Validators.required]
    });
  }

  get nameField(): AbstractControl {
    return this.form.get('name');
  }

  get nitField(): AbstractControl {
    return this.form.get('nit');
  }

  get cellPhoneField(): AbstractControl {
    return this.form.get('cellPhone');
  }

  get localPhoneField(): AbstractControl {
    return this.form.get('localPhone');
  }

  getLocation(location: any) {
    this.location = location;
  }
}
