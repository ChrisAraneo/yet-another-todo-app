import { TestBed } from '@angular/core/testing';
import { TaskTransformerService } from './task-transformer.service';

describe('TaskTransformerService', () => {
  let service: TaskTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskTransformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
