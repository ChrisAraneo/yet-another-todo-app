import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YetAnotherTodoAppThemeComponent } from './yet-another-todo-app-theme.component';

describe('YetAnotherTodoAppThemeComponent', () => {
  let component: YetAnotherTodoAppThemeComponent;
  let fixture: ComponentFixture<YetAnotherTodoAppThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YetAnotherTodoAppThemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YetAnotherTodoAppThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
