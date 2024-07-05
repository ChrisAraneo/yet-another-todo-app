import { Injectable } from '@angular/core';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import {
  EndedTask,
  PendingTask,
  StartedTask,
  Task,
  TaskState,
} from '../../../../../yet-another-todo-app-shared';
import { TimelineColumn } from '../components/timeline/timeline-content/timeline-content.types';

type Column = { tasks: Task[]; position: number };

@Injectable({
  providedIn: 'root',
})
export class TimelineTaskManagerService {
  constructor(private dateUtilsService: DateUtilsService) {}

  mapTasksToTimelineColumns(
    tasks: Task[],
    today: Date,
    timelineStartDate: Date,
    timelineEndDate: Date,
    statesFilter: TaskState[],
    statesOrder: TaskState[],
  ): TimelineColumn[] {
    this.throwErrorWhenStartDateIsAfterEndDate(timelineStartDate, timelineEndDate);

    const tasksInSelectedPeriod = tasks.filter((task: Task) =>
      this.isTaskInSelectedPeriod(task, timelineStartDate, timelineEndDate, today),
    );

    const filteredTasks: Task[] = tasksInSelectedPeriod.filter((task: Task) =>
      this.includesState(statesFilter, task.getState()),
    );

    const columns = this.organizeTasksIntoColumns(
      filteredTasks,
      timelineStartDate,
      timelineEndDate,
      today,
    );

    this.sortTasksInColumns(columns, statesOrder);

    return this.mapColumnsToTimelineColumns(columns);
  }

  private isTaskInSelectedPeriod(
    task: Task,
    timelineStartDate: Date,
    timelineEndDate: Date,
    today: Date,
  ): boolean {
    const isTodayInDateRange =
      today.valueOf() >= timelineStartDate.valueOf() &&
      today.valueOf() <= timelineEndDate.valueOf();
    const isPendingTask = task instanceof PendingTask;

    if (isTodayInDateRange && isPendingTask) {
      return true;
    }

    const startDate = task instanceof StartedTask ? task.getStartDate() : today;
    const endDate = task instanceof EndedTask ? task.getEndDate() : today;

    return (
      startDate.valueOf() >= timelineStartDate.valueOf() &&
      startDate.valueOf() <= timelineEndDate.valueOf() &&
      endDate.valueOf() >= timelineStartDate.valueOf() &&
      endDate.valueOf() <= timelineEndDate.valueOf()
    );
  }

  private includesState(array: TaskState[], state: TaskState): boolean {
    return array.findIndex((item) => item.toString() === state.toString()) > -1;
  }

  private organizeTasksIntoColumns(
    tasks: Task[],
    timelineStartDate: Date,
    timelineEndDate: Date,
    today: Date,
  ): Column[] {
    const columnTasksMap = new Map<number, { tasks: Task[]; position: number }>();

    tasks.forEach((task) => {
      let placementDate: Date | undefined;

      if (task instanceof EndedTask) {
        placementDate = task.getEndDate();
      } else if (task instanceof StartedTask && +today >= +task.getStartDate()) {
        placementDate = today;
      } else if (task instanceof StartedTask && +today < +task.getStartDate()) {
        placementDate = task.getStartDate();
      } else {
        placementDate = today;
      }

      if (
        (placementDate instanceof Date &&
          +placementDate >= +this.dateUtilsService.getNextDay(timelineEndDate)) ||
        placementDate === undefined
      ) {
        return;
      }

      const key =
        this.dateUtilsService.getNumberOfDaysBetweenDates(timelineStartDate, placementDate) - 1;

      if (columnTasksMap.has(key)) {
        columnTasksMap.set(key, {
          tasks: [...(columnTasksMap.get(key)?.tasks || []), task],
          position: key,
        });
      } else {
        columnTasksMap.set(key, {
          tasks: [task],
          position: key,
        });
      }
    });

    return [...columnTasksMap.values()].sort((a, b) => a.position - b.position);
  }

  private sortTasksInColumns(columns: Column[], statesOrder: TaskState[]): void {
    const statesPriorities = new Map<string, number>();

    statesOrder.forEach((value: TaskState, index: number) => {
      statesPriorities.set(value.toString(), index);
    });

    columns.forEach((column: Column) => {
      column.tasks.sort((a: Task, b: Task) => {
        const stateA = a.getState().toString();
        const stateB = b.getState().toString();
        const priorityA = statesPriorities.get(stateA);
        const priorityB = statesPriorities.get(stateB);

        if (this.isUndefined(priorityA)) {
          return 1;
        }

        if (this.isUndefined(priorityB)) {
          return -1;
        }

        const creationDateDiff = b.getCreationDate().valueOf() - a.getCreationDate().valueOf();

        if (priorityA === priorityB && creationDateDiff !== 0) {
          return creationDateDiff;
        } else if (priorityA === priorityB && creationDateDiff === 0) {
          return a.getId().localeCompare(b.getId());
        }

        return (priorityA as number) - (priorityB as number);
      });
    });
  }

  private isUndefined(x: unknown): boolean {
    return typeof x === 'undefined';
  }

  private mapColumnsToTimelineColumns(columns: Column[]): TimelineColumn[] {
    return columns.map((column: Column, index: number, array: Column[]) => {
      if (index === 0) {
        return {
          tasks: column.tasks,
          leftMargin: column.position,
        };
      } else {
        return {
          tasks: column.tasks,
          leftMargin: column.position - array[index - 1].position - 1,
        };
      }
    });
  }

  private throwErrorWhenStartDateIsAfterEndDate(startDate: Date, endDate: Date): void {
    if (+startDate > +endDate) {
      throw Error('The start date is after the end date');
    }
  }
}
