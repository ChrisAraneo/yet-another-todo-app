import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import CryptoAES from 'crypto-js/aes';
import JSZip from 'jszip';
import { ZipFileContent } from '../../models/zip-file-content.model';
import { TaskCreatorService } from '../task-creator/task-creator.service';

@Injectable({
  providedIn: 'root',
})
export class UnzipTasksService {
  constructor(private taskCreatorService: TaskCreatorService) {}

  async unzip(data: ArrayBuffer, password: string): Promise<ZipFileContent> {
    const zip = await new JSZip().loadAsync(data);
    const encryptedTasksString = (await zip.file('tasks.txt')?.async('string')) || '';
    const decryptedTasksString = this.decrypt(encryptedTasksString, password);
    const parsed = JSON.parse(decryptedTasksString);

    return {
      creationDate: new Date(parsed.creationDate),
      tasks: parsed.tasks.map((task: any) => this.taskCreatorService.create(task)),
    };
  }

  // TODO Extract to new service
  private decrypt(text: string, password: string): string {
    return CryptoAES.decrypt(text, password).toString(CryptoJS.enc.Utf8);
  }
}
