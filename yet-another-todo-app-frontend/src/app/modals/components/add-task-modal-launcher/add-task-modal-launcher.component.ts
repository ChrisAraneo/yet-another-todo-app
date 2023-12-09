import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounceTime, first, mergeMap } from 'rxjs';
import { TABLE_PATH, TIMELINE_PATH } from 'src/app/app-routing.consts';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { AppMode } from 'src/app/shared/store/types/view-configuration.type';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'yata-add-task-modal-launcher',
  templateUrl: './add-task-modal-launcher.component.html',
  styleUrls: ['./add-task-modal-launcher.component.scss'],
})
export class AddTaskModalLauncherComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private viewConfigurationService: ViewConfigurationService,
  ) {}

  ngOnInit(): void {
    this.subscribeToModalClose();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private subscribeToModalClose(): void {
    const subscription = this.dialogService
      .openAddTaskModal()
      .pipe(
        debounceTime(150),
        first(),
        mergeMap(() => {
          return this.viewConfigurationService.getAppMode();
        }),
      )
      .subscribe((mode: AppMode) => {
        if (mode === AppMode.Timeline || mode === AppMode.Table) {
          this.router.navigate([mode === AppMode.Timeline ? TIMELINE_PATH : TABLE_PATH]);
        }
      });

    if (!this.subscription) {
      this.subscription = subscription;
    } else {
      this.subscription.add(subscription);
    }
  }
}
