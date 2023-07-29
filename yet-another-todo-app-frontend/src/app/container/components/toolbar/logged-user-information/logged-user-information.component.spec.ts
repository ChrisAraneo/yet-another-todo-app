import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedUserInformationComponent } from './logged-user-information.component';

describe('LoggedUserInformationComponent', () => {
  let component: LoggedUserInformationComponent;
  let fixture: ComponentFixture<LoggedUserInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoggedUserInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoggedUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
