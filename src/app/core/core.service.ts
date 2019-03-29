import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CoreService {
  private httpResponseErrorSubject = new Subject();
  private errorSubject = new Subject();
  private successSubject = new Subject();

  onHttpError(error: HttpErrorResponse): void {
    this.httpResponseErrorSubject.next(error);
  }

  getHttpError(): Observable<any> {
    return this.httpResponseErrorSubject.asObservable();
  }

  onError(message: string): void {
    this.errorSubject.next(message);
  }

  getError(): Observable<any> {
    return this.errorSubject.asObservable();
  }

  onSuccess(message: string): void {
    this.successSubject.next(message);
  }

  getSuccess(): Observable<any> {
    return this.successSubject.asObservable();
  }
}
