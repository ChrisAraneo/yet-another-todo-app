import { Component, Input, OnChanges } from '@angular/core';
import differenceInDays from 'date-fns/differenceInDays';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { COLUMN_WIDTH } from 'src/app/shared/styles/theme';
import { StartedTask } from '../../../models/task.model';

type Column = {
  tasks: StartedTask[];
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
  @Input() tasks: StartedTask[] = [];

  columns: Column[] = [];

  private readonly columnWidth = COLUMN_WIDTH;

  constructor(private dateUtils: DateUtilsService) {}

  ngOnChanges(): void {
    if (this.tasks && this.startDate) {
      this.columns = this.mapTasksToColumns(this.tasks, this.startDate);
    }
  }

  private mapTasksToColumns(tasks: StartedTask[], timelineStartDate: Date): Column[] {
    const map: Map<string, StartedTask[]> = new Map();

    tasks.forEach((task) => {
      const startDate: string = this.dateUtils.formatDate(task.getStartDate(), 'dd-MM-yyyy');

      if (map.has(startDate)) {
        map.set(startDate, [...(map.get(startDate) || []), task]);
      } else {
        map.set(startDate, [task]);
      }
    });

    const array = Array.from(map.values()).sort((a, b) => {
      return a[0].getStartDate().valueOf() - b[0].getStartDate().valueOf();
    });

    return array.map((tasks: StartedTask[], index: number) => {
      const left =
        (differenceInDays(tasks[0].getStartDate(), timelineStartDate) - index) * this.columnWidth +
        'px';

      return {
        tasks,
        left,
      };
    });
  }
}
