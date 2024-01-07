import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPresetModule } from '@ngx-formly/core/preset';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {
  provideHttpClient,
  withInterceptors,
  withXsrfConfiguration,
} from '@angular/common/http';
import { apiUrlInterceptor } from '@sirop-de-verite-shared';
import { environment } from '../environments/environment';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'csrftoken',
        headerName: 'X-CSRFToken',
      }),
      withInterceptors([apiUrlInterceptor(environment.apiUrl)]),
    ),
    importProvidersFrom(
      FormlyModule.forRoot(),
      FormlyPresetModule,
      FormlyMaterialModule,
    ),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000 } as MatSnackBarConfig,
    },
  ],
};
