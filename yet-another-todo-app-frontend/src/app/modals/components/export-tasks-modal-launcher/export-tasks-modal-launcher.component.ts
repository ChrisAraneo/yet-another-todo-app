import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounceTime, first, mergeMap } from 'rxjs';
import { TABLE_PATH, TIMELINE_PATH } from 'src/app/app-routing.consts';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { AppMode } from 'src/app/shared/store/types/view-configuration.type';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'yata-export-tasks-modal-launcher',
  templateUrl: './export-tasks-modal-launcher.component.html',
  styleUrls: ['./export-tasks-modal-launcher.component.scss'],
})
export class ExportTasksModalLauncherComponent {
  private subscription!: Subscription;

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private viewConfigurationService: ViewConfigurationService,
  ) {}

  ngOnInit(): void {
    this.subscribeToModalClose();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private subscribeToModalClose(): void {
    this.subscription = this.dialogService
      .openExportTasksModal()
      .pipe(
        debounceTime(150),
        first(),
        mergeMap(() => this.viewConfigurationService.getAppMode()),
      )
      .subscribe((mode: AppMode) => {
        if (mode === AppMode.Timeline || mode === AppMode.Table) {
          this.router.navigate([mode === AppMode.Timeline ? TIMELINE_PATH : TABLE_PATH]);
        }
      });
  }
}
