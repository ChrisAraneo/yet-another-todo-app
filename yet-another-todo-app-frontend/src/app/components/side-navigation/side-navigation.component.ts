import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { BORDER, UNIT } from 'src/app/shared/theme';

@Component({
  selector: 'yata-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: `${UNIT * 4}px`,
          borderRight: BORDER,
        }),
      ),
      state(
        'closed',
        style({
          width: '0px',
          borderRight: '0px solid black',
        }),
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
