import { Component, OnInit, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { APP_CONFIG } from './app-config.constants';
import { IAppConfig } from './app-config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(APP_CONFIG) private config: IAppConfig,
  ) {}

  ngOnInit() {
    this.initTitleAndMeta();
  }

  public initTitleAndMeta = (): void => {
    this.title.setTitle(`${this.config.WEBPAGE_TITLE} - Home Page`);
    this.meta.addTag({ name: 'author', content: 'Faisal Irshad Qureshi' });
  }
}
