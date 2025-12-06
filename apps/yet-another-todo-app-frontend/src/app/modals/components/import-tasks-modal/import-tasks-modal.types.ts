import { FormControl } from '@angular/forms';

export interface ImportTasksForm {
  file: FormControl<ArrayBuffer | null>;
  password: FormControl<string>;
}
