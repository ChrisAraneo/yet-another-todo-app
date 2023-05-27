import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskModalComponent } from 'src/app/modals/components/add-task-modal/add-task-modal.component';
import { DeleteTaskModalComponent } from 'src/app/modals/components/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from 'src/app/modals/components/edit-task-modal/edit-task-modal.component';
import { SignInModalComponent } from 'src/app/modals/components/sign-in-modal/sign-in-modal.component';
import { DIALOG_WIDTH } from 'src/app/shared/styles/theme';
import { ExportTasksModalComponent } from '../../components/export-tasks-modal/export-tasks-modal.component';
import { ImportTasksModalComponent } from '../../components/import-tasks-modal/import-tasks-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openAddTaskModal(): void {
    this.openDialog(AddTaskModalComponent);
  }

  openEditTaskModal(initialTaskId?: string): void {
    this.openDialog(EditTaskModalComponent, { initialTaskId });
  }

  openDeleteTaskModal(initialTaskId?: string): void {
    this.openDialog(DeleteTaskModalComponent, { initialTaskId });
  }

  openSignInModal(): void {
    this.openDialog(SignInModalComponent);
  }

  openExportTasksModal(): void {
    this.openDialog(ExportTasksModalComponent);
  }

  openImportTasksModal(): void {
    this.openDialog(ImportTasksModalComponent);
  }

  private openDialog(component: ComponentType<any>, data?: object): void {
    this.dialog.open(component, {
      width: DIALOG_WIDTH,
      panelClass: (component as any)['PANEL_CLASS'] || 'undefined-panel-class',
      ...(data ? { data: { ...data } } : {}),
    });
  }
}
