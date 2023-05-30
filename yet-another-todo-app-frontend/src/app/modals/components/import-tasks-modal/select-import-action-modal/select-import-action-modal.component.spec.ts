import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectImportActionModalComponent } from './select-import-action-modal.component';

describe('SelectImportActionModalComponent', () => {
  let component: SelectImportActionModalComponent;
  let fixture: ComponentFixture<SelectImportActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectImportActionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectImportActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
