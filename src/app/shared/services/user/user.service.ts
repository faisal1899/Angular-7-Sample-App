export * from './user.service.definition';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { IRegisterResponse } from './user.service.definition';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private existingEmails = [
    'max@test.com',
  ];

  constructor(
    private http: HttpClient
  ) { }

  private _isEmailRegistered(email: string): boolean {
    return this.existingEmails.includes(email);
  }

  asyncIsEmailRegistered(email: string): Observable<boolean> {
    return of(this._isEmailRegistered(email))
      .pipe(
        delay(3000),
      );
  }

  // register(data: any): Observable<IRegisterResponse> {
  //   return this.http.post<IRegisterResponse>(
  //     'api/register',
  //     data,
  //   );
  // }

  register(data: any): Observable<HttpEvent<IRegisterResponse>> {
    const options = {
      reportProgress: true,
    };
    const req = new HttpRequest('POST', 'api/register', data, options);
    return this.http.request(req);
  }
}
