import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, debounceTime, distinct, map, mergeMap } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { ConfigureTableModalComponent } from '../configure-table-modal/configure-table-modal.component';
import { ConfigureTimelineModalComponent } from '../configure-timeline-modal/configure-timeline-modal.component';
import { DeleteTaskModalComponent } from '../delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { ExportTasksModalComponent } from '../export-tasks-modal/export-tasks-modal.component';
import { ImportTasksModalComponent } from '../import-tasks-modal/import-tasks-modal.component';
import { SignInModalComponent } from '../sign-in-modal/sign-in-modal.component';

@Component({
  selector: 'yata-modal-launcher',
  templateUrl: './modal-launcher.component.html',
  styleUrls: ['./modal-launcher.component.scss'],
})
export class ModalLauncherComponent {
  private observable?: Observable<any>;
  private subscription?: Subscription;

  constructor(
    private dialogService: DialogService,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService,
  ) {}

  ngOnInit(): void {
    this.resolveOpenModalObservable();
    this.subscribeToModalClose();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private resolveOpenModalObservable(): void {
    if (!this.activatedRoute || !this.activatedRoute.data) {
      return;
    }

    this.observable = this.activatedRoute.data.pipe(
      mergeMap((data) => {
        return this.activatedRoute.params.pipe(
          map((params) => {
            return {
              data,
              params,
            };
          }),
        );
      }),
      mergeMap(({ data, params }) => {
        return this.tasksService.getTasks().pipe(map((tasks) => ({ data, params, tasks })));
      }),
      distinct(({ data }) => data['modal']['name']),
      mergeMap(({ data, params, tasks }) => {
        const isIdDefined = !!params['id'];
        const isTasksNotEmpty = !!tasks?.length;

        switch (data['modal']['name']) {
          case AddTaskModalComponent.name: {
            return this.dialogService.openAddTaskModal();
          }
          case EditTaskModalComponent.name: {
            if (isTasksNotEmpty && isIdDefined) {
              return this.dialogService.openEditTaskModal(params['id']);
            } else if (!isIdDefined && tasks?.length) {
              return this.navigationService.navigateToEditTaskRoute(tasks[0].getId());
            } else {
              return this.dialogService.openEmptyDialog(
                'EditTaskModal.empty',
                'EditTaskModal.emptyHint',
              );
            }
          }
          case DeleteTaskModalComponent.name: {
            if (isTasksNotEmpty && isIdDefined) {
              return this.dialogService.openDeleteTaskModal(params['id']);
            } else if (!isIdDefined && tasks?.length) {
              return this.navigationService.navigateToDeleteTaskRoute(tasks[0].getId());
            } else {
              return this.dialogService.openEmptyDialog(
                'DeleteTaskModal.empty',
                'DeleteTaskModal.emptyHint',
              );
            }
          }
          case ConfigureTableModalComponent.name: {
            return this.dialogService.openConfigureTableModal();
          }
          case ConfigureTimelineModalComponent.name: {
            return this.dialogService.openConfigureTimelineModal();
          }
          case ExportTasksModalComponent.name: {
            if (isTasksNotEmpty) {
              return this.dialogService.openExportTasksModal();
            } else {
              return this.dialogService.openEmptyDialog(
                'ExportTasksModal.empty',
                'ExportTasksModal.emptyHint',
              );
            }
          }
          case ImportTasksModalComponent.name: {
            return this.dialogService.openImportTasksModal();
          }
          case SignInModalComponent.name: {
            return this.dialogService.openSignInModal();
          }
          default: {
            throw Error('Unsupported modal class');
          }
        }
      }),
    );
  }

  private subscribeToModalClose(): void {
    if (!this.observable) {
      return;
    }

    this.subscription = this.observable.pipe(debounceTime(50)).subscribe(() => {
      this.navigationService.navigateBack();
    });
  }
}
