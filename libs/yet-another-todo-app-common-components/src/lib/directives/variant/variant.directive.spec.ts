import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { VariantDirective } from './variant.directive';
import { ButtonComponent } from '../../components/button/button.component';
import { Variant } from '../../types/variant.type';

@Component({
  template: `<yata-button [variant]="variant">Test</yata-button>`,
  standalone: true,
  imports: [ButtonComponent, VariantDirective],
})
class TestComponent {
  variant: Variant = 'primary';
}

describe('VariantDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should add variant-primary class to first child of root element', () => {
    component.variant = 'primary';
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('yata-button');
    const firstChild = element.firstElementChild as HTMLElement | null;

    expect(firstChild?.classList.contains('variant-primary')).toBe(true);
  });

  it('should add variant-danger class to first child of root element', () => {
    component.variant = 'danger';
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('yata-button');
    const firstChild = element.firstElementChild as HTMLElement | null;

    expect(firstChild?.classList.contains('variant-danger')).toBe(true);
  });

  it('should add variant-ghost class to first child of root element', () => {
    component.variant = 'ghost';
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('yata-button');
    const firstChild = element.firstElementChild as HTMLElement | null;

    expect(firstChild?.classList.contains('variant-ghost')).toBe(true);
  });
});
