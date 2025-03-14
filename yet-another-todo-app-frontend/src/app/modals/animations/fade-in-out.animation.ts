import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(
      '300ms',
      keyframes([style({ opacity: 0 }), style({ opacity: 0 }), style({ opacity: 1 })]),
    ),
  ]),
  transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
]);
