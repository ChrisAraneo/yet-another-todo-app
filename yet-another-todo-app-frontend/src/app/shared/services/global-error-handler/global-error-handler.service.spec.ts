import { TestBed } from '@angular/core/testing';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { MockProvider } from 'ng-mocks';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        MockProvider(MatSnackBar, {
          openFromComponent: (): MatSnackBarRef<any> => {
            return null as unknown as MatSnackBarRef<any>;
          },
        }),
      ],
    });

    service = TestBed.inject(GlobalErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
