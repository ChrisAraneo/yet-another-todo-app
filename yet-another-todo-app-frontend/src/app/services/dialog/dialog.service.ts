import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskModalComponent } from 'src/app/components/modals/delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from 'src/app/components/modals/edit-task-modal/edit-task-modal.component';
import { SignInModalComponent } from 'src/app/components/modals/sign-in-modal/sign-in-modal.component';
import { DIALOG_WIDTH } from 'src/app/shared/theme';
import { AddTaskModalComponent } from '../../components/modals/add-task-modal/add-task-modal.component';

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

  private openDialog(component: ComponentType<any>, data?: object): void {
    this.dialog.open(component, {
      width: DIALOG_WIDTH,
      panelClass: (component as any)['PANEL_CLASS'] || 'undefined-panel-class',
      ...(data ? { data: { ...data } } : {}),
    });
  }
}
