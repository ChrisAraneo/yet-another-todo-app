import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportTasksModalLauncherComponent } from './import-tasks-modal-launcher.component';

describe('ImportTasksModalLauncherComponent', () => {
  let component: ImportTasksModalLauncherComponent;
  let fixture: ComponentFixture<ImportTasksModalLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportTasksModalLauncherComponent],
    });
    fixture = TestBed.createComponent(ImportTasksModalLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
