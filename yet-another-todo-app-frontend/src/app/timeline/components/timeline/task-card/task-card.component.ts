import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/modals/services/dialog/dialog.service';
import { CompletedTaskState } from 'src/app/shared/models/task-state.model';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { EndedTask, Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnChanges, OnDestroy {
  @Input() task!: Task;

  isCompleted: boolean = false;

  private subscription?: Subscription;

  constructor(private dialogService: DialogService, private tasksService: TasksService) {}

  ngOnChanges(): void {
    if (
      this.task instanceof EndedTask &&
      this.task.getState().toString() === new CompletedTaskState().toString()
    ) {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  openEditTaskModal(taskId: string): void {
    const subscription = this.dialogService.navigateToEditTaskModal(taskId).subscribe();

    if (!this.subscription) {
      this.subscription = subscription;
    } else {
      this.subscription.add(subscription);
    }
  }

  completeTask(task: Task): void {
    const subscription = this.tasksService.completeTask(task).subscribe();

    if (!this.subscription) {
      this.subscription = subscription;
    } else {
      this.subscription.add(subscription);
    }
  }
}
