import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

import * as CountryActions from '../store/country.actions';
import * as fromCountry from '../store/country.reducers';

@Component({
  selector: 'app-country-add-edit',
  templateUrl: './country-add-edit.component.html',
  styleUrls: ['./country-add-edit.component.scss']
})
export class CountryAddEditComponent implements OnInit, OnDestroy {
  public countryForm: FormGroup;
  public countryId: number;
  public country: any = {};
  private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCountry.FeatureState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.initCountryData();
  }

  private initCountryData() {
    const sub = this.getCountryDetails()
      .subscribe(country => {
        if (!country) {
          return;
        }
        this.countryForm.patchValue(country);
        this.country = country;
      });
    this.subs.push(sub);
  }

  private getCountryDetails() {
    return this.activatedRoute.params
      .pipe(
        map(params => params.id),
        mergeMap(this.getCountryById.bind(this))
      );
  }

  private getCountryById(paramId) {
    return this.store
      .select('countries')
      .pipe(
        map((data: any) => data.countries.find(country => country.id === +paramId)),
      );
  }

  private initializeForm(): void {
    this.countryForm = this.fb.group({
      name: new FormControl('', Validators.required),
    });
  }

  public onSubmit(): void {
    if (this.countryForm.invalid) {
      return;
    }
    console.log('this.countryForm.value = ', this.countryForm.value);
    if (this.country.id) {
      this.store.dispatch(new CountryActions.TryEditCountry({...this.countryForm.value, id: this.country.id}));
    } else {
      this.store.dispatch(new CountryActions.TryAddCountry(this.countryForm.value));
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
