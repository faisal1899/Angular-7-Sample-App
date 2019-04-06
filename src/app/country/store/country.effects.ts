import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

import * as CountryActions from './country.actions';
import { CountryModel } from '../country.model';
import { CountryService } from '../country.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class CountryEffects {
  @Effect()
  addCountry = this.actions$
    .pipe(
      ofType(CountryActions.TRY_ADD_COUNTRY),
      map((action: CountryActions.TryAddCountry) => action.payload),
      switchMap((countryData: CountryModel) => {
        return this.service
          .addCountry(countryData)
          .pipe(
            map(res => countryData)
          );
      }),
      map(countryData => {
        this.router.navigate(['countries'], { relativeTo: this.route });
        return { type: CountryActions.ADD_COUNTRY, payload: countryData };
      }),
    );

  @Effect()
  editCountry = this.actions$
    .pipe(
      ofType(CountryActions.TRY_EDIT_COUNTRY),
      map((action: CountryActions.TryEditCountry) => action.payload),
      switchMap((countryData: CountryModel) => {
        return this.service
          .editCountry(countryData)
          .pipe(
            map(response => countryData)
          );
      }),
      map(countryData => {
        this.router.navigate(['countries'], { relativeTo: this.route });
        return { type: CountryActions.EDIT_COUNTRY, payload: countryData };
      })
    );

  constructor(
    private actions$: Actions,
    private service: CountryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
}
