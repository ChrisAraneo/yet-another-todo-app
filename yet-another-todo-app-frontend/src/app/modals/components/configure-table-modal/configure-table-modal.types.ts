import { FormControl } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';

export type ConfigureTableForm = {
  id: FormControl<string>;
  direction: FormControl<SortDirection | null>;
};
