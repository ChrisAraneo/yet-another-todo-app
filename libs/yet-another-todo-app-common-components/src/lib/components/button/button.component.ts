import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ripple } from './button.interfaces';
import { SPINNER_DEBOUNCE_TIME_MS } from './button.consts';
import { noop } from 'lodash';
import { SpinnerComponent } from '../spinner/spinner.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import {
  RIPPLE_ANIMATION,
  RIPPLE_ANIMATION_DURATION_MS,
  RIPPLE_ANIMATION_OFFSET_DURATION_MS,
} from '../../animations/ripple.animation';
import { MatIconModule } from '@angular/material/icon';
import { VariantDirective } from '../../directives/variant/variant.directive';
import { VariantClassPipe } from '../../pipes/variant-class/variant-class.pipe';

@Component({
  selector: 'yata-button',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    MatIconModule,
    VariantDirective,
    VariantClassPipe,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  animations: [RIPPLE_ANIMATION],
})
export class ButtonComponent {
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  icon = input<string>('');
  click = input<(event: unknown) => Promise<void>>(() => new Promise(noop));

  protected ripples = signal<Ripple[]>([]);
  protected isLoading = signal<boolean>(false);
  protected showSpinner = toSignal(
    toObservable(this.isLoading).pipe(debounceTime(SPINNER_DEBOUNCE_TIME_MS)),
  );

  onClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isLoading() || this.disabled()) {
      return;
    }

    this.createRipple(event);

    this.isLoading.set(true);

    this.click()(event)
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

    this.ripples.update((ripples) => [...ripples, ripple]);

    setTimeout(() => {
      this.ripples.update((ripples) => ripples.filter((r) => r !== ripple));
    }, RIPPLE_ANIMATION_DURATION_MS - RIPPLE_ANIMATION_OFFSET_DURATION_MS);
  }
}
