import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first, map, Observable, Subscription } from 'rxjs';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { Task } from '../../models/task.model';
import { TaskForm, TaskOption } from './delete-task-modal.types';

@Component({
  selector: 'yata-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.scss'],
})
export class DeleteTaskModalComponent implements OnDestroy {
  static readonly PANEL_CLASS = 'delete-task-modal';

  readonly title = 'Delete task';

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

    this.subscription.add(
      this.tasks.pipe(first()).subscribe((tasks) => {
        const initialTask = this.getInitialTask(tasks, this.data);

        if (initialTask) {
          this.initializeForm(initialTask);
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

    const task = this.taskForm.controls.task.value;

    if (task) {
      this.tasksService.hideTask(task);
      this.dialogRef.close();
    }
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

  private initializeForm(initialTask: Task): void {
    if (!initialTask) {
      throw new Error("Can't initialize Edit task modal form, initial task is undefined");
    }

    this.taskForm = this.formBuilder.group<TaskForm>({
      task: new FormControl(initialTask),
    });
  }
}
