import { MatSortable } from '@angular/material/sort';
import { TaskState } from '../../models/task-state.model';

export type TimelineConfiguration = {
  startDate: Date;
  endDate: Date;
  order: TaskState[];
  filter: TaskState[];
};

export type TableConfiguration = {
  sort: MatSortable;
};

export type ViewConfiguration = {
  timeline: TimelineConfiguration;
  table: TableConfiguration;
};
