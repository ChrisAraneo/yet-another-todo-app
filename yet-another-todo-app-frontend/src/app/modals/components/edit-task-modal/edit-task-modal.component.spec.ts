import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { TaskStateTranslatorService } from 'src/app/services/task-state-translator/task-state-translator.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { EditTaskModalComponent } from './edit-task-modal.component';

describe('EditTaskModalComponent', () => {
  let component: EditTaskModalComponent;
  let fixture: ComponentFixture<EditTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTaskModalComponent, MockPipe(TranslatePipe)],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        FormBuilder,
        MockProvider(TasksService, {
          updateTask: () => undefined,
          getTasks: () => of([]),
        }),
        MockProvider(TaskStateTranslatorService, {}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
