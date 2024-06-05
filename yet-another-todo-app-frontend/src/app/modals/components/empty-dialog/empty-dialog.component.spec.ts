import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { EmptyDialogComponent } from './empty-dialog.component';

describe('EmptyDialogComponent', () => {
  let component: EmptyDialogComponent;
  let fixture: ComponentFixture<EmptyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyDialogComponent, MockPipe(TranslatePipe)],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    });
    fixture = TestBed.createComponent(EmptyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
