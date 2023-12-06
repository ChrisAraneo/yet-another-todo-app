import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskModalLauncherComponent } from './add-task-modal-launcher.component';

describe('AddTaskModalLauncherComponent', () => {
  let component: AddTaskModalLauncherComponent;
  let fixture: ComponentFixture<AddTaskModalLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskModalLauncherComponent],
    });
    fixture = TestBed.createComponent(AddTaskModalLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
