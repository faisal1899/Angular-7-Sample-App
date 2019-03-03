import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class ConfirmPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (
      control &&
      control.parent.get('password').value !== control.parent.get('confirmPassword').value &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
