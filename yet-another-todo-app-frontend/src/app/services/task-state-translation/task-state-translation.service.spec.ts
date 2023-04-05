import { TestBed } from '@angular/core/testing';
import { TaskStateTranslationService } from './task-state-translation.service';

describe('TaskStateTranslationService', () => {
  let service: TaskStateTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStateTranslationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
