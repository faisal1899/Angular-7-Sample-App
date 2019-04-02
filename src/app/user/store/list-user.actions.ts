import { Action } from '@ngrx/store';

export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';

export class AddUser implements Action {
  readonly type = ADD_USER;
  constructor(public payload: any) {}
}

export class EditUser implements Action {
  readonly type = EDIT_USER;
  constructor(public payload: any) {}
}

export type ListUserActions = AddUser | EditUser;
