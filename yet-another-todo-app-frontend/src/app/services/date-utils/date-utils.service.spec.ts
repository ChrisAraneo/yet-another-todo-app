import { TestBed } from '@angular/core/testing';
import { DateUtilsService } from './date-utils.service';

describe('DateUtilsService', () => {
  let service: DateUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllDaysInMonth should return 30 dates for month 2022-11', () => {
    const result = service.getAllDaysInMonth(new Date(2022, 10, 17));
    expect(result.length).toBe(30);
  });

  it('#getAllDaysInMonth should return 31 dates for month 2022-12', () => {
    const result = service.getAllDaysInMonth(new Date(2022, 11, 18));
    expect(result.length).toBe(31);
  });

  it('#getAllDaysInMonth should return 28 dates for month 2023-02', () => {
    const result = service.getAllDaysInMonth(new Date(2023, 1, 15));
    expect(result.length).toBe(28);
  });

  it('#getAllDaysInMonth should return 29 dates for month 2020-02', () => {
    const result = service.getAllDaysInMonth(new Date(2020, 1, 1));
    expect(result.length).toBe(29);
  });

  it('#formatDate should return yyyy-MM string', () => {
    const result = service.formatDate(new Date(2020, 3, 15), 'yyyy-MM');
    expect(result).toBe('2020-04');
  });
});