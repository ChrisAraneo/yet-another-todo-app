import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/modals/services/dialog/dialog.service';
import { EndedTask, StartedTask, Task } from '../../../../../../yet-another-todo-app-shared';
import { DateUtilsService } from '../../services/date-utils/date-utils.service';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnChanges, OnDestroy {
  @Input() task!: Task;
  @Input() showEditButton: boolean = false;

  startDate: string = '';
  startTime: string = '';
  endDate: string = '';
  endTime: string = '';

  private subscription: Subscription;

  constructor(private dialogService: DialogService, private dateUtilsService: DateUtilsService) {
    this.subscription = new Subscription();
  }

  ngOnChanges(): void {
    const startDate = this.task instanceof StartedTask ? this.task.getStartDate() : null;
    const endDate = this.task instanceof EndedTask ? this.task.getEndDate() : null;

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
    this.subscription.add(this.dialogService.navigateToEditTaskModal(taskId).subscribe());
  }
}
