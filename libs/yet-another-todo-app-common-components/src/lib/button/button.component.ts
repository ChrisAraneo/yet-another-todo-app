import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Ripple } from './button.interfaces';
import {
  RIPPLE_ANIMATION_DURATION_MS,
  RIPPLE_ANIMATION_OFFSET_DURATION_MS,
  SPINNER_DEBOUNCE_TIME_MS,
} from './button.consts';
import { noop } from 'lodash';
import { SpinnerComponent } from '../spinner/spinner.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'yata-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  animations: [
    trigger('rippleAnimation', [
      transition(':enter', [
        animate(
          `${RIPPLE_ANIMATION_DURATION_MS}ms ease-out`,
          keyframes([
            style({ transform: 'scale(0)', opacity: 0.2, offset: 0 }),
            style({
              transform: 'scale(4)',
              opacity: 0,
              offset:
                (RIPPLE_ANIMATION_DURATION_MS -
                  RIPPLE_ANIMATION_OFFSET_DURATION_MS) /
                RIPPLE_ANIMATION_DURATION_MS,
            }),
            style({ transform: 'scale(4)', opacity: 0, offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ],
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'danger' | 'ghost' = 'primary';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() click: (event: unknown) => Promise<void> = () => new Promise(noop);

  ripples: Ripple[] = [];
  isLoading = signal<boolean>(false);
  showSpinner = toSignal(toObservable(this.isLoading).pipe(debounceTime(SPINNER_DEBOUNCE_TIME_MS)));

  onClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isLoading() || this.disabled) {
      return;
    }

    this.createRipple(event);

    this.isLoading.set(true);

    this.click(event)
      .then(() => {
        this.isLoading.set(false);
      })
      .catch((error: unknown) => {
        this.isLoading.set(false);

        throw error;
      });
  }

  private createRipple(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple: Ripple = { x, y, size };

    this.ripples.push(ripple);

    setTimeout(() => {
      this.ripples = this.ripples.filter((r) => r !== ripple);
    }, RIPPLE_ANIMATION_DURATION_MS - RIPPLE_ANIMATION_OFFSET_DURATION_MS);
  }
}
