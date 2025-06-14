import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '@chris.araneo/yet-another-todo-app-shared';
import { TranslatePipe } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { PasswordInputComponent } from '../../../forms/components/password-input/password-input.component';
import { matchOtherValidator } from '../../../forms/validators/match-other.validator';
import { ImageComponent } from '../../../shared/components/image/image.component';
import { TasksService } from '../../../shared/services/tasks/tasks.service';
import { ZipTasksService } from '../../../shared/services/zip-tasks/zip-tasks.service';
import { fadeInOut } from '../../animations/fade-in-out.animation';
import { ModalActionButtonsComponent } from '../modal-action-buttons/modal-action-buttons.component';
import { ModalTitleComponent } from '../modal-title/modal-title.component';
import { PageComponent } from '../page/page.component';
import { ExportTasksForm } from './export-tasks-modal.types';

@Component({
  selector: 'yata-export-tasks-modal',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ImageComponent,
    ModalActionButtonsComponent,
    ModalTitleComponent,
    NgIf,
    PageComponent,
    PasswordInputComponent,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './export-tasks-modal.component.html',
  styleUrl: './export-tasks-modal.component.scss',
  animations: [fadeInOut],
})
export class ExportTasksModalComponent {
  static readonly PANEL_CLASS = 'export-tasks-modal';

  readonly MIN_LENGTH = 8;

  form!: FormGroup<ExportTasksForm>;
  tasks!: Observable<Task[]>;

  constructor(
    public dialogReference: MatDialogRef<ExportTasksModalComponent>,
    private readonly tasksService: TasksService,
    private readonly zipTasksService: ZipTasksService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.initializeTasksObservable();
    this.initializeForm();
  }

  submit =
    (tasks: Task[]) =>
    async (event: any): Promise<void> => {
      event.preventDefault();
      this.form.updateValueAndValidity();

      if (this.form.valid && this.form.value.password) {
        await this.zipTasksService.zip(tasks, this.form.value.password);

        this.dialogReference.close();
      }
    };

  cancel = (): void => {
    this.dialogReference.close();
  };

  private initializeTasksObservable(): void {
    this.tasks = this.tasksService.getTasks();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group<ExportTasksForm>({
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(this.MIN_LENGTH),
        ],
        nonNullable: true,
      }),
      repeatPassword: new FormControl('', {
        validators: [Validators.required, matchOtherValidator('password')], // TODO Move validator to shared?
        nonNullable: true,
      }),
    });
  }
}
