import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { VariantDirective } from './variant.directive';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  template: `<yata-button yataVariant="danger">Test</yata-button>`,
  standalone: true,
  imports: [ButtonComponent, VariantDirective]
})
class TestComponent {}

describe('VariantDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should add variant class', () => {
    const element = fixture.nativeElement.querySelector('yata-button');
    expect(element.classList.contains('variant-danger')).toBe(true);
  });
});
