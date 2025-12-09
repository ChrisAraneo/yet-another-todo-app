import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';

export const RIPPLE_ANIMATION_DURATION_MS = 2000;
export const RIPPLE_ANIMATION_OFFSET_DURATION_MS = 100;

export const RIPPLE_ANIMATION = trigger('rippleAnimation', [
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
]);
