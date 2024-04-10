import { Component, Input, OnChanges } from '@angular/core';
import { TaskState } from 'src/app/shared/models/task-state.model';
import { Task } from 'src/app/shared/models/task.model';
import { COLUMN_WIDTH } from 'src/app/shared/styles/theme.__generated';
import { TimelineTaskManagerService } from 'src/app/timeline/services/timeline-task-manager.service';
import { TimelineColumn } from './timeline-content.types';

@Component({
  selector: 'yata-timeline-content',
  templateUrl: './timeline-content.component.html',
  styleUrls: ['./timeline-content.component.scss'],
})
export class TimelineContentComponent implements OnChanges {
  @Input() today!: Date;
  @Input() startDate!: Date | null;
  @Input() endDate!: Date | null;
  @Input() tasks: Task[] = [];
  @Input() tasksStateSortOrder: TaskState[] = [];
  @Input() tasksStateFilter: TaskState[] = [];

  columns: TimelineColumn[] = [];

  readonly columnWidth = COLUMN_WIDTH;

  constructor(private timelineTaskManager: TimelineTaskManagerService) {}

  ngOnChanges(): void {
    if (
      this.tasks &&
      this.today &&
      this.startDate &&
      this.endDate &&
      this.tasksStateFilter &&
      this.tasksStateSortOrder
    ) {
      this.updateColumns(
        this.tasks,
        this.today,
        this.startDate,
        this.endDate,
        this.tasksStateFilter,
        this.tasksStateSortOrder,
      );
    }
  }

  private updateColumns(
    tasks: Task[],
    today: Date,
    startDate: Date,
    endDate: Date,
    tasksStateFilter: TaskState[],
    tasksStateSortOrder: TaskState[],
  ): void {
    this.columns = this.timelineTaskManager.mapTasksToTimelineColumns(
      tasks,
      today,
      startDate,
      endDate,
      tasksStateFilter,
      tasksStateSortOrder,
    );
  }
}
