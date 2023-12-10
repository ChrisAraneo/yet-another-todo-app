import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTaskModalLauncherComponent } from './edit-task-modal-launcher.component';

describe('EditTaskModalLauncherComponent', () => {
  let component: EditTaskModalLauncherComponent;
  let fixture: ComponentFixture<EditTaskModalLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskModalLauncherComponent],
    });
    fixture = TestBed.createComponent(EditTaskModalLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
