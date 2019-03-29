import { Component, OnInit, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { APP_CONFIG } from './core/config/app-config.constants';
import { IAppConfig } from './core/config/app-config.interface';
import { CoreService } from './core/core.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AppSnackbarComponent, IAppSnackBarData } from './core/app-snackbar';
import { UserService } from './shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentYear = new Date().getFullYear();

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(APP_CONFIG) private config: IAppConfig,
    private coreService: CoreService,
    private snackBar: MatSnackBar,
    private router: Router,
    public userService: UserService,
  ) {}

  ngOnInit() {
    this.initTitleAndMeta();
  }

  public initTitleAndMeta = (): void => {
    this.title.setTitle(`${this.config.WEBPAGE_TITLE} - Home Page`);
    this.meta.addTag({ name: 'author', content: 'Faisal Irshad Qureshi' });
  }

  public logout(e: MouseEvent): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
