import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  EndedTask,
  StartedTask,
  Task,
} from '@chris.araneo/yet-another-todo-app-shared';
import { Subscription } from 'rxjs';

import { DateUtilsService } from '../../services/date-utils/date-utils.service';
import { LabelComponent } from '../label/label.component';
import { ParagraphComponent } from '../paragraph/paragraph.component';
import { TaskStateIconComponent } from '../task-state-icon/task-state-icon.component';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    TaskStateIconComponent,
    TitleComponent,
    LabelComponent,
    ParagraphComponent,
    MatIcon,
  ],
})
export class TaskCardComponent implements OnChanges, OnDestroy {
  @Input() task!: Task;
  @Input() showEditButton = false;

  startDate = '';
  startTime = '';
  endDate = '';
  endTime = '';

  private subscription: Subscription;

  constructor(private dateUtilsService: DateUtilsService) {
    this.subscription = new Subscription();
  }

  ngOnChanges(): void {
    const startDate =
      this.task instanceof StartedTask ? this.task.getStartDate() : null;
    const endDate =
      this.task instanceof EndedTask ? this.task.getEndDate() : null;

    if (startDate) {
      this.startDate = `${this.dateUtilsService.formatDate(startDate, 'dd MMM')}`;
      this.startTime = this.dateUtilsService.formatDate(startDate, 'HH:mm');
    }

    if (endDate) {
      this.endDate = this.dateUtilsService.formatDate(endDate, 'dd MMM');
      this.endTime = this.dateUtilsService.formatDate(endDate, 'HH:mm');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openEditTaskModal(taskId: string): void {
    // TODO Refactor: Task Card should not use Dialog Service, because it is in different module
    // this.subscription.add(this.dialogService.navigateToEditTaskModal(taskId).subscribe());
    console.log(
      'TODO Refactor: Task Card should not use Dialog Service, because it is in different module',
      taskId,
    );
  }
}
