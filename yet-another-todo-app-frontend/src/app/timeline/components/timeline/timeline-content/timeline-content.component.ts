import { Component, Input, OnChanges } from '@angular/core';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
} from 'src/app/shared/models/task-state.model';
import { Task } from 'src/app/shared/models/task.model';
import { COLUMN_WIDTH } from 'src/app/shared/styles/theme';
import { TimelineTaskManagerService } from 'src/app/timeline/services/timeline-task-manager.service';
import { TimelineColumn } from './timeline-content.types';

@Component({
  selector: 'yata-timeline-content',
  templateUrl: './timeline-content.component.html',
  styleUrls: ['./timeline-content.component.scss'],
})
export class TimelineContentComponent implements OnChanges {
  @Input() today!: Date;
  @Input() startDate!: Date;
  @Input() endDate!: Date;
  @Input() tasks: Task[] = [];

  columns: TimelineColumn[] = [];

  readonly columnWidth = COLUMN_WIDTH;

  constructor(private timelineTaskManager: TimelineTaskManagerService) {}

  ngOnChanges(): void {
    if (this.tasks && this.today && this.startDate && this.endDate) {
      this.updateColumns(this.tasks, this.today, this.startDate, this.endDate);
    }
  }

  private updateColumns(tasks: Task[], today: Date, startDate: Date, endDate: Date): void {
    this.columns = this.timelineTaskManager.mapTasksToTimelineColumns(
      tasks,
      today,
      startDate,
      endDate,
      [
        new NotStartedTaskState(),
        new InProgressTaskState(),
        new CompletedTaskState(),
        new RejectedTaskState(),
      ],
      [new InProgressTaskState()],
    );
  }
}
