import { FormControl } from '@angular/forms';

export type ConfigureTimelineForm = {
  startDate: FormControl<Date>;
  endDate: FormControl<Date>;
};
