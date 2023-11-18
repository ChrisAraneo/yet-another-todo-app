import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule as PrimeNgToolbarModule } from 'primeng/toolbar';
import { HttpLoaderFactory } from 'src/app/app.module';
import { MaterialModule } from '../../../shared/material.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoggedUserInformationComponent } from './logged-user-information/logged-user-information.component';
import { OfflineIndicatorComponent } from './offline-indicator/offline-indicator.component';
import { SignOutButtonComponent } from './sign-out-button/sign-out-button.component';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [
    LoggedUserInformationComponent,
    OfflineIndicatorComponent,
    SignOutButtonComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    PrimeNgToolbarModule,
    ButtonModule,
    MaterialModule,
  ],
  providers: [],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
