import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportTasksModalLauncherComponent } from './export-tasks-modal-launcher.component';

describe('ExportTasksModalLauncherComponent', () => {
  let component: ExportTasksModalLauncherComponent;
  let fixture: ComponentFixture<ExportTasksModalLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportTasksModalLauncherComponent],
    });
    fixture = TestBed.createComponent(ExportTasksModalLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
