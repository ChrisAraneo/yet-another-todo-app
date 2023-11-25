import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class SideNavigationComponent implements OnInit, OnDestroy {
  @Input() isOpened: boolean = true;

  mode?: AppMode;
  items: NavigationItem[] = [];

  private subscription?: Subscription;

  constructor(private router: Router, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.subscribeToUrlChanges();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private subscribeToUrlChanges(): void {
    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlPart = event.url.split('/').filter((part) => !!part)[0];

        if (urlPart === 'timeline' || urlPart === 'table') {
          const currentMode = urlPart === 'timeline' ? AppMode.Timeline : AppMode.Table;
          const previousMode = this.mode;

          if (currentMode !== previousMode) {
            this.updateNavigationItems(currentMode);
          }

          this.mode = currentMode;
        } else {
          throw Error('Incorrect app mode');
        }
      }
    });

    if (!this.subscription) {
      this.subscription = subscription;
    } else {
      this.subscription.unsubscribe();
      this.subscription.add(subscription);
    }
  }

  private updateNavigationItems(mode?: AppMode): void {
    const showTable = {
      icon: 'list',
      label: 'SideNavigation.tableView',
      click: (): void => {
        this.router.navigate(['table']);
      },
    };

    const showTimeline = {
      icon: 'event_note',
      label: 'SideNavigation.timelineView',
      click: (): void => {
        this.router.navigate(['timeline']);
      },
    };

    const configureTable = {
      icon: 'settings',
      label: 'SideNavigation.configureTable',
      click: (): void => {
        this.dialogService.openConfigureTableModal();
      },
    };

    const configureTimeline = {
      icon: 'settings',
      label: 'SideNavigation.configureTimeline',
      click: (): void => {
        this.dialogService.openConfigureTimelineModal();
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
      this.items = [
        showTable,
        configureTimeline,
        addTask,
        editTask,
        deleteTask,
        exportTasks,
        importTasks,
      ];
    } else if (mode === AppMode.Table) {
      this.items = [
        showTimeline,
        configureTable,
        addTask,
        editTask,
        deleteTask,
        exportTasks,
        importTasks,
      ];
    } else {
      throw Error(`Cannot set side navigation items, the app mode is invalid: ${mode}`);
    }
  }
}
