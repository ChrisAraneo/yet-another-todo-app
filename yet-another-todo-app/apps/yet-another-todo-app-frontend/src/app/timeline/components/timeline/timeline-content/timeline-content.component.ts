import { Component, Input, OnChanges } from '@angular/core';

import {
  Task,
  TaskState,
} from '@chris.araneo/yet-another-todo-app-shared';
import { TimelineColumn } from './timeline-content.interfaces';
import { TimelineTaskManagerService } from '../../../services/timeline-task-manager.service';
import { NgFor, NgStyle } from '@angular/common';
import { TaskCardComponent } from '../../../../shared/components/task-card/task-card.component';

@Component({
  selector: 'yata-timeline-content',
  templateUrl: './timeline-content.component.html',
  styleUrl: './timeline-content.component.scss',
  imports: [NgFor, NgStyle, TaskCardComponent]
})
export class TimelineContentComponent implements OnChanges {
  @Input() today!: Date;
  @Input() startDate!: Date | null;
  @Input() endDate!: Date | null;
  @Input() tasks: Task[] = [];
  @Input() tasksStateSortOrder: TaskState[] = [];
  @Input() tasksStateFilter: TaskState[] = [];

  columns: TimelineColumn[] = [];
  styles = {};

  constructor(
    private readonly timelineTaskManager: TimelineTaskManagerService,
  ) {}

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
