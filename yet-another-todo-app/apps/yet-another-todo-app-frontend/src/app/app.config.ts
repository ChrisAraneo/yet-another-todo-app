import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { provideStore } from '@ngrx/store';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
        eventCoalescing: true,
    }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
        defaultLanguage: 'en',
    }),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura,
        },
    }),
    provideStore(),
    { provide: 'API', useValue: environment.api },
  ],
};
