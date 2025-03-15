import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { matchOtherValidator } from 'src/app/forms/validators/match-other.validator';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ZipTasksService } from 'src/app/shared/services/zip-tasks/zip-tasks.service';
import { Task } from '../../../../../../yet-another-todo-app-shared';
import { fadeInOut } from '../../animations/fade-in-out.animation';
import { ExportTasksForm } from './export-tasks-modal.types';

@Component({
    selector: 'yata-export-tasks-modal',
    templateUrl: './export-tasks-modal.component.html',
    styleUrls: ['./export-tasks-modal.component.scss'],
    animations: [fadeInOut],
    standalone: false
})
export class ExportTasksModalComponent {
  static readonly PANEL_CLASS = 'export-tasks-modal';

  readonly MIN_LENGTH = 8;

  form!: FormGroup<ExportTasksForm>;
  tasks!: Observable<Task[]>;

  constructor(
    public dialogRef: MatDialogRef<ExportTasksModalComponent>,
    private tasksService: TasksService,
    private zipTasksService: ZipTasksService,
    private formBuilder: FormBuilder,
  ) {
    this.initializeTasksObservable();
    this.initializeForm();
  }

  submit = (tasks: Task[]) => {
    return async (event: any): Promise<void> => {
      event.preventDefault();
      this.form.updateValueAndValidity();

      if (this.form.valid && this.form.value.password) {
        await this.zipTasksService.zip(tasks, this.form.value.password);

        this.dialogRef.close();
      }
    };
  };

  cancel = (): void => {
    this.dialogRef.close();
  };

  private initializeTasksObservable(): void {
    this.tasks = this.tasksService.getTasks();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group<ExportTasksForm>({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(this.MIN_LENGTH)],
        nonNullable: true,
      }),
      repeatPassword: new FormControl('', {
        validators: [Validators.required, matchOtherValidator('password')],
        nonNullable: true,
      }),
    });
  }
}
