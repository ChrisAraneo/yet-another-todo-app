import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AppMode } from 'src/app/app.types';
import { DialogService } from 'src/app/modals/services/dialog/dialog.service';
import { BORDER, UNIT } from 'src/app/shared/styles/theme';
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
      label: 'SideNavigation.tableView',
      click: (): void => {
        this.modeChange.emit(AppMode.Table);
      },
    };

    const showTimeline = {
      icon: 'event_note',
      label: 'SideNavigation.timelineView',
      click: (): void => {
        this.modeChange.emit(AppMode.Timeline);
      },
    };

    const addTask = {
      icon: 'add',
      label: 'SideNavigation.addTask',
      click: (): void => {
        this.dialogService.openAddTaskModal();
      },
    };

    const editTask = {
      icon: 'edit',
      label: 'SideNavigation.editTask',
      click: (): void => {
        this.dialogService.openEditTaskModal();
      },
    };

    const deleteTask = {
      icon: 'delete',
      label: 'SideNavigation.deleteTask',
      click: (): void => {
        this.dialogService.openDeleteTaskModal();
      },
    };

    const exportTasks = {
      icon: 'folder_zip',
      label: 'SideNavigation.exportTasks',
      click: (): void => {
        this.dialogService.openExportTasksModal();
      },
    };

    const importTasks = {
      icon: 'drive_folder_upload',
      label: 'SideNavigation.importTasks',
      click: (): void => {
        this.dialogService.openImportTasksModal();
      },
    };

    if (mode === AppMode.Timeline) {
      this.items = [showTable, addTask, editTask, deleteTask, exportTasks, importTasks];
    } else if (mode === AppMode.Table) {
      this.items = [showTimeline, addTask, editTask, deleteTask, exportTasks, importTasks];
    } else {
      throw Error(`Cannot set side navigation items, the app mode is invalid: ${mode}`);
    }
  }
}
