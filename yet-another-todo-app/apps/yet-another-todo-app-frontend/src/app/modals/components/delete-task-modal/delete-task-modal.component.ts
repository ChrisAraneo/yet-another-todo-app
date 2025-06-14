import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { first, map, Observable, Subscription } from 'rxjs';

import { SelectComponent } from '../../../forms/components/select/select.component';
import { TasksService } from '../../../shared/services/tasks/tasks.service';
import { fadeInOut } from '../../animations/fade-in-out.animation';
import { ModalActionButtonsComponent } from '../modal-action-buttons/modal-action-buttons.component';
import { ModalTitleComponent } from '../modal-title/modal-title.component';
import { PageComponent } from '../page/page.component';
import { TaskForm, TaskOption } from './delete-task-modal.types';
import { Task } from '../../../../../../../libs/yet-another-todo-app-models/src/models/task.model';

@Component({
  selector: 'yata-delete-task-modal',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ModalActionButtonsComponent,
    ModalTitleComponent,
    NgIf,
    PageComponent,
    ReactiveFormsModule,
    SelectComponent,
    TranslatePipe,
  ],
  templateUrl: './delete-task-modal.component.html',
  styleUrl: './delete-task-modal.component.scss',
  animations: [fadeInOut],
})
export class DeleteTaskModalComponent implements OnDestroy {
  static readonly PANEL_CLASS = 'delete-task-modal';

  tasks!: Observable<TaskOption[]>;
  form?: FormGroup<TaskForm>;

  private readonly subscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogReference: MatDialogRef<DeleteTaskModalComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly tasksService: TasksService,
  ) {
    this.initializeTasksObservable();
    this.initializeFormWithInitialTask();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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

          this.dialogReference.close();
        });
      } else {
        reject();
      }
    });
  };

  cancel: () => void = () => {
    this.dialogReference.close();
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
          throw new Error(
            "Can't initialize delete task modal form, initial task is undefined",
          );
        }

        this.form = this.formBuilder.group<TaskForm>({
          task: new FormControl(initialTask, {
            validators: [Validators.required],
          }),
        });
      }),
    );
  }

  private getInitialTask(tasks: TaskOption[], data: any): Task | undefined {
    if (!tasks || tasks.length === 0) {
      return;
    }

    const id = data?.initialTaskId;

    return id
      ? tasks.find((item) => item.value.getId() === id)?.value || tasks[0].value
      : tasks[0].value;
  }
}
