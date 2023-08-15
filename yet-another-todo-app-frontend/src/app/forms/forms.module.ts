import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from '../shared/material.module';
import { CancelButtonComponent } from './components/cancel-button/cancel-button.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { LabelComponent } from './components/label/label.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { SelectComponent } from './components/select/select.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { DirectivesModule } from './directives/directives.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    LabelComponent,
    SubmitButtonComponent,
    CancelButtonComponent,
    TextInputComponent,
    TextareaComponent,
    SelectComponent,
    DatePickerComponent,
    PasswordInputComponent,
    FileInputComponent,
  ],
  imports: [
    BrowserModule,
    DirectivesModule,
    MaterialModule,
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
  exports: [
    SubmitButtonComponent,
    CancelButtonComponent,
    DatePickerComponent,
    SelectComponent,
    TextInputComponent,
    TextareaComponent,
    PasswordInputComponent,
    FileInputComponent,
  ],
})
export class FormsModule {}
