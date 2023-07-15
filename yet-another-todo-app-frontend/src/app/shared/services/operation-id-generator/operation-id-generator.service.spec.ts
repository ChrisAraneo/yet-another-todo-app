import { TestBed } from '@angular/core/testing';
import { OperationIdGeneratorService } from './operation-id-generator.service';

describe('OperationIdGeneratorService', () => {
  let service: OperationIdGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationIdGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
