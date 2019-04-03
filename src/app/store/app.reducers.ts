import * as fromListUser from '../user/store/list-user.reducer';
import * as fromCountry from '../country/store/country.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  listUser: fromListUser.State;
  countries: fromCountry.State;
}

export const reducers: ActionReducerMap<AppState> = {
  listUser: fromListUser.listUserReducer,
  countries: fromCountry.countryReducer,
};
