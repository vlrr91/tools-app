import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { DataStorageService } from '../shared/services/data-storage.service';

const regexValidateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  pageTexts: any;
  firstNameText: string;
  lastNameText: string;
  emailText: string;
  passText: string;
  registerButtonText: string;
  requiredFieldErrorText: string;
  emailInvalidErrorText: string;
  passLengthErrorText: string;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private dataStorageService: DataStorageService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.dataStorageService.getTextsApplication().then(
      texts => {
        this.pageTexts = texts.registerPage;
        this.firstNameText = this.pageTexts.firstName;
        this.lastNameText = this.pageTexts.lastName;
        this.emailText = this.pageTexts.email;
        this.passText = this.pageTexts.pass;
        this.registerButtonText = this.pageTexts.registerButton;

        const formTexts = texts.formMessages;
        this.requiredFieldErrorText = formTexts.requiredField;
        this.emailInvalidErrorText = formTexts.emailInvalid;
        this.passLengthErrorText = formTexts.passLength;
      }
    )
  }

  createUser() {
    if (this.form.valid) {
      this.authService.createUser(
        this.firstNameField.value,
        this.lastNameField.value,
        this.emailField.value,
        this.passField.value
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(regexValidateEmail)]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get firstNameField(): AbstractControl {
    return this.form.get('firstName');
  }

  get lastNameField(): AbstractControl {
    return this.form.get('lastName');
  }

  get emailField(): AbstractControl {
    return this.form.get('email');

  } 
  
  get passField(): AbstractControl {
    return this.form.get('pass');
  }
}
