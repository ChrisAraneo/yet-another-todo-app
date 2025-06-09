import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { NOOP } from '../../../../shared/utils/noop.const';

@Component({
  selector: 'yata-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.scss',
  standalone: true,
  imports: [MatIcon, NgIf],
})
export class NavigationItemComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() active = false;
  @Input() click: (event: any) => any = NOOP;
}
