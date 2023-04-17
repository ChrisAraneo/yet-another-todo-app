import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { SelectComponent } from './components/select/select.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
  declarations: [
    TextInputComponent,
    TextareaComponent,
    SelectComponent,
    DatePickerComponent,
    PasswordInputComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  exports: [DatePickerComponent, SelectComponent, TextInputComponent, TextareaComponent],
})
export class FormsModule {}
