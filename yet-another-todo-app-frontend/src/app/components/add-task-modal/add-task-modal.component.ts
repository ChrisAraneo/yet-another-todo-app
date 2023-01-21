import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from 'src/app/models/task-state.model';
import { TaskForm } from './add-task-modal.types';

@Component({
  selector: 'yata-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
})
export class AddTaskModalComponent implements OnDestroy {
  static readonly PANEL_CLASS = 'add-task-modal';

  readonly title = 'Add new task';
  readonly states: TaskState[] = [
    new NotStartedTaskState(),
    new InProgressTaskState(),
    new SuspendedTaskState(),
    new CompletedTaskState(),
    new RejectedTaskState(),
  ];

  taskForm!: FormGroup<TaskForm>;

  showStartDateControl: boolean = false;
  showEndDateControl: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<AddTaskModalComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.initializeForm();
    this.subscribeToStateValueChange();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  submit(): void {
    alert('Not implemented yet');
  }

  private initializeForm(): void {
    this.taskForm = this.formBuilder.group<TaskForm>({
      title: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      state: new FormControl(new NotStartedTaskState(), { nonNullable: true }),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
  }

  private subscribeToStateValueChange(): void {
    this.subscription.add(
      this.taskForm.controls.state.valueChanges.subscribe((state: TaskState) =>
        this.updateDateInputsVisibility(state),
      ),
    );
  }

  private updateDateInputsVisibility(state: TaskState): void {
    if (state instanceof NotStartedTaskState) {
      this.showStartDateControl = false;
      this.showEndDateControl = false;
    } else if (state instanceof InProgressTaskState || state instanceof SuspendedTaskState) {
      this.showStartDateControl = true;
      this.showEndDateControl = false;
    } else if (state instanceof CompletedTaskState || state instanceof RejectedTaskState) {
      this.showStartDateControl = true;
      this.showEndDateControl = true;
    } else {
      throw Error(`Invalid selected task state: ${state}`);
    }
  }
}
