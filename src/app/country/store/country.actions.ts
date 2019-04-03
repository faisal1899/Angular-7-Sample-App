import { Action } from '@ngrx/store';
import { CountryModel } from '../country.model';

export const ADD_COUNTRY = 'ADD_COUNTRY';
export const TRY_ADD_COUNTRY = 'TRY_ADD_COUNTRY';
export const EDIT_COUNTRY = 'EDIT_COUNTRY';
export const TRY_EDIT_COUNTRY = 'TRY_EDIT_COUNTRY';

export class AddCountry implements Action {
  readonly type = ADD_COUNTRY;
  constructor(public payload: any) {}
}

export class TryAddCountry implements Action {
  readonly type = TRY_ADD_COUNTRY;
  constructor(public payload: {name: string}) {}
}

export class EditCountry implements Action {
  readonly type = EDIT_COUNTRY;
  constructor(public payload: CountryModel) {}
}

export class TryEditCountry implements Action {
  readonly type = TRY_EDIT_COUNTRY;
  constructor(public payload: CountryModel) {}
}

export type CountryActions = AddCountry | TryAddCountry | EditCountry | TryEditCountry;
