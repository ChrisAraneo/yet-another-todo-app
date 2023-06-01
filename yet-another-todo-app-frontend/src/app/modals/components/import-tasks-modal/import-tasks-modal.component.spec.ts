import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { ImportTasksModalComponent } from './import-tasks-modal.component';

describe('ImportTasksModalComponent', () => {
  let component: ImportTasksModalComponent;
  let fixture: ComponentFixture<ImportTasksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportTasksModalComponent, MockPipe(TranslatePipe)],
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportTasksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
