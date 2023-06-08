import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { SelectComponent } from './components/select/select.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [
    TextInputComponent,
    TextareaComponent,
    SelectComponent,
    DatePickerComponent,
    PasswordInputComponent,
    FileInputComponent,
  ],
  imports: [BrowserModule, MatButtonModule, DirectivesModule],
  providers: [],
  exports: [
    DatePickerComponent,
    SelectComponent,
    TextInputComponent,
    TextareaComponent,
    PasswordInputComponent,
    FileInputComponent,
  ],
})
export class FormsModule {}
