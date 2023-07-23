import { FormControl } from '@angular/forms';

export type ConfigureTimelineForm = {
  startDate: FormControl<string>;
  endDate: FormControl<string>;
};
