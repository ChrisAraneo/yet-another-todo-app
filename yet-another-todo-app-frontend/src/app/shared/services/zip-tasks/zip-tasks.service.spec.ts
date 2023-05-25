import { TestBed } from '@angular/core/testing';
import { ZipTasksService } from './zip-tasks.service';

describe('ZipTasksService', () => {
  let service: ZipTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
