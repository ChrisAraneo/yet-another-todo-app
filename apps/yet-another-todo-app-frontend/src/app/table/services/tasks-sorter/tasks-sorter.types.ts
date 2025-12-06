import { SortDirection } from '@angular/material/sort';

import { TasksDataSource } from '../../table.types';

export type SortActive = keyof TasksDataSource;

export interface SortOptions {
  active: SortActive;
  direction: SortDirection;
}
