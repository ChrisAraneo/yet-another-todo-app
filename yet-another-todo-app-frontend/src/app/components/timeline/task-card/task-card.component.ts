import { Component, Input } from '@angular/core';
import { DialogService } from 'src/app/modals/services/dialog/dialog.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;

  constructor(private dialogService: DialogService, private tasksService: TasksService) {}

  openEditTaskModal(taskId: string): void {
    this.dialogService.openEditTaskModal(taskId);
  }

  completeTask(task: Task): void {
    this.tasksService.completeTask(task);
  }
}
