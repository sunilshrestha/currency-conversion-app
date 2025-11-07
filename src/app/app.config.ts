import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNgProgressHttp, progressInterceptor } from 'ngx-progressbar/http';
import { routes } from './app.routes';
import { API_BASE_URL, GITHUB_URL } from './core/tokens';
import * as packageInfo from "../../package.json";
import { environment } from '../environments/environment'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([progressInterceptor])),
    provideNgProgressHttp({
      silentApis: [],
    }),
    {
      provide: GITHUB_URL,
      useFactory: () => packageInfo.author.url
    },
    {
      provide: API_BASE_URL,
      useFactory: () => environment.apiBaseUrl
    }
  ]
};
