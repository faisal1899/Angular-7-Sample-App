import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { APP_CONFIG } from './core/config/app-config.constants';
import { IAppConfig } from './core/config/app-config.interface';
import { CoreService } from './core/core.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AppSnackbarComponent, IAppSnackBarData } from './core/app-snackbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private appSubscriptions: Subscription[] = [];
  public currentYear = new Date().getFullYear();

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(APP_CONFIG) private config: IAppConfig,
    private coreService: CoreService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.initTitleAndMeta();
    this.initHttpErrorsSubscription();
    this.initErrorSubscription();
    this.initSuccessSubscription();
  }

  ngOnDestroy() {
    (this.appSubscriptions || [])
      .forEach(sub => sub.unsubscribe());
  }

  private initHttpErrorsSubscription() {
    const subscription = this.coreService.getHttpError()
      .subscribe((error: HttpErrorResponse) => {
        const data: IAppSnackBarData = {
          message: 'Something went wrong. Please try later.',
          type: 'error',
        };
        this.snackBar.openFromComponent(AppSnackbarComponent, { data });
      });
    this.appSubscriptions.push(subscription);
  }

  private initErrorSubscription() {
    const subscription = this.coreService.getError()
      .subscribe((message: string) => {
        const data: IAppSnackBarData = {
          message,
          type: 'error',
        };
        this.snackBar.openFromComponent(AppSnackbarComponent, { data });
      });
    this.appSubscriptions.push(subscription);
  }

  private initSuccessSubscription() {
    const subscription = this.coreService.getSuccess()
      .subscribe((message: string) => {
        const data: IAppSnackBarData = {
          message,
          type: 'success',
        };
        this.snackBar.openFromComponent(AppSnackbarComponent, { data });
      });
    this.appSubscriptions.push(subscription);
  }

  public initTitleAndMeta = (): void => {
    this.title.setTitle(`${this.config.WEBPAGE_TITLE} - Home Page`);
    this.meta.addTag({ name: 'author', content: 'Faisal Irshad Qureshi' });
  }
}
