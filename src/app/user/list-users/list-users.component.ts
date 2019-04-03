import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromListUser from '../store/list-user.reducer';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  public listUserState: Observable<fromListUser.State>;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit() {
    this.listUserState = this.store.select('listUser');
  }

}
