import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { SelectComponent } from './components/select/select.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
  declarations: [TextInputComponent, TextareaComponent, SelectComponent, DatePickerComponent],
  imports: [BrowserModule],
  providers: [],
  exports: [DatePickerComponent, SelectComponent, TextInputComponent, TextareaComponent],
})
export class FormsModule {}
