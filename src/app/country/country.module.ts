import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryAddEditComponent } from './country-add-edit/country-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

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
  ]
})
export class CountryModule { }
