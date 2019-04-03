import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryModel } from './country.model';
import { IAddCountryResponse, IEditCountryResponse } from './country.definition';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountryService {
  constructor(
    private http: HttpClient,
  ) {}

  public addCountry(data: CountryModel): Observable<IAddCountryResponse> {
    return this.http.post<IAddCountryResponse>(
      'api/addCountry',
      data
    );
  }

  public editCountry(data: CountryModel): Observable<IEditCountryResponse> {
    return this.http.put<IEditCountryResponse>('api/editUser', data);
  }
}
