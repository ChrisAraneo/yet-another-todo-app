import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorTooltipComponent } from './error-tooltip/components/error-tooltip/error-tooltip.component';
import { ErrorTooltipDirective } from './error-tooltip/error-tooltip.directive';

// TODO Use single HttpLoaderFactory
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [ErrorTooltipDirective, ErrorTooltipComponent],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
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
