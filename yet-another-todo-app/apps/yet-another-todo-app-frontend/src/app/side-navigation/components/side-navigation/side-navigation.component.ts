import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { map, mergeMap, Subscription } from 'rxjs';

import { Task } from '../../../../../../yet-another-todo-app-shared';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';
import { TasksService } from '../../../shared/services/tasks/tasks.service';
import { ViewConfigurationService } from '../../../shared/services/view-configuration/view-configuration.service';
import { AppMode } from '../../../shared/store/types/view-configuration.type';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationItem } from './side-navigation.types';
import { BORDER, UNIT } from '@chris.araneo/yet-another-todo-app-shared/src/themes/theme.__generated';

@Component({
  selector: 'yata-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
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
  standalone: true,
  imports: [NavigationItemComponent, TranslatePipe],
})
export class SideNavigationComponent implements OnInit, OnDestroy {
  @Input() isOpened = true;

  items: NavigationItem[] = [];

  private subscription?: Subscription;

  constructor(
    private readonly viewConfigurationService: ViewConfigurationService,
    private readonly tasksService: TasksService,
    private readonly navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.subscribeToChanges();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private updateNavigationItems(mode?: AppMode, tasks?: Task[]): void {
    if (!mode || mode === AppMode.Undefined) {
      this.items = [];

      return;
    }

    const firstTask = (tasks || []).length > 0 ? tasks![0] : undefined;

    const showTable = {
      icon: 'list',
      label: 'SideNavigation.tableView',
      active: mode === AppMode.Table,
      click: async (): Promise<void> => {
        await this.navigationService.navigateToTableRoute();
      },
    };

    const showTimeline = {
      icon: 'event_note',
      label: 'SideNavigation.timelineView',
      active: mode === AppMode.Timeline,
      click: async (): Promise<void> => {
        await this.navigationService.navigateToTimelineRoute();
      },
    };

    const configureTable = {
      icon: 'settings',
      label: 'SideNavigation.configureTable',
      active: false,
      click: async (): Promise<void> => {
        await this.navigationService.navigateToConfigureRoute();
        this.activateNavigationItem(2);
      },
    };

    const configureTimeline = {
      icon: 'settings',
      label: 'SideNavigation.configureTimeline',
      active: false,
      click: async (): Promise<void> => {
        await this.navigationService.navigateToConfigureRoute();
        this.activateNavigationItem(2);
      },
    };

    const addTask = {
      icon: 'add',
      label: 'SideNavigation.addTask',
      active: false,
      click: async (): Promise<void> => {
        await this.navigationService.navigateToAddTaskRoute();
        this.activateNavigationItem(3);
      },
    };

    const editTask = {
      icon: 'edit',
      label: 'SideNavigation.editTask',
      active: false,
      click: async (): Promise<void> => {
        await this.navigationService.navigateToEditTaskRoute(
          firstTask?.getId() || '',
        );
        this.activateNavigationItem(4);
      },
    };

    const deleteTask = {
      icon: 'delete',
      label: 'SideNavigation.deleteTask',
      active: false,
      click: async (): Promise<void> => {
        await this.navigationService.navigateToDeleteTaskRoute(
          firstTask?.getId() || '',
        );
        this.activateNavigationItem(5);
      },
    };

    const exportTasks = {
      icon: 'folder_zip',
      label: 'SideNavigation.exportTasks',
      active: false,
      click: async (): Promise<void> => {
        await this.navigationService.navigateToExportTasksRoute();
        this.activateNavigationItem(6);
      },
    };

    const importTasks = {
      icon: 'drive_folder_upload',
      label: 'SideNavigation.importTasks',
      active: false,
      click: async (): Promise<void> => {
        await this.navigationService.navigateToImportTasksRoute();
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
        mergeMap((mode) =>
          this.tasksService.getTasks().pipe(
            map((tasks) => ({
              mode,
              tasks,
            })),
          ),
        ),
      )
      .subscribe(({ mode, tasks }) => {
        this.updateNavigationItems(mode, tasks);
      });
  }

  private activateNavigationItem(index: number): void {
    for (const [index_, item] of this.items.entries()) {
      item.active = index_ === index;
    }
  }
}
