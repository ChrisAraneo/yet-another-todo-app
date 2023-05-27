import { FormControl } from '@angular/forms';

export type ExportTasksForm = {
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
};
