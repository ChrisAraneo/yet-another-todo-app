import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { matchOtherValidator } from 'src/app/forms/validators/match-other.validator';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ZipTasksService } from 'src/app/shared/services/zip-tasks/zip-tasks.service';
import { Task } from '../../../shared/models/task.model';
import { ExportTasksForm } from './export-tasks.types';

@Component({
  selector: 'yata-export-tasks-modal',
  templateUrl: './export-tasks-modal.component.html',
  styleUrls: ['./export-tasks-modal.component.scss'],
})
export class ExportTasksModalComponent {
  static readonly PANEL_CLASS = 'export-tasks-modal';

  readonly MIN_LENGTH = 8;

  form!: FormGroup<ExportTasksForm>;
  tasks!: Observable<Task[]>;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ExportTasksModalComponent>,
    private tasksService: TasksService,
    private zipTasksService: ZipTasksService,
    private formBuilder: FormBuilder,
  ) {
    this.initializeTasksObservable();
    this.initializeForm();
  }

  submit(event: any, tasks: Task[]): void {
    event.preventDefault();
    this.form.updateValueAndValidity();

    if (this.form.valid && this.form.value.password) {
      this.isLoading = true;

      this.zipTasksService.zip(tasks, this.form.value.password).then(() => {
        this.isLoading = false;
        this.dialogRef.close();
      });
    }
  }

  // TODO Refactor
  getError(controlName: string, validatorErrorName: string): string | null {
    const errors = this.form.get(controlName)?.errors;

    if (!!errors) {
      return errors[validatorErrorName];
    } else {
      return null;
    }
  }

  private initializeTasksObservable(): void {
    this.tasks = this.tasksService.getTasks();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group<ExportTasksForm>({
      password: new FormControl('', { nonNullable: true }),
      repeatPassword: new FormControl('', { nonNullable: true }),
    });

    this.form.controls.password.addValidators([
      Validators.required,
      Validators.minLength(this.MIN_LENGTH),
    ]);
    this.form.controls.repeatPassword.addValidators([
      Validators.required,
      matchOtherValidator('password'),
    ]);
  }
}
