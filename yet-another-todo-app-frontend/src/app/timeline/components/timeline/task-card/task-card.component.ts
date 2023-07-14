import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/modals/services/dialog/dialog.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnDestroy {
  @Input() task!: Task;

  private subscription?: Subscription;

  constructor(private dialogService: DialogService, private tasksService: TasksService) {}

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  openEditTaskModal(taskId: string): void {
    this.dialogService.openEditTaskModal(taskId);
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
