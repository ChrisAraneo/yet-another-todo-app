import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, map, shareReplay, tap } from 'rxjs';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
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
  showDatePicker!: Observable<boolean>;
  isDateRange: boolean = false;
  states: Option<TaskState>[] = [];
  step: number = 1;
  total: number = 4;
  task?: Task;

  private subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<AddTaskModalComponent>,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private taskStateTranslatorService: TaskStateTranslatorService,
    private taskCreator: TaskCreatorService,
    private dateUtilsService: DateUtilsService,
  ) {
    this.initializeStates();
    this.initializeForm();
    this.initializeObservables();
    this.subscribeToShowDatePickerControlChanges();
    this.subscribeToStartTimeControlChanges();
    this.subscribeToEndTimeControlChanges();
  }

  get startDate(): string | null {
    const dateRange = this.taskForm.value.dateRange;

    return this.formatDate(Array.isArray(dateRange) ? dateRange[0] : dateRange);
  }

  get endDate(): string | null {
    const dateRange = this.taskForm.value.dateRange;

    return this.formatDate(Array.isArray(dateRange) ? dateRange[1] : null);
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
      case 3: {
        return this.handleGoNextToFourthStep();
      }
    }
  };

  back = async (): Promise<void> => {
    if (this.step === 1) {
      return;
    } else if (this.step >= 3 && this.shouldSkipDateTimeSelection()) {
      this.step = 1;
    } else {
      this.step--;
    }
  };

  submit = async (): Promise<void> => {
    if (this.taskForm.invalid) {
      return;
    }

    let validTask = true;
    try {
      this.task = this.createTask();
    } catch (_) {
      validTask = false;
    }

    if (!validTask) {
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
      dateRange: new FormControl(null),
      startTime: new FormControl('00:00', { nonNullable: true }),
      endTime: new FormControl('00:00', { nonNullable: true }),
    });
  }

  private initializeObservables(): void {
    this.showDatePicker = this.taskForm.controls.state.valueChanges.pipe(
      tap((state: TaskState) => {
        this.isDateRange =
          state instanceof CompletedTaskState || state instanceof RejectedTaskState;
      }),
      map((state: TaskState) => {
        return (
          state instanceof InProgressTaskState ||
          state instanceof SuspendedTaskState ||
          state instanceof CompletedTaskState ||
          state instanceof RejectedTaskState
        );
      }),
      shareReplay(1),
    );
  }

  private subscribeToShowDatePickerControlChanges(): void {
    this.subscription.add(
      this.showDatePicker.subscribe((show: boolean) => {
        const control = this.taskForm.controls.dateRange;

        if (show) {
          this.setValidatorRequired(control);
        } else {
          this.clearValidatorsAndSetNullValue(control);
        }

        this.taskForm.updateValueAndValidity();
      }),
    );
  }

  private subscribeToStartTimeControlChanges(): void {
    this.subscription.add(
      this.taskForm.controls.startTime.valueChanges.subscribe((startTime) => {
        const parts = startTime.split(':');
        const dateRange = this.taskForm.value.dateRange;

        if (Array.isArray(dateRange)) {
          const date = new Date(dateRange[0]);
          date.setHours(+parts[0]);
          date.setMinutes(+parts[1]);

          this.taskForm.controls.dateRange.setValue([
            date.toISOString(),
            dateRange[1] || date.toISOString(),
          ]);
        } else if (dateRange) {
          const date = new Date(dateRange);
          date.setHours(+parts[0]);
          date.setMinutes(+parts[1]);

          this.taskForm.controls.dateRange.setValue(date.toISOString());
        }
      }),
    );
  }

  private subscribeToEndTimeControlChanges(): void {
    this.subscription.add(
      this.taskForm.controls.endTime.valueChanges.subscribe((endTime) => {
        const parts = endTime.split(':');
        const dateRange = this.taskForm.value.dateRange;

        if (Array.isArray(dateRange) && dateRange.length > 1) {
          const date = new Date(dateRange[1] as string);
          date.setHours(+parts[0]);
          date.setMinutes(+parts[1]);

          this.taskForm.controls.dateRange.setValue([dateRange[0], date.toISOString()]);
        }
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
    const { title, description, state } = this.taskForm.controls;

    title.markAsTouched();
    title.updateValueAndValidity();
    description.markAsTouched();
    description.updateValueAndValidity();
    state.markAsTouched();
    state.updateValueAndValidity();

    if (this.shouldSkipDateTimeSelection()) {
      this.handleGoNextToFourthStep();
    } else if (title.valid && description.valid && state.valid) {
      this.step = 2;
    }
  }

  private handleGoNextToThirdStep(): void {
    this.patchDateRange();

    const { dateRange } = this.taskForm.controls;

    dateRange.markAsTouched();
    dateRange.updateValueAndValidity();

    let validTask = true;
    try {
      this.task = this.createTask();
    } catch (_) {
      validTask = false;
    }

    if (dateRange.valid && validTask) {
      this.step = 3;
    }
  }

  private handleGoNextToFourthStep(): void {
    this.taskForm.updateValueAndValidity();

    if (this.taskForm.valid) {
      this.task = this.createTask();
      this.step = 4;
    }
  }

  private shouldSkipDateTimeSelection(): boolean {
    return (
      this.taskForm.controls?.state?.value?.toString() === new NotStartedTaskState().toString()
    );
  }

  private createTask(): Task {
    const { dateRange } = this.taskForm.value;

    const input: any = {
      ...this.taskForm.value,
      creationDate: new Date(),
    };

    if (dateRange && typeof dateRange === 'string') {
      input['startDate'] = dateRange;
    } else if (dateRange && Array.isArray(dateRange)) {
      input['startDate'] = dateRange[0];
      input['endDate'] = dateRange[1];
    }

    return this.taskCreator.create(input);
  }

  private formatDate(date: Date | string | number | null | undefined): string | null {
    return date ? this.dateUtilsService.formatDate(new Date(date), 'dd MMMM yyyy') : null;
  }

  private patchDateRange(): void {
    const { dateRange, state } = this.taskForm.value;

    if (state instanceof CompletedTaskState || state instanceof RejectedTaskState) {
      this.taskForm.controls.dateRange.patchValue(
        Array.isArray(dateRange) && dateRange.length === 1
          ? [dateRange[0], dateRange[0]]
          : dateRange || null,
      );
    } else {
      this.taskForm.controls.dateRange.patchValue(
        Array.isArray(dateRange) ? dateRange[0] : dateRange || null,
      );
    }
  }
}
