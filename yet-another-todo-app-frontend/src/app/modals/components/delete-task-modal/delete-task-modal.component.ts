import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, first, map } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { Task } from '../../../shared/models/task.model';
import { TaskForm, TaskOption } from './delete-task-modal.types';

@Component({
  selector: 'yata-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.scss'],
})
export class DeleteTaskModalComponent implements OnDestroy {
  static readonly PANEL_CLASS = 'delete-task-modal';

  tasks!: Observable<TaskOption[]>;
  taskForm?: FormGroup<TaskForm>;

  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteTaskModalComponent>,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
  ) {
    this.initializeTasksObservable();
    this.initializeFormWithInitialTask();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  submit: () => Promise<void> = async () => {
    if (!this.taskForm || this.taskForm.invalid) {
      return;
    }

    const task = this.taskForm.controls.task.value;

    return new Promise((resolve, reject) => {
      if (task) {
        this.tasksService.hideTask(task.getId()).subscribe(() => {
          resolve();

          this.dialogRef.close();
        });
      } else {
        reject();
      }
    });
  };

  cancel: () => void = () => {
    this.dialogRef.close();
  };

  private initializeTasksObservable(): void {
    this.tasks = this.tasksService.getTasks().pipe(
      map((tasks) =>
        tasks.map((task) => ({
          label: `${task.getTitle()} (${task.getShortId()})`,
          value: task,
        })),
      ),
    );
  }

  private initializeFormWithInitialTask(): void {
    this.subscription.add(
      this.tasks.pipe(first()).subscribe((tasks) => {
        const initialTask = this.getInitialTask(tasks, this.data);

        if (initialTask) {
          this.initializeForm(initialTask);
        }
      }),
    );
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

  private initializeForm(initialTask: Task): void {
    if (!initialTask) {
      throw new Error("Can't initialize Edit task modal form, initial task is undefined");
    }

    this.taskForm = this.formBuilder.group<TaskForm>({
      task: new FormControl(initialTask, { validators: [Validators.required] }),
    });
  }
}
