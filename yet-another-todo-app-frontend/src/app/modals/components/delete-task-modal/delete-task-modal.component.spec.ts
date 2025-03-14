import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { DeleteTaskModalComponent } from './delete-task-modal.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DeleteTaskModalComponent', () => {
  let component: DeleteTaskModalComponent;
  let fixture: ComponentFixture<DeleteTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [DeleteTaskModalComponent, MockPipe(TranslatePipe)],
    imports: [MatDialogModule,
        NoopAnimationsModule,
        StoreModule.forRoot({})],
    providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        FormBuilder,
        MockProvider(TasksService, {
            hideTask: () => of(undefined),
            getTasks: () => of([]),
        }),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
