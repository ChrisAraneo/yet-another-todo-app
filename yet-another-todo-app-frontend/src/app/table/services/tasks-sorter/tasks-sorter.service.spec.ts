import { TestBed } from '@angular/core/testing';
import { TasksSorterService } from './tasks-sorter.service';

describe('TasksSorterService', () => {
  let service: TasksSorterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksSorterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
