import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalActionButtonsComponent } from './modal-action-buttons.component';

describe('ModalActionButtonsComponent', () => {
  let component: ModalActionButtonsComponent;
  let fixture: ComponentFixture<ModalActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalActionButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
