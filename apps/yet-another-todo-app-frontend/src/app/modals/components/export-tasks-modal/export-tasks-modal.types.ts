import { FormControl } from '@angular/forms';

export interface ExportTasksForm {
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}
