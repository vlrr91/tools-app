import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ModalController } from "@ionic/angular";
import { ForgotPassModalComponent } from "./components/forgot-pass-modal";

import { AuthService } from '../../shared/services/auth.service';
import { DataStorageService } from '../../shared/services/data-storage.service';

const regexValidateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  pageTexts: any;
  emailText: string;
  passText: string;
  loginButtonText: string;
  newHereText: string;
  registerText: string;
  requiredFieldErrorText: string;
  emailInvalidErrorText: string;
  passLengthErrorText: string;
  forgotPassText: string;
  modalCloseBtnText: string;
  modalTitle: string;
  modalSendBtnText: string;
  messageSendText: string;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private dataStorageService: DataStorageService,
    public modalCtrl: ModalController
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.dataStorageService.getTextsApplication().then(
      texts => {
        this.pageTexts = texts.loginPage;
        this.emailText = this.pageTexts.email;
        this.passText = this.pageTexts.pass;
        this.loginButtonText = this.pageTexts.loginButton;
        this.newHereText = this.pageTexts.newHere;
        this.registerText = this.pageTexts.register;
        this.forgotPassText = this.pageTexts.forgotPass;

        const formText = texts.formMessages;
        this.requiredFieldErrorText = formText.requiredField;
        this.emailInvalidErrorText = formText.emailInvalid;
        this.passLengthErrorText = formText.passLength;
        this.modalTitle = formText.resetPass;
        this.modalCloseBtnText = formText.closeButton;
        this.modalSendBtnText = formText.sendButton;
        this.messageSendText = formText.messageSend;
      }
    );
  }

  emailAndPasswordLogin(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const { email, pass } = this.form.value;
      this.authService.emailAndPasswordLogin(email, pass);
    } else {
      this.form.markAllAsTouched();
    }
  }

  googleLogin(): void {
    this.authService.googleLogin();
  }

  facebookLogin(): void {
    this.authService.facebookLogin();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(regexValidateEmail)]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailField(): AbstractControl {
    return this.form.get('email');
  }

  get passwordField(): AbstractControl {
    return this.form.get('pass');
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPassModalComponent,
      componentProps: {
        'modalTitle': this.modalTitle,
        'modalCloseBtnText': this.modalCloseBtnText,
        'modalSendBtnText': this.modalSendBtnText,
        'emailText': this.emailText,
        'emailInvalidErrorText': this.emailInvalidErrorText,
        'requiredFieldErrorText': this.requiredFieldErrorText,
        'messageSendText': this.messageSendText
      }
    });
    return modal.present();
  }
}
