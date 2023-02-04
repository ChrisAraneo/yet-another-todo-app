import { Component, Input } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;

  constructor(private dialogService: DialogService) {}

  openEditTaskModal(taskId: string): void {
    this.dialogService.openEditTaskModal(taskId);
  }
}
