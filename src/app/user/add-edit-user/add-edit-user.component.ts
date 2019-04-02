import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromListUser from '../store/list-user.reducer';

import * as ListUserActions from '../store/list-user.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit, OnDestroy {
  public userForm: FormGroup;
  public userId: number;
  public user: any = {};
  private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<fromListUser.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.initUserData();
  }

  private initUserData() {
    const sub = this.getUserDetails()
      .subscribe(user => {
        if (!user) {
          return;
        }
        this.userForm.patchValue(user);
        this.user = user;
      });
    this.subs.push(sub);
  }

  private getUserDetails() {
    return this.activatedRoute.params
      .pipe(
        map(params => params.id),
        mergeMap(this.getUserById.bind(this))
      );
  }

  private getUserById(paramId) {
    return this.store
      .select('listUser')
      .pipe(
        map((data: any) => data.users.find(user => user.id === +paramId)),
      );
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
    console.log('this.userForm.value = ', this.userForm.value);
    let redirectionPath = '../';
    if (this.user.id) {
      this.store.dispatch(new ListUserActions.EditUser({...this.userForm.value, id: this.user.id}));
      redirectionPath = '../../';
    } else {
      this.store.dispatch(new ListUserActions.AddUser(this.userForm.value));
    }
    this.router.navigate([redirectionPath], { relativeTo: this.activatedRoute});
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
