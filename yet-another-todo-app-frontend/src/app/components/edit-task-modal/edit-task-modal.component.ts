import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, first, map, Observable, Subscription } from 'rxjs';
import { TaskCreator } from 'src/app/models/task-creator.model';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
} from 'src/app/models/task-state.model';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { TaskState } from '../../models/task-state.model';
import { EndedTask, StartedTask, Task } from '../../models/task.model';
import { TaskForm, TaskOption } from './edit-task-modal.types';

@Component({
  selector: 'yata-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent implements OnInit, OnDestroy {
  static readonly PANEL_CLASS = 'edit-task-modal';

  readonly title = 'Edit task';
  readonly states = [
    new NotStartedTaskState(),
    new InProgressTaskState(),
    new SuspendedTaskState(),
    new CompletedTaskState(),
    new RejectedTaskState(),
  ].map((state) => ({
    label: state.getRelatedTooltipText(),
    value: state,
  }));

  tasks!: Observable<TaskOption[]>;
  showStartDateControl!: BehaviorSubject<boolean>;
  showEndDateControl!: BehaviorSubject<boolean>;
  taskForm!: FormGroup<TaskForm>;

  private subscription: Subscription = new Subscription();
  private selectedTaskId = new BehaviorSubject<string | null>(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private dateUtilsService: DateUtilsService,
  ) {
    this.initializeForm();

    this.initializeShowStartDateControlSubject(this.taskForm);
    this.initializeShowEndDateControlSubject(this.taskForm);
    this.initializeTasksObservable();

    this.subscribeToSelectedTaskChanges(this.taskForm);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.tasks.pipe(first()).subscribe((tasks) => {
        const initialTask = this.getInitialTask(tasks, this.data);

        if (initialTask) {
          this.updateFormValues(this.taskForm, initialTask);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  submit(): void {
    if (!this.taskForm || this.taskForm.invalid) {
      return;
    }

    const id = this.taskForm.controls.task.value?.getId();
    const task: Task = TaskCreator.create({ ...this.taskForm.value, task: undefined, id });
    this.tasksService.updateTask(task);

    this.dialogRef.close();
  }

  private initializeForm(): void {
    this.taskForm = this.formBuilder.group<TaskForm>({
      task: new FormControl(),
      title: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      state: new FormControl(new NotStartedTaskState(), { nonNullable: true }),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
    });
  }

  private getInitialTask(tasks: TaskOption[], data: any): Task | undefined {
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

  private subscribeToSelectedTaskChanges(form: FormGroup<TaskForm>): void {
    this.subscription.add(
      form.controls.task.valueChanges.subscribe((task: Task | null) => {
        this.updateFormValues(this.taskForm, task);
      }),
    );
  }
}
