import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoreService } from '../core.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private coreService: CoreService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: environment.baseUrl + req.url
    });
    return next.handle(req)
      .pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {
              // console.log('All looks good');
              // console.log('event.status = ', event.status);
            }
          },
          (error: HttpErrorResponse) => {
            this.coreService.onHttpError(error);
          }
        )
      )
  }
}
