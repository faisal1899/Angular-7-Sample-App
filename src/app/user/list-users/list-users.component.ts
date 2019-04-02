import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromListUser from '../store/list-user.reducer';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  public listUserState: Observable<fromListUser.State>;

  constructor(
    private store: Store<fromListUser.AppState>,
  ) {
    // this.listUserState = store.pipe(select('listUser'));
  }

  ngOnInit() {
    this.listUserState = this.store.select('listUser');
    console.log('under onInit');
    // this.listUserState.subscribe(user => console.log('user = ', user));
  }

}
