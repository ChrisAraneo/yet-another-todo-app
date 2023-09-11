import { FormControl } from '@angular/forms';

export type ImportTasksForm = {
  file: FormControl<ArrayBuffer | null>;
  password: FormControl<string>;
};
