import { MatSortable } from '@angular/material/sort';
import { TaskState } from '../../../../../../yet-another-todo-app-shared';

export enum AppMode {
  Timeline = 'TIMELINE',
  Table = 'TABLE',
  Undefined = 'UNDEFINED',
}

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
  mode: AppMode;
  timeline: TimelineConfiguration;
  table: TableConfiguration;
};
