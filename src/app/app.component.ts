import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS,
} from './material-persian-date-adapter/material-persian-date-adapter.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import * as jalaliMoment from 'jalali-moment/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
  ],
  standalone: true,
})
export class AppComponent {
  range: {
    start: jalaliMoment.Moment | null;
    end: jalaliMoment.Moment | null;
  } = {
    start: null,
    end: null,
  };

  get formattedStart(): string {
    return this.range.start?.format('jYYYY/jMM/jDD') ?? '';
  }

  get formattedEnd(): string {
    return this.range.end?.format('jYYYY/jMM/jDD') ?? '';
  }

  get totalDays(): string {
    if (this.range.start && this.range.end) {
      const days = this.range.end.diff(this.range.start, 'days') + 1;
      return this.toPersianNumber(days);
    }
    return '۰';
  }

  toPersianNumber(input: number | string): string {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.toString().replace(/\d/g, (d) => persianNumbers[+d]);
  }

  dateClass = (d: jalaliMoment.Moment) => {
    const start = this.range.start;
    const end = this.range.end;
    if (start && end && d.isAfter(start) && d.isBefore(end)) {
      return 'range-highlight';
    }
    return '';
  };
  logSelectedRange(e: any): void {
    console.log(e);

    if (this.range.start && this.range.end) {
      const start = this.range.start.format('jYYYY/jMM/jDD');
      const end = this.range.end.format('jYYYY/jMM/jDD');
      const days = this.range.end.diff(this.range.start, 'days') + 1;

      const result = [start, end, days];
      console.log('📤 بازه انتخاب‌شده:', result);
    } else {
      console.log('❌ بازه تاریخ ناقص است.');
    }
  }

  singleDate: any = null;

  logSingleDate(): void {
    if (this.singleDate) {
      const formatted = this.singleDate.format('jYYYY/jMM/jDD');
      console.log('📅 تاریخ انتخابی تکی:', formatted);
    }
  }
}
