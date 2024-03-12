import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/modals/services/dialog/dialog.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'yata-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnDestroy {
  @Input() task!: Task;

  private subscription: Subscription;

  constructor(private dialogService: DialogService) {
    this.subscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openEditTaskModal(taskId: string): void {
    this.subscription.add(this.dialogService.navigateToEditTaskModal(taskId).subscribe());
  }
}
