import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { SelectComponent } from './components/select/select.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [
    SubmitButtonComponent,
    TextInputComponent,
    TextareaComponent,
    SelectComponent,
    DatePickerComponent,
    PasswordInputComponent,
    FileInputComponent,
  ],
  imports: [BrowserModule, MatButtonModule, DirectivesModule, MatProgressSpinnerModule],
  providers: [],
  exports: [
    SubmitButtonComponent,
    DatePickerComponent,
    SelectComponent,
    TextInputComponent,
    TextareaComponent,
    PasswordInputComponent,
    FileInputComponent,
  ],
})
export class FormsModule {}
