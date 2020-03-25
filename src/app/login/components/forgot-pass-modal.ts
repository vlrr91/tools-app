import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';

const regexValidateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-pass-modal',
  templateUrl: './forgot-pass-modal.component.html'
})
export class ForgotPassModalComponent {
  formModal: FormGroup;
  modalTitle: string;
  modalCloseBtnText: string;
  modalSendBtnText: string;
  emailText: string;
  emailInvalidErrorText: string;
  requiredFieldErrorText: string;

  constructor(
    navParams: NavParams,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.modalTitle =  navParams.get('modalTitleText');
    this.modalCloseBtnText = navParams.get('modalCloseBtnText');
    this.modalSendBtnText = navParams.get('modalSendBtnText');
    this.emailText = navParams.get('emailText');
    this.emailInvalidErrorText = navParams.get('emailInvalidErrorText');
    this.requiredFieldErrorText = navParams.get('requiredFieldErrorText');
    this.buildFormModal();
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  private buildFormModal(): void {
    this.formModal = this.formBuilder.group({
      emailModal: ['', [Validators.required, Validators.pattern(regexValidateEmail)]]
    });
  }

  get emailModalField(): AbstractControl {
    return this.formModal.get('emailModal');
  } 

  sendEmail(event: Event) {
    event.preventDefault();
    if (this.formModal.valid) {
      console.log('enviar correo');
      this.dismiss();
    } else {
      this.formModal.markAllAsTouched();
    }
  }
}
