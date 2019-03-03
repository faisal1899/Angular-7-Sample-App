import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private existingEmails = [
    'max@test.com',
  ];

  constructor() { }

  private _isEmailRegistered(email: string): boolean {
    return this.existingEmails.includes(email);
  }

  asyncIsEmailRegistered(email: string): Observable<boolean> {
    return of(this._isEmailRegistered(email))
      .pipe(
        delay(3000),
      );
  }
}
