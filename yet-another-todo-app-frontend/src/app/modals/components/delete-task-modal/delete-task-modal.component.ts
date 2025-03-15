import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, first, map } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { Task } from '../../../../../../yet-another-todo-app-shared';
import { fadeInOut } from '../../animations/fade-in-out.animation';
import { TaskForm, TaskOption } from './delete-task-modal.types';

@Component({
    selector: 'yata-delete-task-modal',
    templateUrl: './delete-task-modal.component.html',
    styleUrls: ['./delete-task-modal.component.scss'],
    animations: [fadeInOut],
    standalone: false
})
export class DeleteTaskModalComponent implements OnDestroy {
  static readonly PANEL_CLASS = 'delete-task-modal';

  tasks!: Observable<TaskOption[]>;
  form?: FormGroup<TaskForm>;

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
    if (!this.form || this.form.invalid) {
      return;
    }

    const task = this.form.controls.task.value;

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

        if (!initialTask) {
          throw new Error("Can't initialize delete task modal form, initial task is undefined");
        }

        this.form = this.formBuilder.group<TaskForm>({
          task: new FormControl(initialTask, { validators: [Validators.required] }),
        });
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
}
