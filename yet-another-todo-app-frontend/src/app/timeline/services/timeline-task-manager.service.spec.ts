import { TestBed } from '@angular/core/testing';
import { TimelineTaskManagerService } from './timeline-task-manager.service';

describe('TimelineTaskManagerService', () => {
  let service: TimelineTaskManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineTaskManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
