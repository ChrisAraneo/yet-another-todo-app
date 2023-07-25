import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigureTableModalComponent } from './configure-table-modal.component';

describe('ConfigureTableModalComponent', () => {
  let component: ConfigureTableModalComponent;
  let fixture: ComponentFixture<ConfigureTableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigureTableModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigureTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
