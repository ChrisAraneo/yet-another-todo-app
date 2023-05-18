import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnHighlightComponent } from './column-highlight.component';

describe('ColumnHighlightComponent', () => {
  let component: ColumnHighlightComponent;
  let fixture: ComponentFixture<ColumnHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnHighlightComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
