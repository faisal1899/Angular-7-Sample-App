import * as CountryActions from './country.actions';
import { CountryModel } from '../country.model';

export interface State {
  countries: CountryModel[];
}

const INITIAL_STATE: State = {
  countries: []
};

export function countryReducer(state = INITIAL_STATE, action: CountryActions.CountryActions) {
  switch (action.type) {
    case CountryActions.ADD_COUNTRY:
      let newId = 1;
      if (state.countries.length) {
        newId = state.countries[state.countries.length - 1].id + 1;
      }
      return {
        ...state,
        countries: [...state.countries, {...action.payload, id: newId}]
      };
    case CountryActions.EDIT_COUNTRY:
      const countryIndex = state.countries.findIndex(country => country.id === action.payload.id);
      const newCountries = [...state.countries];
      newCountries[countryIndex] = action.payload;
      return {
        ...state,
        countries: newCountries
      };
    default:
      return state;
  }
}
