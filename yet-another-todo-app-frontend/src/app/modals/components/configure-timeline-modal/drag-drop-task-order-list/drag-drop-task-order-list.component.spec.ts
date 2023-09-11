import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { DragDropTaskOrderListComponent } from './drag-drop-task-order-list.component';

describe('DragDropTaskOrderListComponent', () => {
  let component: DragDropTaskOrderListComponent;
  let fixture: ComponentFixture<DragDropTaskOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragDropTaskOrderListComponent, MockPipe(TranslatePipe)],
    }).compileComponents();

    fixture = TestBed.createComponent(DragDropTaskOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
