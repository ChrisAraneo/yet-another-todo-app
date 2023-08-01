import { Injectable } from '@angular/core';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { TaskState } from '../../shared/models/task-state.model';
import { EndedTask, PendingTask, StartedTask, Task } from '../../shared/models/task.model';
import { TimelineColumn } from '../components/timeline/timeline-content/timeline-content.types';

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
    const tasksInSelectedPeriod = tasks.filter((task: Task) => {
      if (
        task instanceof EndedTask &&
        task.getStartDate().valueOf() >= timelineStartDate.valueOf() &&
        task.getStartDate().valueOf() <= timelineEndDate.valueOf() &&
        task.getEndDate().valueOf() >= timelineStartDate.valueOf() &&
        task.getEndDate().valueOf() <= timelineEndDate.valueOf()
      ) {
        return true;
      } else if (
        task instanceof StartedTask &&
        task.getStartDate().valueOf() >= timelineStartDate.valueOf() &&
        task.getStartDate().valueOf() <= timelineEndDate.valueOf()
      ) {
        return true;
      } else if (task instanceof PendingTask) {
        return true;
      }

      return false;
    });

    const filteredTasks: Task[] = tasksInSelectedPeriod.filter((task: Task) =>
      this.includesState(statesFilter, task.getState()),
    );

    const map = new Map<number, any>();

    filteredTasks.forEach((task) => {
      const placementDate: Date = task instanceof StartedTask ? task.getStartDate() : today;

      if (placementDate.valueOf() >= this.dateUtilsService.getNextDay(timelineEndDate).valueOf()) {
        return;
      }

      const key =
        this.dateUtilsService.getNumberOfDaysBetweenDates(timelineStartDate, placementDate) - 1;

      if (map.has(key)) {
        map.set(key, {
          tasks: [...(map.get(key)?.tasks || []), task],
          position: key,
        });
      } else {
        map.set(key, {
          tasks: [task],
          position: key,
        });
      }
    });

    const columns = [...map.values()].sort((a, b) => a.position - b.position);

    const stateNumber = new Map<string, number>();

    statesOrder.forEach((value: TaskState, index: number) => {
      stateNumber.set(value.toString(), index);
    });

    columns.forEach((column: any) => {
      column.tasks.sort((a: Task, b: Task) => {
        const n = stateNumber.get(a.getState().toString());
        const m = stateNumber.get(b.getState().toString());

        if (this.isUndefined(n)) {
          return 1;
        } else if (this.isUndefined(m)) {
          return -1;
        }

        return Number(n) - Number(m);
      });
    });

    return columns.map((column: any, index: number, array: any[]) => {
      if (index === 0) {
        return {
          tasks: column.tasks,
          leftMargin: 0,
        };
      } else {
        return {
          tasks: column.tasks,
          leftMargin: column.position - array[index - 1].position - 1,
        };
      }
    });
  }

  private includesState(array: TaskState[], state: TaskState): boolean {
    return array.findIndex((item) => item.toString() === state.toString()) > -1;
  }

  private isUndefined(x: unknown): boolean {
    return typeof x === 'undefined';
  }
}
