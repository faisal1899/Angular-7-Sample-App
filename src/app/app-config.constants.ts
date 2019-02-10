import { InjectionToken } from '@angular/core';
import { IAppConfig } from './app-config.interface';

export const APP_DI_CONFIG: IAppConfig = {
  WEBPAGE_TITLE: 'Wealth Care',
};

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config.constants');
