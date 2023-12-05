import { Component, Input } from '@angular/core';

const NOOP: () => any = () => {
  return null;
};

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
