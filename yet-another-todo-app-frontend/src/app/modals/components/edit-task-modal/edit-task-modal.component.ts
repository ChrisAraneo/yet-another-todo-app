import { Component, Inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, distinct, first, map, shareReplay, tap } from 'rxjs';
import { DateUtilsService } from 'src/app/shared/services/date-utils/date-utils.service';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { TaskCreatorService } from 'src/app/shared/services/task-creator/task-creator.service';
import { TaskStateTranslatorService } from 'src/app/shared/services/task-state-translator/task-state-translator.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import {
  CompletedTaskState,
  EndedTask,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  StartedTask,
  SuspendedTaskState,
  Task,
  TaskState,
} from '../../../../../../yet-another-todo-app-shared';
import { Option } from '../../../forms/components/select/select.types';
import { fadeInOut } from '../../animations/fade-in-out.animation';
import { EditTaskModalData, TaskForm } from './edit-task-modal.types';

@Component({
  selector: 'yata-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
  animations: [fadeInOut],
})
export class EditTaskModalComponent implements OnDestroy {
  static readonly PANEL_CLASS = 'edit-task-modal';

  tasks!: Observable<Option<Task>[]>;
  form!: FormGroup<TaskForm>;
  showDatePicker!: Observable<boolean>;
  isDateRange: boolean = false;
  states: Option<TaskState>[] = [];
  step: number = 1;
  total: number = 5;
  task?: Task;

  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditTaskModalData,
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private taskStateTranslatorService: TaskStateTranslatorService,
    private taskCreator: TaskCreatorService,
    private dateUtilsService: DateUtilsService,
    private navigationService: NavigationService,
  ) {
    this.initializeStates();
    this.initializeTasks();
    this.initializeForm();
    this.updateFormValuesWithInitialTask();
    this.initializeObservables();
    this.subscribeToTaskControlChanges();
    this.subscribeToShowDatePickerControlChanges();
    this.subscribeToStartTimeControlChanges();
    this.subscribeToEndTimeControlChanges();
  }

  get startDate(): string | null {
    const dateRange = this.form.value.dateRange;

    return this.formatDate(Array.isArray(dateRange) ? dateRange[0] : dateRange);
  }

  get endDate(): string | null {
    const dateRange = this.form.value.dateRange;

    return this.formatDate(Array.isArray(dateRange) ? dateRange[1] : null);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
      case 4: {
        return this.handleGoNextToFifthStep();
      }
    }
  };

  back = async (): Promise<void> => {
    if (this.step === 1) {
      return;
    } else if (this.step >= 3 && this.shouldSkipDateTimeSelection()) {
      this.step = 2;
    } else {
      this.step--;
    }
  };

  submit = async (): Promise<void> => {
    if (this.form.invalid) {
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
      this.tasksService.updateTask(this.task as Task).subscribe(() => {
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

  private initializeTasks(): void {
    this.tasks = this.tasksService.getTasks().pipe(
      map((tasks) =>
        tasks.map((task) => ({
          label: `${task.getTitle()} (${task.getShortId()})`,
          value: task,
        })),
      ),
    );
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group<TaskForm>({
      task: new FormControl(null, { validators: [Validators.required] }),
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

  private updateFormValuesWithInitialTask(): void {
    this.subscription.add(
      this.tasks.pipe(first()).subscribe((tasks) => {
        const initialTask = this.getInitialTask(tasks, this.data);

        if (initialTask) {
          this.updateFormValues(this.form, initialTask);
        }
      }),
    );
  }

  private getInitialTask(tasks: Option<Task>[], data: EditTaskModalData): Task | undefined {
    if (!tasks || !tasks.length) {
      return;
    }

    const id = data.initialTaskId;

    return id
      ? tasks.find((item) => item.value.getId() === id)?.value || tasks[0].value
      : tasks[0].value;
  }

  private updateFormValues(form: FormGroup<TaskForm>, task: Task): void {
    form.controls.task.setValue(task);
    form.controls.title.setValue(task?.getTitle() || '');
    form.controls.description.setValue(task?.getDescription() || '');
    form.controls.state.setValue(task?.getState() || new NotStartedTaskState());

    if (task instanceof EndedTask) {
      form.controls.dateRange.setValue([
        task.getStartDate().toISOString(),
        task.getEndDate().toISOString(),
      ]);
      form.controls.startTime.setValue(
        `${task.getStartDate().getHours()}:${task.getStartDate().getMinutes()}`,
      );
      form.controls.endTime.setValue(
        `${task.getEndDate().getHours()}:${task.getEndDate().getMinutes()}`,
      );
    } else if (task instanceof StartedTask) {
      form.controls.dateRange.setValue([task.getStartDate().toISOString()]);
      form.controls.startTime.setValue(
        `${task.getStartDate().getHours()}:${task.getStartDate().getMinutes()}`,
      );
    }

    form.updateValueAndValidity();
  }

  private initializeObservables(): void {
    this.showDatePicker = this.form.controls.state.valueChanges.pipe(
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

  private subscribeToTaskControlChanges(): void {
    this.subscription.add(
      this.form.controls.task.valueChanges
        .pipe(distinct((task) => task?.getId()))
        .subscribe((task: Task | null) => {
          if (task) {
            this.navigationService.navigateToEditTaskRoute(task?.getId()).then(() => {
              this.updateFormValues(this.form, task);
            });
          } else {
            this.form.reset();
          }
        }),
    );
  }

  private subscribeToShowDatePickerControlChanges(): void {
    this.subscription.add(
      this.showDatePicker.subscribe((show: boolean) => {
        const control = this.form.controls.dateRange;

        if (show) {
          this.setValidatorRequired(control);
        } else {
          this.clearValidatorsAndSetNullValue(control);
        }

        this.form.updateValueAndValidity();
      }),
    );
  }

  private subscribeToStartTimeControlChanges(): void {
    this.subscription.add(
      this.form.controls.startTime.valueChanges.subscribe((startTime) => {
        const parts = startTime.split(':');
        const dateRange = this.form.value.dateRange;

        if (Array.isArray(dateRange)) {
          const date = new Date(dateRange[0]);
          date.setHours(+parts[0]);
          date.setMinutes(+parts[1]);

          this.form.controls.dateRange.setValue([
            date.toISOString(),
            dateRange[1] || date.toISOString(),
          ]);
        } else if (dateRange) {
          const date = new Date(dateRange);
          date.setHours(+parts[0]);
          date.setMinutes(+parts[1]);

          this.form.controls.dateRange.setValue(date.toISOString());
        }
      }),
    );
  }

  private subscribeToEndTimeControlChanges(): void {
    this.subscription.add(
      this.form.controls.endTime.valueChanges.subscribe((endTime) => {
        const parts = endTime.split(':');
        const dateRange = this.form.value.dateRange;

        if (Array.isArray(dateRange) && dateRange.length > 1) {
          const date = new Date(dateRange[1] as string);
          date.setHours(+parts[0]);
          date.setMinutes(+parts[1]);

          this.form.controls.dateRange.setValue([dateRange[0], date.toISOString()]);
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
    const { task } = this.form.controls;

    task.markAsTouched();
    task.updateValueAndValidity();

    if (task.value?.getId()) {
      this.step = 2;
    }
  }

  private handleGoNextToThirdStep(): void {
    const { title, description, state } = this.form.controls;

    title.markAsTouched();
    title.updateValueAndValidity();
    description.markAsTouched();
    description.updateValueAndValidity();
    state.markAsTouched();
    state.updateValueAndValidity();

    if (this.shouldSkipDateTimeSelection()) {
      this.handleGoNextToFifthStep();
    } else if (title.valid && description.valid && state.valid) {
      this.step = 3;
    }
  }

  private handleGoNextToFourthStep(): void {
    this.patchDateRange();

    const { dateRange } = this.form.controls;

    dateRange.markAsTouched();
    dateRange.updateValueAndValidity();

    let validTask = true;
    try {
      this.task = this.createTask();
    } catch (_) {
      validTask = false;
    }

    if (dateRange.valid && validTask) {
      this.step = 4;
    }
  }

  private handleGoNextToFifthStep(): void {
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      this.task = this.createTask();
      this.step = 5;
    }
  }

  private shouldSkipDateTimeSelection(): boolean {
    return this.form.controls?.state?.value?.toString() === new NotStartedTaskState().toString();
  }

  private createTask(): Task {
    const { dateRange } = this.form.value;

    const input: any = {
      ...this.form.value,
      creationDate: new Date(),
    };

    if (dateRange && typeof dateRange === 'string') {
      input['startDate'] = dateRange;
    } else if (dateRange && Array.isArray(dateRange)) {
      input['startDate'] = dateRange[0];
      input['endDate'] = dateRange[1];
    }

    if (this.form.value?.task?.getId()) {
      input['id'] = this.form.value?.task?.getId();
    }

    return this.taskCreator.create(input);
  }

  private formatDate(date: Date | string | number | null | undefined): string | null {
    return date ? this.dateUtilsService.formatDate(new Date(date), 'dd MMMM yyyy') : null;
  }

  private patchDateRange(): void {
    const { dateRange, state } = this.form.value;

    if (state instanceof CompletedTaskState || state instanceof RejectedTaskState) {
      this.form.controls.dateRange.patchValue(
        Array.isArray(dateRange) && dateRange.length === 1
          ? [dateRange[0], dateRange[0]]
          : dateRange || null,
      );
    } else {
      this.form.controls.dateRange.patchValue(
        Array.isArray(dateRange) ? dateRange[0] : dateRange || null,
      );
    }
  }
}
