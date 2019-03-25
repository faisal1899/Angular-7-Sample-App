import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { filter, debounceTime, switchMap } from 'rxjs/operators';

import { ConfirmPasswordErrorStateMatcher } from './confirm-password-error-state-matcher';
import { UserService, Gender } from '../shared/services';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CoreService } from '../core/core.service';

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
  profilePic: File;
  // localFileUploadUrl: string;
  localFileUploadUrl: string | ArrayBuffer;
  private profilePicFormControl: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private coreService: CoreService,
    private cd: ChangeDetectorRef,
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

    this.profilePicFormControl = new FormControl(null, Validators.required);

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
      profilePic: this.profilePicFormControl,
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

  public onFileChange(e: Event): void {
    // console.log('e = ', e.target);
    const targetFiles = (e.target as HTMLInputElement).files;
    if (targetFiles && targetFiles.length) {
      const file = targetFiles[0];
      // console.log('targetFiles = ', targetFiles);
      // console.log('file = ', file);
      this.profilePic = file;
      const reader = new FileReader();
      reader.onload = () => {
        if (file.type.startsWith('image/')) {
          this.localFileUploadUrl = reader.result;
        } else {
          this.localFileUploadUrl = null;
        }
      };
      reader.readAsDataURL(file);
      if (!file.type.startsWith('image/')) {
        this.profilePicFormControl.setErrors({ notAnImage: true });
      } else if (file.size > (1024 * 1024 * 5)) {
        this.profilePicFormControl.setErrors({ fileToLarge: true});
      } else {
        this.profilePicFormControl.setErrors(null);
      }
    }
    // this.cd.markForCheck();
  }


  public onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const formData = new FormData();
    Object.keys(this.registerForm.value).forEach(key => {
      formData.append(key, this.registerForm.value[key]);
    });
    formData.append('profilePic', this.profilePic);
    // this.service.register(formData)
    //   .subscribe(response => console.log('response = ', response));
    this.service.register(formData)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
            this.coreService.onSuccess(event.body.message);
          }
        },
        error => console.log('Upload error: ', error),
        () => console.log('Upload done')
      );
  }

}
