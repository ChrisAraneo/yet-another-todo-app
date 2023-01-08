import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskModalComponent } from '../../components/add-task-modal/add-task-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openAddTaskModal(): void {
    this.dialog.open(AddTaskModalComponent, {
      width: '250px',
    });
  }
}
