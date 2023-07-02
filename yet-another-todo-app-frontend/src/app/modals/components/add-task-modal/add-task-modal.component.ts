import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, delay, map } from 'rxjs';
import { TaskCreatorService } from 'src/app/shared/services/task-creator/task-creator.service';
import { TaskStateTranslatorService } from 'src/app/shared/services/task-state-translator/task-state-translator.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { Option } from '../../../forms/components/select/select.types';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from '../../../shared/models/task-state.model';
import { Task } from '../../../shared/models/task.model';
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
    private taskCreator: TaskCreatorService,
  ) {
    this.initializeStates();
    this.initializeForm();
    this.initializeObservables();
    this.subscribeToShowStartDateControlChanges();
    this.subscribeToShowEndDateControlChanges();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  submit = async (): Promise<void> => {
    if (this.taskForm.invalid) {
      return;
    }

    const task: Task = this.taskCreator.create({
      ...this.taskForm.value,
      creationDate: new Date(),
    });

    return new Promise((resolve) => {
      this.tasksService
        .addTask(task)
        .pipe(delay(350))
        .subscribe(() => {
          resolve();

          this.dialogRef.close();
        });
    });
  };

  cancel(): void {
    this.dialogRef.close();
  }

  private initializeStates(): void {
    this.states = this.taskStateTranslatorService.getTranslatedTaskStateSelectOptions();
  }

  private initializeForm(): void {
    this.taskForm = this.formBuilder.group<TaskForm>({
      title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      description: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      state: new FormControl(new NotStartedTaskState(), {
        validators: [Validators.required],
        nonNullable: true,
      }),
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

  private subscribeToShowStartDateControlChanges(): void {
    this.subscription.add(
      this.showStartDateControl.subscribe((show: boolean) => {
        const control = this.taskForm.controls.startDate;

        if (show) {
          this.setValidatorRequired(control);
        } else {
          this.clearValidatorsAndSetNullValue(control);
        }

        this.taskForm.updateValueAndValidity();
      }),
    );
  }

  private subscribeToShowEndDateControlChanges(): void {
    this.subscription.add(
      this.showEndDateControl.subscribe((show: boolean) => {
        const control = this.taskForm.controls.endDate;

        if (show) {
          this.setValidatorRequired(control);
        } else {
          this.clearValidatorsAndSetNullValue(control);
        }

        this.taskForm.updateValueAndValidity();
      }),
    );
  }

  private setValidatorRequired(control: AbstractControl): void {
    control.setValidators(Validators.required);
  }

  private clearValidatorsAndSetNullValue(control: AbstractControl): void {
    control.clearValidators();
    control.setValue(null);
  }
}
