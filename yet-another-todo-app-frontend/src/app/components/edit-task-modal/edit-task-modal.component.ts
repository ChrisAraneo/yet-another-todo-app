import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { map, Observable, Subscription } from 'rxjs';
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

  taskForm!: FormGroup<TaskForm>;
  tasks!: Observable<TaskOption[]>;
  showStartDateControl!: Observable<boolean>;
  showEndDateControl!: Observable<boolean>;

  private subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<EditTaskModalComponent>,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
  ) {
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

    const id = this.taskForm.controls.task.value?.getId();
    const task: Task = TaskCreator.create({ ...this.taskForm.value, task: undefined, id });
    this.tasksService.updateTask(task);

    this.dialogRef.close();
  }

  private initializeForm(): void {
    this.taskForm = this.formBuilder.group<TaskForm>({
      task: new FormControl(null),
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

    this.tasks = this.tasksService
      .getTasks()
      .pipe(map((tasks) => tasks.map((task) => ({ label: task.getTitle(), value: task }))));

    this.taskForm.controls.task.valueChanges.subscribe((task) => {
      this.taskForm.controls.title.setValue(task?.getTitle() || '');
      this.taskForm.controls.description.setValue(task?.getDescription() || '');
      this.taskForm.controls.state.setValue(task?.getState() || new NotStartedTaskState());

      if (task instanceof StartedTask || task instanceof EndedTask) {
        this.taskForm.controls.startDate.setValue(task.getStartDate());
      }

      if (task instanceof EndedTask) {
        this.taskForm.controls.endDate.setValue(task.getEndDate());
      }
    });
  }
}
