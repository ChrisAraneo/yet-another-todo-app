import { TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import {
  CompletedTaskState,
  InProgressTaskState,
  NotStartedTaskState,
  RejectedTaskState,
  SuspendedTaskState,
  TaskState,
} from 'src/app/models/task-state.model';
import * as json from '../../../assets/i18n/en.json';
import { Option } from '../../components/form/select/select.types';
import { TaskStateTranslatorService } from './task-state-translator.service';

describe('TaskStateTranslatorService', () => {
  let service: TaskStateTranslatorService;
  const en = json;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({ en: require('src/assets/i18n/en.json') }),
      ],
    });
    service = TestBed.inject(TaskStateTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTranslatedTaskStateSelectOptions should return an Option<TaskState>[] with correct translated states', () => {
    const options: Option<TaskState>[] = [
      { label: en.NOT_STARTED, value: new NotStartedTaskState() },
      { label: en.IN_PROGRESS, value: new InProgressTaskState() },
      { label: en.SUSPENDED, value: new SuspendedTaskState() },
      { label: en.COMPLETED, value: new CompletedTaskState() },
      { label: en.REJECTED, value: new RejectedTaskState() },
    ];

    expect(service.getTranslatedTaskStateSelectOptions()).toEqual(options);
  });
});
