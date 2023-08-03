import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropTaskOrderListComponent } from './drag-drop-task-order-list.component';

describe('DragDropTaskOrderListComponent', () => {
  let component: DragDropTaskOrderListComponent;
  let fixture: ComponentFixture<DragDropTaskOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragDropTaskOrderListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DragDropTaskOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
