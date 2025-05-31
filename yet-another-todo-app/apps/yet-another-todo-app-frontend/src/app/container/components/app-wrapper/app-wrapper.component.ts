import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrl: './app-wrapper.component.scss',
  standalone: true,
})
export class AppWrapperComponent {
  @Input() isAppVisible = true;
}
