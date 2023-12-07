import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounceTime, first } from 'rxjs';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'yata-add-task-modal-launcher',
  templateUrl: './add-task-modal-launcher.component.html',
  styleUrls: ['./add-task-modal-launcher.component.scss'],
})
export class AddTaskModalLauncherComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  constructor(private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    this.subscribeToModalClose();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private subscribeToModalClose(): void {
    const subscription = this.dialogService
      .openAddTaskModal()
      .pipe(debounceTime(150), first())
      .subscribe(() => {
        this.router.navigate(['..']);
      });

    if (!this.subscription) {
      this.subscription = subscription;
    } else {
      this.subscription.add(subscription);
    }
  }
}
