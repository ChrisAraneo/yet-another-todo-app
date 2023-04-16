import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';
import { DatesFilterComponent } from './dates-filter.component';

describe('DatesFilterComponent', () => {
  let component: DatesFilterComponent;
  let fixture: ComponentFixture<DatesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatesFilterComponent, MockPipe(TranslatePipe)],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(DatesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
