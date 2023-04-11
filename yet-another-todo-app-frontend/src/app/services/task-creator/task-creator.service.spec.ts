import { TestBed } from '@angular/core/testing';
import { TaskCreatorService } from './task-creator.service';

describe('TaskCreatorService', () => {
  let service: TaskCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
