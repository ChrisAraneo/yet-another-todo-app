import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, debounceTime, mergeMap } from 'rxjs';
import { TABLE_PATH, TIMELINE_PATH } from 'src/app/app-routing.consts';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { AppMode } from 'src/app/shared/store/types/view-configuration.type';
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
  private observable!: Observable<any>;
  private subscription!: Subscription;

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private viewConfigurationService: ViewConfigurationService,
  ) {}

  ngOnInit(): void {
    this.resolveOpenModalObservable();
    this.subscribeToModalClose();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private resolveOpenModalObservable(): void {
    this.observable = this.activatedRoute.data.pipe(
      mergeMap((data) => {
        switch (data['modal']['name']) {
          case AddTaskModalComponent.name: {
            return this.dialogService.openAddTaskModal();
          }
          case EditTaskModalComponent.name: {
            return this.dialogService.openEditTaskModal();
          }
          case DeleteTaskModalComponent.name: {
            return this.dialogService.openDeleteTaskModal();
          }
          case ConfigureTableModalComponent.name: {
            return this.dialogService.openConfigureTableModal();
          }
          case ConfigureTimelineModalComponent.name: {
            return this.dialogService.openConfigureTimelineModal();
          }
          case ExportTasksModalComponent.name: {
            return this.dialogService.openExportTasksModal();
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
    this.subscription = this.observable
      .pipe(
        debounceTime(50),
        mergeMap(() => {
          return this.viewConfigurationService.getAppMode();
        }),
      )
      .subscribe((mode: AppMode) => {
        if (mode === AppMode.Timeline || mode === AppMode.Table) {
          this.router.navigate([mode === AppMode.Timeline ? TIMELINE_PATH : TABLE_PATH]);
        }
      });
  }
}
