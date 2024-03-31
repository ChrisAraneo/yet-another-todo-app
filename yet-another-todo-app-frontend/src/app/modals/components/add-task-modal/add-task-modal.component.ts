import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, map } from 'rxjs';
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
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '300ms',
          keyframes([style({ opacity: 0 }), style({ opacity: 0 }), style({ opacity: 1 })]),
        ),
      ]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AddTaskModalComponent implements OnDestroy {
  static readonly PANEL_CLASS = 'add-task-modal';

  taskForm!: FormGroup<TaskForm>;
  showStartDateControl!: Observable<boolean>;
  showEndDateControl!: Observable<boolean>;
  states: Option<TaskState>[] = [];
  step: number = 1; // TODO NgSwitch
  total: number = 3;
  task?: Task;

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

  next = async (): Promise<void> => {
    switch (this.step) {
      case 1: {
        return this.handleGoNextToSecondStep();
      }
      case 2: {
        return this.handleGoNextToThirdStep();
      }
    }
  };

  back = async (): Promise<void> => {
    this.step > 1 && this.step--;
  };

  submit = async (): Promise<void> => {
    if (this.taskForm.invalid) {
      return;
    }

    this.task = this.createTask();

    if (this.task) {
      return;
    }

    return new Promise((resolve) => {
      this.tasksService.addTask(this.task as Task).subscribe(() => {
        resolve();

        this.dialogRef.close();
      });
    });
  };

  cancel = (): void => {
    this.dialogRef.close();
  };

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

  private handleGoNextToSecondStep(): void {
    const { title, description } = this.taskForm.controls;

    title.markAsTouched();
    title.updateValueAndValidity();
    description.markAsTouched();
    description.updateValueAndValidity();

    if (title.valid && description.valid) {
      this.step = 2;
    }
  }

  private handleGoNextToThirdStep(): void {
    const { state, startDate, endDate } = this.taskForm.controls;

    state.markAsTouched();
    state.updateValueAndValidity();
    startDate.markAsTouched();
    startDate.updateValueAndValidity();
    endDate.markAsTouched();
    endDate.updateValueAndValidity();

    if (state.valid && startDate.valid && endDate.valid) {
      this.task = this.createTask();
      this.step = 3;
    }
  }

  private createTask(): Task {
    return this.taskCreator.create({
      ...this.taskForm.value,
      creationDate: new Date(),
    });
  }
}
