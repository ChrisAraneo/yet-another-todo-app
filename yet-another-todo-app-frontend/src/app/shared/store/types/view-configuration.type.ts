import { MatSortable } from '@angular/material/sort';
import { TaskState } from '../../models/task-state.model';

export type ViewConfiguration = {
  timeline: {
    startDate: Date;
    endDate: Date;
    order: TaskState[];
    filter: TaskState[];
  };
  table: {
    sort: MatSortable;
  };
};
