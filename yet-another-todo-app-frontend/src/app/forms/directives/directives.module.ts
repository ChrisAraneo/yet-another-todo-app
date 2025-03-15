import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorTooltipComponent } from './error-tooltip/components/error-tooltip/error-tooltip.component';
import { ErrorTooltipDirective } from './error-tooltip/error-tooltip.directive';

@NgModule({
  declarations: [ErrorTooltipDirective, ErrorTooltipComponent],
  imports: [
    SharedModule,
    CommonModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  exports: [ErrorTooltipDirective],
})
export class DirectivesModule {}
