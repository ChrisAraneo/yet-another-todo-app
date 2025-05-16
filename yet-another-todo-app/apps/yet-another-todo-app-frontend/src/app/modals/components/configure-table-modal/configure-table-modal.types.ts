import { FormControl } from '@angular/forms';

export type SortDirection = 'asc' | 'desc';

export interface ConfigureTableForm {
  id: FormControl<string>;
  direction: FormControl<SortDirection>;
}
