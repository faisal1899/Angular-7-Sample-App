import * as fromListUser from '../user/store/list-user.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  listUser: fromListUser.State;
}

export const reducers: ActionReducerMap<AppState> = {
  listUser: fromListUser.listUserReducer,
};
