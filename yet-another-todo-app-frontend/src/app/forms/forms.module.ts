import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpLoaderFactory } from '../app.module';
import { LabelModule } from '../shared/components/label/label.module';
import { MaterialModule } from '../shared/material.module';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { CancelButtonComponent } from './components/cancel-button/cancel-button.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FormLabelComponent } from './components/form-label/form-label.component';
import { NextButtonComponent } from './components/next-button/next-button.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { ReadonlyComponent } from './components/readonly/readonly.component';
import { SelectComponent } from './components/select/select.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [
    FormLabelComponent,
    NextButtonComponent,
    BackButtonComponent,
    SubmitButtonComponent,
    CancelButtonComponent,
    TextInputComponent,
    TextareaComponent,
    SelectComponent,
    DatePickerComponent,
    PasswordInputComponent,
    FileInputComponent,
    ReadonlyComponent,
    TimePickerComponent,
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
    DropdownModule,
    InputNumberModule,
    LabelModule,
  ],
  providers: [],
  exports: [
    NextButtonComponent,
    BackButtonComponent,
    SubmitButtonComponent,
    CancelButtonComponent,
    DatePickerComponent,
    SelectComponent,
    TextInputComponent,
    TextareaComponent,
    PasswordInputComponent,
    FileInputComponent,
    ReadonlyComponent,
    TimePickerComponent,
  ],
})
export class FormsModule {}
