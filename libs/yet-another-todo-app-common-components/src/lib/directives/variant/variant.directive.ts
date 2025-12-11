import { Directive, effect, input, Renderer2, ElementRef } from '@angular/core';
import { Variant, VARIANTS } from '../../types/variant.type';

@Directive({
  selector: 'yata-button[variant], yata-spinner[variant]',
  standalone: true,
})
export class VariantDirective {
  variant = input<Variant>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {
    effect(() => {
      const variant = this.variant();

      if (!variant) {
        return;
      }

      const host = this.elementRef.nativeElement;
      const children = Array.from(host.children) as HTMLElement[];

      if (!children?.[0]) {
        return;
      }

      children.forEach((child) => {
        VARIANTS.forEach((item) => {
          if (item !== variant) {
            this.renderer.removeClass(child, `variant-${item}`);
          }

          this.renderer.addClass(child, `variant-${variant}`);
        });
      });
    });
  }
}
