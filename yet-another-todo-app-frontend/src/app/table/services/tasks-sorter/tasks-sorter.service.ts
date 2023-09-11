import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { TaskState } from 'src/app/shared/models/task-state.model';
import { TasksDataSource } from '../../table.types';
import { SortActive, SortOptions } from './tasks-sorter.types';

@Injectable({
  providedIn: 'root',
})
export class TasksSorterService {
  sort(tasks: TasksDataSource[], options: SortOptions): TasksDataSource[] {
    const key: SortActive = options.active;
    const direction: SortDirection = options.direction;

    if (!key || direction === '') {
      return [...tasks];
    }

    return [...tasks].sort((a: TasksDataSource, b: TasksDataSource) => {
      const valueA: string = this.valueToString(a[key]);
      const valueB: string = this.valueToString(b[key]);

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * (direction === 'asc' ? 1 : -1);
      } else {
        throw new Error(
          `Can't compare invalid values during sorting. Key: ${key}, direction: ${direction}, values: ${[
            valueA,
            valueB,
          ]}`,
        );
      }
    });
  }

  private valueToString(value: string | TaskState): string {
    if (typeof value === 'string') {
      return value;
    } else if (value instanceof TaskState) {
      return value.toString();
    } else {
      throw new Error(`Value has invalid type: ${value}`);
    }
  }
}
