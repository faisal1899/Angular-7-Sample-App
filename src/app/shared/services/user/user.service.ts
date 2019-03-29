export * from './user.service.definition';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { IRegisterResponse } from './user.service.definition';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private existingEmails = [
    'max@test.com',
  ];
  public isLoggedIn = false;

  constructor(
    private http: HttpClient
  ) {
    this.updateIsLoggedInStatus();
  }

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

  private storeAuthToken(res: { token: string }) {
    localStorage.setItem('appToken', res.token);
    this.updateIsLoggedInStatus();
  }

  login(data: any): Observable<any> {
    return this.http
      .post('signin', data)
      .pipe(
        // tap(res => {
        //   console.log('under tap / res = ', res);
        //   return res;
        // })
        tap(this.storeAuthToken.bind(this)),
      );
  }

  logout(): void {
    localStorage.removeItem('appToken');
    this.updateIsLoggedInStatus();
  }

  updateIsLoggedInStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('appToken');
  }
}

export enum Gender {
  Male,
  Female,
}
