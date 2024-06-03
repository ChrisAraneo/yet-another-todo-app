import { TestBed } from '@angular/core/testing';
import { TaskStateCreatorService } from './task-state-creator.service';

describe('TaskStateCreatorService', () => {
  let service: TaskStateCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStateCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
