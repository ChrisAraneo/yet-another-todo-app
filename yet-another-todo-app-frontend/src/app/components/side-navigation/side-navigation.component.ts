import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yata-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '256px',
          borderRight: '1px solid black',
        })
      ),
      state(
        'closed',
        style({
          width: '0px',
          borderRight: '0px solid black',
        })
      ),
      transition('open => closed', [animate('0.25s')]),
      transition('closed => open', [animate('0.25s')]),
    ]),
  ],
})
export class SideNavigationComponent {
  @Input() isOpened: boolean = true;
}
