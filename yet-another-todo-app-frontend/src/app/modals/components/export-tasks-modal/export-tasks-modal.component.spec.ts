import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportTasksModalComponent } from './export-tasks-modal.component';

describe('ExportTasksModalComponent', () => {
  let component: ExportTasksModalComponent;
  let fixture: ComponentFixture<ExportTasksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportTasksModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportTasksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
