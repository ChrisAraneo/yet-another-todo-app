import { TestBed } from '@angular/core/testing';
import { UnzipTasksService } from './unzip-tasks.service';

describe('UnzipTasksService', () => {
  let service: UnzipTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnzipTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
