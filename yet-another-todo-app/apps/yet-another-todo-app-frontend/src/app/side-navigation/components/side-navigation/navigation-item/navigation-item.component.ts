import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { NOOP } from '../../../../shared/utils/noop.const';

@Component({
  selector: 'yata-navigation-item',
  standalone: true,
  imports: [MatIcon, NgIf],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.scss',
})
export class NavigationItemComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() active = false;
  @Input() click: (event: any) => any = NOOP;
}
