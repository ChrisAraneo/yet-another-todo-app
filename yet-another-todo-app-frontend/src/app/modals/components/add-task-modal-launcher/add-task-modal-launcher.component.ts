import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'yata-add-task-modal-launcher',
  templateUrl: './add-task-modal-launcher.component.html',
  styleUrls: ['./add-task-modal-launcher.component.scss'],
})
export class AddTaskModalLauncherComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.dialogService.openAddTaskModal();
  }
}
