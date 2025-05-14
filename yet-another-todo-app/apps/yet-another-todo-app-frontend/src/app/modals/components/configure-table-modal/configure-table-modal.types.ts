import { FormControl } from '@angular/forms';

export type SortDirection = 'asc' | 'desc';

export type ConfigureTableForm = {
  id: FormControl<string>;
  direction: FormControl<SortDirection>;
};
