import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SignInModalComponent } from './sign-in-modal.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SignInModalComponent', () => {
  let component: SignInModalComponent;
  let fixture: ComponentFixture<SignInModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SignInModalComponent, MockPipe(TranslatePipe)],
    imports: [MatDialogModule,
        NoopAnimationsModule,
        StoreModule.forRoot({})],
    providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        MockProvider(AuthService, {
            signIn: () => of({ accessToken: '1010', refreshToken: '2020' }),
        }),
        FormBuilder,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
