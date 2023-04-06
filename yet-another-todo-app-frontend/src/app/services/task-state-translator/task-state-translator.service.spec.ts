import { TestBed } from '@angular/core/testing';
import { TaskStateTranslatorService } from './task-state-translator.service';

describe('TaskStateTranslatorService', () => {
  let service: TaskStateTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStateTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
