import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {provideToastr} from 'ngx-toastr'
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import {NgxSpinnerModule} from 'ngx-spinner';
import { loadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    importProvidersFrom(NgxSpinnerModule),
    provideHttpClient(withInterceptors([jwtInterceptor, loadingInterceptor])),
    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
    provideAnimations()
  ]
};
