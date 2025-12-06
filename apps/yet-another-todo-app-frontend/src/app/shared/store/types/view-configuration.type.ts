import { MatSortable } from '@angular/material/sort';
import { TaskState } from '@chris.araneo/yet-another-todo-app-models';

export enum AppMode {
  Timeline = 'TIMELINE',
  Table = 'TABLE',
  Undefined = 'UNDEFINED',
}

export interface TimelineConfiguration {
  startDate: Date;
  endDate: Date;
  order: TaskState[];
  filter: TaskState[];
}

export interface TableConfiguration {
  sort: MatSortable;
}

export interface ViewConfiguration {
  mode: AppMode;
  timeline: TimelineConfiguration;
  table: TableConfiguration;
}
