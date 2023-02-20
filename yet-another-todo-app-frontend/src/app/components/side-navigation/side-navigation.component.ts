import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppMode } from 'src/app/app.types';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { BORDER, UNIT } from 'src/app/shared/theme';
import { NavigationItem } from './side-navigation.types';

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
      transition('open => closed', [animate('0.175s')]),
      transition('closed => open', [animate('0.175s')]),
    ]),
  ],
})
export class SideNavigationComponent implements OnChanges {
  @Input() isOpened: boolean = true;
  @Input() mode: AppMode = AppMode.Timeline;

  @Output() modeChange: EventEmitter<AppMode> = new EventEmitter<AppMode>();

  items: NavigationItem[] = [];

  constructor(private dialogService: DialogService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentMode = changes['mode'] && changes['mode'].currentValue;
    const previousMode = changes['mode'] && changes['mode'].previousValue;

    if (currentMode !== previousMode) {
      this.updateNavigationItems(currentMode);
    }
  }

  private updateNavigationItems(mode: AppMode): void {
    const showTable = {
      icon: 'list',
      label: 'Table view',
      click: () => {
        this.modeChange.emit(AppMode.Table);
      },
    };

    const showTimeline = {
      icon: 'event_note',
      label: 'Timeline view',
      click: () => {
        this.modeChange.emit(AppMode.Timeline);
      },
    };

    const addTask = {
      icon: 'add',
      label: 'Add task',
      click: () => {
        this.dialogService.openAddTaskModal();
      },
    };

    const editTask = {
      icon: 'edit',
      label: 'Edit task',
      click: () => {
        this.dialogService.openEditTaskModal();
      },
    };

    const deleteTask = {
      icon: 'delete',
      label: 'Delete task',
      click: () => {
        this.dialogService.openDeleteTaskModal();
      },
    };

    if (mode === AppMode.Timeline) {
      this.items = [showTable, addTask, editTask, deleteTask];
    } else if (mode === AppMode.Table) {
      this.items = [showTimeline, addTask, editTask, deleteTask];
    } else {
      throw Error(`Cannot set side navigation items, the app mode is invalid: ${mode}`);
    }
  }
}
