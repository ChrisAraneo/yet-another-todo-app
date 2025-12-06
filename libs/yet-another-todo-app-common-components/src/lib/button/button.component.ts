import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import { Ripple } from './button.interfaces';
import { RIPPLE_ANIMATION_DURATION_MS } from './button.consts';

@Component({
  selector: 'yata-button',
  standalone: true,
  imports: [CommonModule],``
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  animations: [
    trigger('rippleAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 1 }),
        animate(`${RIPPLE_ANIMATION_DURATION_MS}ms ease-out`, style({ transform: 'scale(4)', opacity: 0 }))
      ])
    ])
  ]
})
export class ButtonComponent implements OnDestroy {
  ngOnDestroy(): void {
      throw new Error('Method not implemented.');
  }
  @Input() variant: 'primary' | 'danger' | 'ghost' = 'primary';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  ripples: Ripple[] = [];

  createRipple(event: MouseEvent): void {
    if (this.disabled) {
        return;
    };

    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple: Ripple = { x, y, size };

    this.ripples.push(ripple);

    setTimeout(() => {
      this.ripples = this.ripples.filter(r => r !== ripple);
    }, RIPPLE_ANIMATION_DURATION_MS);
  }
}
