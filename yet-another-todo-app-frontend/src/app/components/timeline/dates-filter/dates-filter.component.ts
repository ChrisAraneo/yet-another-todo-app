import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateUtilsService } from 'src/app/services/date-utils/date-utils.service';
import { DatesFilterForm } from './dates-filter.types';

@Component({
  selector: 'yata-dates-filter',
  templateUrl: './dates-filter.component.html',
  styleUrls: ['./dates-filter.component.scss'],
})
export class DatesFilterComponent implements OnChanges, OnDestroy {
  @Input() startDate?: Date;
  @Input() endDate?: Date;

  @Output() changeStartDate = new EventEmitter<Date>();
  @Output() changeEndDate = new EventEmitter<Date>();

  form?: FormGroup<DatesFilterForm>;

  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private dateUtilsService: DateUtilsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const startDate = changes['startDate']?.currentValue || this.startDate || null;
    const endDate = changes['endDate']?.currentValue || this.endDate || null;

    if (!this.form) {
      this.initializeForm(startDate, endDate);
      this.initializeValueChangesSubscriptions();
    } else {
      this.patchFormValues(startDate, endDate);
    }
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private initializeForm(startDate: Date | null, endDate: Date | null): void {
    this.form = this.formBuilder.group<DatesFilterForm>({
      startDate: new FormControl(this.formatDateToString(startDate)),
      endDate: new FormControl(this.formatDateToString(endDate)),
    });
  }

  private initializeValueChangesSubscriptions(): void {
    this.subscription.add(
      this.form?.controls.startDate.valueChanges.subscribe((value: string | null) => {
        value && this.changeStartDate.emit(new Date(value));
      }),
    );

    this.subscription.add(
      this.form?.controls.endDate.valueChanges.subscribe((value: string | null) => {
        value && this.changeEndDate.emit(new Date(value));
      }),
    );
  }

  private patchFormValues(startDate: Date | null, endDate: Date | null): void {
    this.form?.controls.startDate.patchValue(this.formatDateToString(startDate));
    this.form?.controls.endDate.patchValue(this.formatDateToString(endDate));
    this.form?.updateValueAndValidity();
  }

  private formatDateToString(date: Date | null): string | null {
    return date ? this.dateUtilsService.formatDate(date, 'yyyy-MM-dd') : null;
  }
}
