import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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

  register(data: any): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(
      'api/register',
      data,
    );
  }
}

export enum Gender {
  Male = 1,
  Female = 2,
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
}
