import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageComponent],
    });
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    component.src = 'assets/example.jpg';
    component.height = 10;
    component.width = 10;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
