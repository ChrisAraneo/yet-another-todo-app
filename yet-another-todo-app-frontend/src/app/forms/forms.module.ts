import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpLoaderFactory } from '../app.module';
import { MaterialModule } from '../shared/material.module';
import { CancelButtonComponent } from './components/cancel-button/cancel-button.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { LabelComponent } from './components/label/label.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { SelectComponent } from './components/select/select.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { DirectivesModule } from './directives/directives.module';

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
    StepperComponent,
  ],
  imports: [
    BrowserModule,
    DirectivesModule,
    MaterialModule,
    AngularFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
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
    StepperComponent,
  ],
})
export class FormsModule {}
