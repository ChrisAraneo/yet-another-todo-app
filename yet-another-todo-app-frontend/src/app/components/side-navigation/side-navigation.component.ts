import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';

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

  constructor(private dialogService: DialogService) {}

  items = [
    {
      icon: 'add',
      label: 'Add task',
      click: () => {
        this.dialogService.openAddTaskModal();
      },
    },
  ];
}
