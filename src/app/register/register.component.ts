import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { filter, debounceTime, switchMap, finalize } from 'rxjs/operators';

import { UserService } from '../user.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
  ) { }

  ngOnInit() {
    this._initForm();
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
    if (this.registerForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
  }

}
