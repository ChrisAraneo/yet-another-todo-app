import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import {
  ADD_TASK_PATH,
  CONFIGURE_PATH,
  DELETE_TASK_PATH,
  EDIT_TASK_PATH,
  EXPORT_TASKS_PATH,
  IMPORT_TASKS_PATH,
  TABLE_PATH,
  TIMELINE_PATH,
} from 'src/app/app-routing.consts';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { AppMode } from 'src/app/shared/store/types/view-configuration.type';
import { BORDER, UNIT } from 'src/app/shared/styles/theme';
import { Task } from '../../../shared/models/task.model';
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

  items: NavigationItem[] = [];

  private subscription?: Subscription;

  constructor(
    private router: Router,
    private viewConfigurationService: ViewConfigurationService,
    private tasksService: TasksService,
  ) {}

  ngOnInit(): void {
    this.subscribeToChanges();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private updateNavigationItems(mode?: AppMode, tasks?: Task[]): void {
    if (!mode || mode === AppMode.Undefined) {
      this.items = [];

      return;
    }

    const firstChild = mode === AppMode.Timeline ? TIMELINE_PATH : TABLE_PATH;
    const firstTask = (tasks || []).length > 0 ? (tasks as Task[])[0] : undefined;

    const showTable = {
      icon: 'list',
      label: 'SideNavigation.tableView',
      active: mode === AppMode.Table,
      click: (): void => {
        this.router.navigate([TABLE_PATH]);
      },
    };

    const showTimeline = {
      icon: 'event_note',
      label: 'SideNavigation.timelineView',
      active: mode === AppMode.Timeline,
      click: (): void => {
        this.router.navigate([TIMELINE_PATH]);
      },
    };

    const configureTable = {
      icon: 'settings',
      label: 'SideNavigation.configureTable',
      active: false,
      click: async (): Promise<void> => {
        await this.router.navigate([firstChild, CONFIGURE_PATH]);
        this.activateNavigationItem(2);
      },
    };

    const configureTimeline = {
      icon: 'settings',
      label: 'SideNavigation.configureTimeline',
      active: false,
      click: async (): Promise<void> => {
        await this.router.navigate([firstChild, CONFIGURE_PATH]);
        this.activateNavigationItem(2);
      },
    };

    const addTask = {
      icon: 'add',
      label: 'SideNavigation.addTask',
      active: false,
      click: async (): Promise<void> => {
        await this.router.navigate([firstChild, ADD_TASK_PATH]);
        this.activateNavigationItem(3);
      },
    };

    const editTask = {
      icon: 'edit',
      label: 'SideNavigation.editTask',
      active: false,
      click: async (): Promise<void> => {
        await this.router.navigate([firstChild, EDIT_TASK_PATH, firstTask?.getId()]);
        this.activateNavigationItem(4);
      },
    };

    const deleteTask = {
      icon: 'delete',
      label: 'SideNavigation.deleteTask',
      active: false,
      click: async (): Promise<void> => {
        await this.router.navigate([firstChild, DELETE_TASK_PATH, firstTask?.getId()]);
        this.activateNavigationItem(5);
      },
    };

    const exportTasks = {
      icon: 'folder_zip',
      label: 'SideNavigation.exportTasks',
      active: false,
      click: async (): Promise<void> => {
        await this.router.navigate([firstChild, EXPORT_TASKS_PATH]);
        this.activateNavigationItem(6);
      },
    };

    const importTasks = {
      icon: 'drive_folder_upload',
      label: 'SideNavigation.importTasks',
      active: false,
      click: async (): Promise<void> => {
        await this.router.navigate([firstChild, IMPORT_TASKS_PATH]);
        this.activateNavigationItem(7);
      },
    };

    this.items = [
      showTimeline,
      showTable,
      mode === AppMode.Timeline ? configureTimeline : configureTable,
      addTask,
      editTask,
      deleteTask,
      exportTasks,
      importTasks,
    ];
  }

  private subscribeToChanges(): void {
    this.subscription = this.viewConfigurationService
      .getAppMode()
      .pipe(
        mergeMap((mode) => {
          return this.tasksService.getTasks().pipe(
            map((tasks) => {
              return {
                mode,
                tasks,
              };
            }),
          );
        }),
      )
      .subscribe(({ mode, tasks }) => {
        this.updateNavigationItems(mode, tasks);
      });
  }

  private activateNavigationItem(index: number): void {
    this.items.forEach((item, i) => {
      item.active = i === index;
    });
  }
}
