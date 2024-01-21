import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { ViewConfigurationService } from 'src/app/shared/services/view-configuration/view-configuration.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { ModalLauncherComponent } from './modal-launcher.component';

describe('ModalLauncherComponent', () => {
  let component: ModalLauncherComponent;
  let fixture: ComponentFixture<ModalLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLauncherComponent],
      providers: [
        MockProvider(DialogService),
        MockProvider(ActivatedRoute),
        MockProvider(Router),
        MockProvider(ViewConfigurationService),
      ],
    });
    fixture = TestBed.createComponent(ModalLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
