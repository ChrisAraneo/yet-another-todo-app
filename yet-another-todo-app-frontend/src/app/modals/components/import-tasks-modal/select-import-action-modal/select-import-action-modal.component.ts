import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { Task } from '../../../../shared/models/task.model';
import { ImportAction } from './select-import-action-modal.types';

@Component({
  selector: 'yata-select-import-action-modal',
  templateUrl: './select-import-action-modal.component.html',
  styleUrls: ['./select-import-action-modal.component.scss'],
})
export class SelectImportActionModalComponent implements OnDestroy {
  static readonly PANEL_CLASS = 'select-import-action-modal';

  readonly actions: ImportAction[] = Object.values(ImportAction);

  action: ImportAction = ImportAction.AddNewAndUpdateExisting;

  private subscription?: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SelectImportActionModalComponent>,
    private tasksService: TasksService,
  ) {}

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  submit(): void {
    this.subscription = this.tasksService
      .importTasks(this.data as Task[], this.action)
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
