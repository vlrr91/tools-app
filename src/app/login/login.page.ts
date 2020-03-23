import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
//import { Plugins } from "@capacitor/core";
import { AuthService } from '../shared/services/auth.service';
import { DataStorageService } from '../shared/services/data-storage.service';

const regexValidateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//const { Storage } = Plugins;

// Plugins.App.addListener('backButton', async () => {
//   const data = await Storage.get({ 'key': 'user' });
//   const storageUser = JSON.parse(data.value);
//   if (storageUser) {
//     Plugins.App.exitApp();
//   }
// });

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

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private dataStorageService: DataStorageService
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

        const formText = texts.formMessages;
        this.requiredFieldErrorText = formText.requiredField;
        this.emailInvalidErrorText = formText.emailInvalid;
        this.passLengthErrorText = formText.passLength;
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
}
