import { FormControl } from '@angular/forms';

export type DatesFilterForm = {
  startDate: FormControl<string | null>;
  endDate: FormControl<string | null>;
};
