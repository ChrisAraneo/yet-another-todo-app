import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FADE_IN_ANIMATION } from '../../animations/fade-in.animation';

@Component({
  selector: 'yata-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  animations: [FADE_IN_ANIMATION],
})
export class SpinnerComponent {
  size = input<'small' | 'medium' | 'large'>('medium');
}
