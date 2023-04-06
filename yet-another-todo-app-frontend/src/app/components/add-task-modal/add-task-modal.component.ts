import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, map } from 'rxjs';
import { TaskCreator } from 'src/app/models/task-creator.model';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from 'src/app/models/task-state.model';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from '../../models/task.model';
import { TaskStateTranslatorService } from '../../services/task-state-translator/task-state-translator.service';
import { Option } from '../form/select/select.types';
import { TaskForm } from './add-task-modal.types';

@Component({
  selector: 'yata-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
})
export class AddTaskModalComponent implements OnDestroy {
  static readonly PANEL_CLASS = 'add-task-modal';

  taskForm!: FormGroup<TaskForm>;
  showStartDateControl!: Observable<boolean>;
  showEndDateControl!: Observable<boolean>;
  states: Option<TaskState>[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<AddTaskModalComponent>,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private taskStateTranslatorService: TaskStateTranslatorService,
  ) {
    this.initializeStates();
    this.initializeForm();
    this.initializeObservables();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  submit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const task: Task = TaskCreator.create({ ...this.taskForm.value, creationDate: new Date() });
    this.tasksService.addTask(task);

    this.dialogRef.close();
  }

  private initializeStates(): void {
    this.states = this.taskStateTranslatorService.getTranslatedTaskStateSelectOptions();
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

  private initializeObservables(): void {
    this.showStartDateControl = this.taskForm.controls.state.valueChanges.pipe(
      map((state: TaskState) => {
        return (
          state instanceof InProgressTaskState ||
          state instanceof SuspendedTaskState ||
          state instanceof CompletedTaskState ||
          state instanceof RejectedTaskState
        );
      }),
    );

    this.showEndDateControl = this.taskForm.controls.state.valueChanges.pipe(
      map((state: TaskState) => {
        return state instanceof CompletedTaskState || state instanceof RejectedTaskState;
      }),
    );
  }
}
