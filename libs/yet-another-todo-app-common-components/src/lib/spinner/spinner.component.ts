import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'yata-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color = 'primary';
}
