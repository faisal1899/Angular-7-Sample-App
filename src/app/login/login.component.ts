import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  public isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm();

    this.isLoggedIn = this.service.isLoggedIn;
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.service
      .login(this.loginForm.value)
      .subscribe(res => {
        console.log('res = ', res);
        this.router.navigate(['/profile']);
      });
  }

}
