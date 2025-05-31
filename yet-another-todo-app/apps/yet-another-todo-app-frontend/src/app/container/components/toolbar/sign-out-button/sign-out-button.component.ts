import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'yata-sign-out-button',
  templateUrl: './sign-out-button.component.html',
  styleUrl: './sign-out-button.component.scss',
  standalone: true,
  imports: [MatIcon, TranslatePipe, MatTooltip],
})
export class SignOutButtonComponent {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  reloadPage(): void {
    const window = this.document.defaultView;

    // TODO This is non Angular way to reload whole page/app, find better solution
    window?.location.replace('/');
  }
}
