import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyInfoBoxComponent } from './empty-info-box.component';

describe('EmptyInfoBoxComponent', () => {
  let component: EmptyInfoBoxComponent;
  let fixture: ComponentFixture<EmptyInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyInfoBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
