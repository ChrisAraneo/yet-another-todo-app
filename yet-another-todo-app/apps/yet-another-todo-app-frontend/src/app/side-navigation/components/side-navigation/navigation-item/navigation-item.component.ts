import { Component, Input } from '@angular/core';
import { NOOP } from '../../../../shared/utils/noop.const';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'yata-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  standalone: true,
  imports: [MatIcon, NgIf],
})
export class NavigationItemComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() active: boolean = false;
  @Input() click: (event: any) => any = NOOP;
}
