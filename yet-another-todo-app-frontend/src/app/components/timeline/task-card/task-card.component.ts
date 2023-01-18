import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;

  constructor() {}
}
