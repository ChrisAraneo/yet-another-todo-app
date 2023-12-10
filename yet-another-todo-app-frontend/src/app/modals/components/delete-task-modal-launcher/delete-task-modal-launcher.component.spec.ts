import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTaskModalLauncherComponent } from './delete-task-modal-launcher.component';

describe('DeleteTaskModalLauncherComponent', () => {
  let component: DeleteTaskModalLauncherComponent;
  let fixture: ComponentFixture<DeleteTaskModalLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTaskModalLauncherComponent],
    });
    fixture = TestBed.createComponent(DeleteTaskModalLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
