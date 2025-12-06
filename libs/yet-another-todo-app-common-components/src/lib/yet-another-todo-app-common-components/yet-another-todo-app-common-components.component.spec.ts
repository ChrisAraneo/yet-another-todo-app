import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YetAnotherTodoAppCommonComponentsComponent } from './yet-another-todo-app-common-components.component';

describe('YetAnotherTodoAppCommonComponentsComponent', () => {
  let component: YetAnotherTodoAppCommonComponentsComponent;
  let fixture: ComponentFixture<YetAnotherTodoAppCommonComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YetAnotherTodoAppCommonComponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      YetAnotherTodoAppCommonComponentsComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
