import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ZipTasksService } from 'src/app/shared/services/zip-tasks/zip-tasks.service';
import { Task } from '../../../shared/models/task.model';

@Component({
  selector: 'yata-export-tasks-modal',
  templateUrl: './export-tasks-modal.component.html',
  styleUrls: ['./export-tasks-modal.component.scss'],
})
export class ExportTasksModalComponent {
  static readonly PANEL_CLASS = 'export-tasks-modal';

  tasks!: Observable<Task[]>;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ExportTasksModalComponent>,
    private tasksService: TasksService,
    private zipTasksService: ZipTasksService,
  ) {
    this.initializeTasksObservable();
  }

  export(tasks: Task[]): void {
    this.isLoading = true;

    this.zipTasksService.zip(tasks, 'TODO Add password').then(() => {
      this.isLoading = false;
      this.dialogRef.close();
    });
  }

  private initializeTasksObservable(): void {
    this.tasks = this.tasksService.getTasks();
  }
}
