import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { TaskStateIconComponent } from './task-state-icon.component';

describe('TaskStateIconComponent', () => {
  let component: TaskStateIconComponent;
  let fixture: ComponentFixture<TaskStateIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskStateIconComponent, MockPipe(TranslatePipe)],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskStateIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
