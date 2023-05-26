import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { Task } from '../../models/task.model';
import { DateUtilsService } from '../date-utils/date-utils.service';

// TODO Move to separate file
type FileContent = {
  creationDate: Date;
  tasks: Task[];
};

@Injectable({
  providedIn: 'root',
})
export class ZipTasksService {
  constructor(private dateUtilsService: DateUtilsService) {}

  async zip(tasks: Task[], password: string): Promise<void> {
    const zip = new JSZip();

    const creationDate = new Date();

    const fileContent: FileContent = {
      creationDate,
      tasks,
    };

    zip.file('tasks.txt', this.encrypt(JSON.stringify(fileContent), password));

    return zip.generateAsync({ type: 'blob' }).then((blob: Blob) => {
      FileSaver.saveAs(
        blob,
        `yata-tasks-${this.dateUtilsService.formatDate(creationDate, 'yyyy-MM-dd-kkmmss')}.zip`,
      );
    });
  }

  // TODO Extract to new service
  private encrypt(text: string, password: string): string {
    return CryptoJS.AES.encrypt(text, password).toString();
  }
}
