import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigureTimelineModalComponent } from './configure-timeline-modal.component';

describe('ConfigureTimelineModalComponent', () => {
  let component: ConfigureTimelineModalComponent;
  let fixture: ComponentFixture<ConfigureTimelineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigureTimelineModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigureTimelineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
