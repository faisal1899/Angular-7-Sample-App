import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { filter, debounceTime, switchMap, finalize } from 'rxjs/operators';

import { UserService, Gender } from '../user.service';
import { ConfirmPasswordErrorStateMatcher } from './confirm-password-error-state-matcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  asyncValidationInProgress = false;
  passwordsMatcher = new ConfirmPasswordErrorStateMatcher();
  gender = Gender;
  birthDateRange: { min: Date, max: Date };
  isFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
  ) { }

  ngOnInit() {
    this._initForm();
    this._setBirthDateRange();
    this._setBirthDateValidators();
  }

  private _setBirthDateRange() {
    const currentYear = new Date().getFullYear();
    this.birthDateRange = {
      min: new Date(currentYear - 100, 0, 1),
      max: new Date(currentYear - 10, 0, 1),
    };
  }

  private _setBirthDateValidators() {
    const birthDateControl = this.registerForm.get('birthDate');
    this.registerForm.get('gender').valueChanges
      .subscribe(val => {
        if (val !== this.gender.Female) {
          birthDateControl.setValidators([Validators.required]);
        } else {
          birthDateControl.setValidators(null);
        }
        birthDateControl.updateValueAndValidity();
      });
  }

  private _initForm() {
    const emailField = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      email: emailField,
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      confirmPassword: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
    }, { validators: this.confirmPasswordValidator });

    emailField.valueChanges
      .pipe(
        filter(val => val.length > 3),
        debounceTime(500),
        switchMap(val => {
          this.asyncValidationInProgress = true;
          return this.service.asyncIsEmailRegistered(val);
        }),
      )
      .subscribe((isEmailRegistered: boolean) => {
        this.asyncValidationInProgress = false;
        if (isEmailRegistered) {
          emailField.setErrors({ emailAlreadyRegistered: true });
        } else {
          emailField.setErrors(null);
        }
      });
  }

  private confirmPasswordValidator(group: FormGroup) {
    const password = group.controls.password.value;
    const confirmPassword = group.controls.confirmPassword.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    this.service.register(this.registerForm.value)
      .subscribe(response => console.log('response = ', response));
  }

}
