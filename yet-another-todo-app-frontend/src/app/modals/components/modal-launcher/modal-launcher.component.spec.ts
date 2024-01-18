import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalLauncherComponent } from './modal-launcher.component';

describe('ModalLauncherComponent', () => {
  let component: ModalLauncherComponent;
  let fixture: ComponentFixture<ModalLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLauncherComponent],
    });
    fixture = TestBed.createComponent(ModalLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
