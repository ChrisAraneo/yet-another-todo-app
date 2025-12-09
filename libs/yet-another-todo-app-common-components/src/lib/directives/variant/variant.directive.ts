import { Directive, effect, input, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: 'yata-button[yataVariant], yata-spinner[yataVariant]',
  standalone: true,
})
export class VariantDirective {
  yataVariant = input.required<'primary' | 'danger' | 'ghost'>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    effect(() => {
      const variant = this.yataVariant();
      const firstChild = this.elementRef.nativeElement.children[0];
      
      ['primary', 'danger', 'ghost'].forEach(v => {
        this.renderer.removeClass(firstChild, `variant-${v}`);
      });
      
      this.renderer.addClass(firstChild, `variant-${variant}`);
    });
  }
}
