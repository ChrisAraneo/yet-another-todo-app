import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportTasksModalComponent } from './import-tasks-modal.component';

describe('ImportTasksModalComponent', () => {
  let component: ImportTasksModalComponent;
  let fixture: ComponentFixture<ImportTasksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportTasksModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportTasksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
