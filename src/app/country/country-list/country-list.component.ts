import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers';
import * as fromCountry from '../store/country.reducers';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countriesState: Observable<fromCountry.State>;

  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.countriesState = this.store.select('countries');
  }

}
