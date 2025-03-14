import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageSizeSelectComponent } from './page-size-select.component';

describe('PageSizeSelectComponent', () => {
  let component: PageSizeSelectComponent;
  let fixture: ComponentFixture<PageSizeSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageSizeSelectComponent],
    });
    fixture = TestBed.createComponent(PageSizeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
