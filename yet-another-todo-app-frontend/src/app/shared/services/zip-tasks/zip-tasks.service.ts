import { Injectable } from '@angular/core';
import CryptoAES from 'crypto-js/aes';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { Task } from '../../../../../../yet-another-todo-app-shared';
import { ZipFileContent } from '../../models/zip-file-content.type';
import { DateUtilsService } from '../date-utils/date-utils.service';

@Injectable({
  providedIn: 'root',
})
export class ZipTasksService {
  constructor(private dateUtilsService: DateUtilsService) {}

  async zip(tasks: Task[], password: string): Promise<void> {
    const zip = new JSZip();

    const creationDate = new Date();

    const fileContent: ZipFileContent = {
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
    return CryptoAES.encrypt(text, password).toString();
  }
}
