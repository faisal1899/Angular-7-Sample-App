import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: environment.baseUrl + req.url
    });
    return next.handle(req)
      .pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              console.log('All looks good');
              console.log('event.status = ', event.status);
            }
          },
          error => {
            console.log('----response----');
            console.error('status code:');
            console.error(error.status);
            console.error(error.message);
            console.log('--- end of response---');
          }
        )
      )
  }
}
