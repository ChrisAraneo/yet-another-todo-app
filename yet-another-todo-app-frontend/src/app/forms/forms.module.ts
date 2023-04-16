import { NgModule } from '@angular/core';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { SelectComponent } from './components/select/select.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
  declarations: [TextInputComponent, TextareaComponent, SelectComponent, DatePickerComponent],
  imports: [],
  providers: [],
  exports: [DatePickerComponent, SelectComponent, TextInputComponent, TextareaComponent],
})
export class FormsModule {}
