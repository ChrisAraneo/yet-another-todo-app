import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import differenceInDays from 'date-fns/differenceInDays';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { COLUMN_WIDTH } from 'src/app/shared/theme';
import { Task } from '../../../models/task.type';

type Column = {
  tasks: Task[];
  left: string;
};

@Component({
  selector: 'yata-timeline-content',
  templateUrl: './timeline-content.component.html',
  styleUrls: ['./timeline-content.component.scss'],
})
export class TimelineContentComponent implements OnChanges {
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() tasks: Task[] = [];

  columns: Column[] = [];

  private readonly columnWidth = COLUMN_WIDTH;

  constructor(private dateUtils: DateUtilsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { startDate, tasks } = changes;

    this.columns = this.mapTasksToColumns(tasks.currentValue, startDate.currentValue);
  }

  private mapTasksToColumns(tasks: Task[], timelineStartDate: Date): Column[] {
    const map: Map<string, Task[]> = new Map();

    tasks.forEach((task) => {
      const startDate: string = this.dateUtils.formatDate(task.startDate, 'dd-MM-yyyy');

      if (map.has(startDate)) {
        map.set(startDate, [...(map.get(startDate) || []), task]);
      } else {
        map.set(startDate, [task]);
      }
    });

    const array = Array.from(map.values()).sort((a, b) => {
      return a[0].startDate.valueOf() - b[0].startDate.valueOf();
    });

    return array.map((tasks: Task[], index: number) => {
      const left =
        (differenceInDays(tasks[0].startDate, timelineStartDate) - index) * this.columnWidth + 'px';

      return {
        tasks,
        left,
      };
    });
  }
}
