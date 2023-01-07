import { Component, Input } from '@angular/core';

@Component({
  selector: 'yata-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
})
export class NavigationItemComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
}
