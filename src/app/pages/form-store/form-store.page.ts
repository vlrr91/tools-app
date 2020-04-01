import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { AppLanguageService } from 'src/app/shared/services/app-language.service';

@Component({
  selector: 'app-form-store',
  templateUrl: './form-store.page.html',
  styleUrls: ['./form-store.page.scss'],
})
export class FormStorePage implements OnInit {
  form: FormGroup;
  pageTexts: any;
  formMessages: any;

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
  }

  createStore(): void {
    if (this.form.valid) {
      // save data in firestore
      window.dispatchEvent(new CustomEvent('user:ally'));
      this.navCtrl.navigateRoot('/ally');
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      nit: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      address: ['', Validators.required],
    });
  }

  get nameField(): AbstractControl {
    return this.form.get('name');
  }

  get nitField(): AbstractControl {
    return this.form.get('nit');
  }

  get addressField(): AbstractControl {
    return this.form.get('address');
  }
}
