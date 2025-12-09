import { trigger, transition, style, animate } from '@angular/animations';

export const FADE_IN_ANIMATION = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 })),
  ]),
]);
