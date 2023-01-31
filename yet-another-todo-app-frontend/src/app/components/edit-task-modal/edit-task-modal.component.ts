import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { first, map, Observable, Subscription } from 'rxjs';
import { TaskCreator } from 'src/app/models/task-creator.model';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
} from 'src/app/models/task-state.model';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { TaskState } from '../../models/task-state.model';
import { EndedTask, StartedTask, Task } from '../../models/task.model';
import { TaskForm, TaskOption } from './edit-task-modal.types';

@Component({
  selector: 'yata-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent implements OnDestroy {
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
  showStartDateControl!: Observable<boolean>;
  showEndDateControl!: Observable<boolean>;
  taskForm?: FormGroup<TaskForm>;

  private subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
  ) {
    this.initializeTasksObservable();

    this.subscription.add(
      this.tasks.pipe(first()).subscribe((tasks) => {
        const initialTask = tasks && tasks[0].value;

        if (initialTask) {
          this.initializeForm(initialTask);
        }

        if (this.taskForm) {
          this.initializeShowStartDateControlObservable(this.taskForm);
          this.initializeShowEndDateControlObservable(this.taskForm);

          this.subscribeToSelectedTaskChanges(this.taskForm);
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

  private initializeTasksObservable(): void {
    this.tasks = this.tasksService
      .getTasks()
      .pipe(map((tasks) => tasks.map((task) => ({ label: task.getTitle(), value: task }))));
  }

  private initializeForm(initialTask: Task): void {
    if (!initialTask) {
      throw new Error("Can't initialize Edit task modal form, initial task is undefined");
    }

    this.taskForm = this.formBuilder.group<TaskForm>({
      task: new FormControl(initialTask),
      title: new FormControl(initialTask.getTitle(), { nonNullable: true }),
      description: new FormControl(initialTask.getDescription(), { nonNullable: true }),
      state: new FormControl(initialTask.getState(), { nonNullable: true }),
      startDate: new FormControl(
        initialTask instanceof StartedTask ? initialTask.getStartDate() : null,
      ),
      endDate: new FormControl(initialTask instanceof EndedTask ? initialTask.getEndDate() : null),
    });
  }

  private initializeShowStartDateControlObservable(form: FormGroup<TaskForm>): void {
    this.showStartDateControl = form.controls.state.valueChanges.pipe(
      map((state: TaskState) => {
        return (
          state instanceof InProgressTaskState ||
          state instanceof SuspendedTaskState ||
          state instanceof CompletedTaskState ||
          state instanceof RejectedTaskState
        );
      }),
    );
  }

  private initializeShowEndDateControlObservable(form: FormGroup<TaskForm>): void {
    this.showEndDateControl = form.controls.state.valueChanges.pipe(
      map((state: TaskState) => {
        return state instanceof CompletedTaskState || state instanceof RejectedTaskState;
      }),
    );
  }

  private subscribeToSelectedTaskChanges(form: FormGroup<TaskForm>): void {
    this.subscription.add(
      form.controls.task.valueChanges.subscribe((task) => {
        form.controls.title.setValue(task?.getTitle() || '');
        form.controls.description.setValue(task?.getDescription() || '');
        form.controls.state.setValue(task?.getState() || new NotStartedTaskState());

        if (task instanceof StartedTask || task instanceof EndedTask) {
          form.controls.startDate.setValue(task.getStartDate());
        }

        if (task instanceof EndedTask) {
          form.controls.endDate.setValue(task.getEndDate());
        }
      }),
    );
  }
}
