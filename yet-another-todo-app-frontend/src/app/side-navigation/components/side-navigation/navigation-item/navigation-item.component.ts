import { Component, Input } from '@angular/core';
import { NOOP } from 'src/app/shared/utils/noop.const';

@Component({
  selector: 'yata-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() active: boolean = false;
  @Input() click: (event: any) => any = NOOP;
}
