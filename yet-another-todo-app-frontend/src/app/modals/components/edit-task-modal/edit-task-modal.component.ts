import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription, first, map } from 'rxjs';
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
import { EndedTask, StartedTask, Task } from '../../../shared/models/task.model';
import { TaskForm } from './edit-task-modal.types';

@Component({
  selector: 'yata-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent implements OnInit, OnDestroy {
  static readonly PANEL_CLASS = 'edit-task-modal';

  tasks!: Observable<Option<Task>[]>;
  isAnyTaskDefined!: Observable<boolean>;
  showStartDateControl!: BehaviorSubject<boolean>;
  showEndDateControl!: BehaviorSubject<boolean>;
  taskForm!: FormGroup<TaskForm>;
  states: Option<TaskState>[] = [];

  private subscription: Subscription = new Subscription();
  private selectedTaskId = new BehaviorSubject<string | null>(null);
  private creationDate?: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private dateUtilsService: DateUtilsService,
    private taskStateTranslatorService: TaskStateTranslatorService,
    private taskCreator: TaskCreatorService,
  ) {
    this.initializeStates();
    this.initializeForm();

    this.initializeShowStartDateControlSubject(this.taskForm);
    this.initializeShowEndDateControlSubject(this.taskForm);
    this.initializeTasksObservable();

    this.subscribeToShowStartDateControlChanges();
    this.subscribeToShowEndDateControlChanges();
    this.subscribeToSelectedTaskChanges(this.taskForm);
  }

  ngOnInit(): void {
    this.updateFormValuesWithInitialTask();
    this.initializeIsAnyTaskDefinedObservable();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  submit(): void {
    if (!this.taskForm || this.taskForm.invalid) {
      return;
    }

    const id = this.taskForm.controls.task.value?.getId();
    const task: Task = this.taskCreator.create({
      ...this.taskForm.value,
      task: undefined,
      id,
      creationDate: this.creationDate,
    });

    this.tasksService.updateTask(task);

    this.dialogRef.close();
  }

  private initializeStates(): void {
    this.states = this.taskStateTranslatorService.getTranslatedTaskStateSelectOptions();
  }

  private initializeForm(): void {
    this.taskForm = this.formBuilder.group<TaskForm>({
      task: new FormControl(),
      title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      description: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      state: new FormControl(new NotStartedTaskState(), { nonNullable: true }),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
  }

  private getInitialTask(tasks: Option<Task>[], data: any): Task | undefined {
    if (!tasks || !tasks.length) {
      return;
    }

    const id = data && data['initialTaskId'];

    return id
      ? tasks.find((item) => item.value.getId() === id)?.value || tasks[0].value
      : tasks[0].value;
  }

  private initializeTasksObservable(): void {
    this.tasks = this.tasksService
      .getTasks()
      .pipe(map((tasks) => tasks.map((task) => ({ label: task.getTitle(), value: task }))));
  }

  private updateFormValues(form: FormGroup<TaskForm>, task: Task | null): void {
    const id = task?.getId() || null;

    if (id === this.selectedTaskId.getValue()) {
      return;
    }

    this.selectedTaskId.next(id);

    form.controls.task.setValue(task);
    form.controls.title.setValue(task?.getTitle() || '');
    form.controls.description.setValue(task?.getDescription() || '');
    form.controls.state.setValue(task?.getState() || new NotStartedTaskState());

    if (task instanceof StartedTask || task instanceof EndedTask) {
      form.controls.startDate.setValue(
        this.dateUtilsService.formatDate(task.getStartDate(), 'yyyy-MM-dd'),
      );
    }

    if (task instanceof EndedTask) {
      form.controls.endDate.setValue(
        this.dateUtilsService.formatDate(task.getEndDate(), 'yyyy-MM-dd'),
      );
    }

    form.updateValueAndValidity();
  }

  private initializeShowStartDateControlSubject(form: FormGroup<TaskForm>): void {
    const isVisibleFn = (state: TaskState): boolean =>
      state instanceof InProgressTaskState ||
      state instanceof SuspendedTaskState ||
      state instanceof CompletedTaskState ||
      state instanceof RejectedTaskState;

    this.showStartDateControl = new BehaviorSubject<boolean>(
      isVisibleFn(form.controls.state.value),
    );

    this.subscription.add(
      form.controls.state.valueChanges.subscribe((state: TaskState) => {
        this.showStartDateControl.next(isVisibleFn(state));
      }),
    );
  }

  private initializeShowEndDateControlSubject(form: FormGroup<TaskForm>): void {
    const isVisibleFn = (state: TaskState): boolean =>
      state instanceof CompletedTaskState || state instanceof RejectedTaskState;

    this.showEndDateControl = new BehaviorSubject<boolean>(isVisibleFn(form.controls.state.value));

    this.subscription.add(
      form.controls.state.valueChanges.subscribe((state: TaskState) => {
        this.showEndDateControl.next(isVisibleFn(state));
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
          this.clearValidators(control);
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
          this.clearValidators(control);
        }

        this.taskForm.updateValueAndValidity();
      }),
    );
  }

  private subscribeToSelectedTaskChanges(form: FormGroup<TaskForm>): void {
    this.subscription.add(
      form.controls.task.valueChanges.subscribe((task: Task | null) => {
        this.updateFormValues(this.taskForm, task);
        this.creationDate = task?.getCreationDate();
      }),
    );
  }

  private updateFormValuesWithInitialTask(): void {
    this.subscription.add(
      this.tasks.pipe(first()).subscribe((tasks) => {
        const initialTask = this.getInitialTask(tasks, this.data);

        if (initialTask) {
          this.updateFormValues(this.taskForm, initialTask);
        }
      }),
    );
  }

  private initializeIsAnyTaskDefinedObservable(): void {
    this.isAnyTaskDefined = this.tasks.pipe(map((tasks) => tasks && tasks.length > 0));
  }

  private setValidatorRequired(control: AbstractControl): void {
    control.setValidators(Validators.required);
  }

  private clearValidators(control: AbstractControl): void {
    control.clearValidators();
  }
}
