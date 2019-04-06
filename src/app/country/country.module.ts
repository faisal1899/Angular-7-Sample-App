import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { CountryRoutingModule } from './country-routing.module';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryAddEditComponent } from './country-add-edit/country-add-edit.component';
import { countryReducer } from './store/country.reducers';

@NgModule({
  declarations: [
    CountryListComponent,
    CountryAddEditComponent,
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature('countries', countryReducer),
  ]
})
export class CountryModule { }
