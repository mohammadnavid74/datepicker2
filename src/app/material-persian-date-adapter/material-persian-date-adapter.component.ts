import { DateAdapter } from '@angular/material/core';
import jalaliMoment from 'jalali-moment';

export const PERSIAN_DATE_FORMATS = {
  parse: {
    dateInput: 'jYYYY/jMM/jDD',
  },
  display: {
    dateInput: 'jYYYY/jMM/jDD',
    monthYearLabel: 'jYYYY jMMMM',
    dateA11yLabel: 'jYYYY/jMM/jDD',
    monthYearA11yLabel: 'jYYYY jMMMM',
  },
};

export class MaterialPersianDateAdapter extends DateAdapter<jalaliMoment.Moment> {
  constructor() {
    super();
    super.setLocale('fa');
  }

  override getYear(date: jalaliMoment.Moment): number {
    return this.clone(date).jYear();
  }

  override getMonth(date: jalaliMoment.Moment): number {
    return this.clone(date).jMonth();
  }

  override getDate(date: jalaliMoment.Moment): number {
    return this.clone(date).jDate();
  }

  override getDayOfWeek(date: jalaliMoment.Moment): number {
    return this.clone(date).day();
  }

  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
      case 'short':
        return jalaliMoment
          .localeData('fa')
          .jMonths()
          .map((name) => this.toPersianNumber(name));
      case 'narrow':
        return jalaliMoment
          .localeData('fa')
          .jMonthsShort()
          .map((name) => this.toPersianNumber(name));
    }
  }

  override getDateNames(): string[] {
    const valuesArray = Array(31);
    for (let i = 0; i < 31; i++) {
      valuesArray[i] = this.toPersianNumber(String(i + 1));
    }
    return valuesArray;
  }

  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return jalaliMoment.localeData('fa').weekdays().slice(0);
      case 'short':
        return jalaliMoment.localeData('fa').weekdaysShort().slice(0);
      case 'narrow':
        return ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
    }
  }

  override getYearName(date: jalaliMoment.Moment): string {
    return this.toPersianNumber(this.clone(date).jYear().toString());
  }

  override getFirstDayOfWeek(): number {
    return jalaliMoment.localeData('fa').firstDayOfWeek();
  }

  override getNumDaysInMonth(date: jalaliMoment.Moment): number {
    return this.clone(date).jDaysInMonth();
  }

  override clone(date: jalaliMoment.Moment): jalaliMoment.Moment {
    return date.clone().locale('fa');
  }

  override createDate(
    year: number,
    month: number,
    date: number
  ): jalaliMoment.Moment {
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }
    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = jalaliMoment()
      .jYear(year)
      .jMonth(month)
      .jDate(date)
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .locale('fa');

    if (this.getMonth(result) !== month) {
      throw Error(`Invalid date ${date} for month with index ${month}.`);
    }
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }

  override today(): jalaliMoment.Moment {
    return jalaliMoment().locale('fa');
  }

  override parse(
    value: any,
    parseFormat: string | string[]
  ): jalaliMoment.Moment | null {
    if (value && typeof value === 'string') {
      return jalaliMoment(value, parseFormat, 'fa');
    }
    return value ? jalaliMoment(value).locale('fa') : null;
  }

  override format(date: jalaliMoment.Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('JalaliMomentDateAdapter: Cannot format invalid date.');
    }
    return this.toPersianNumber(date.format(displayFormat));
  }

  override addCalendarYears(
    date: jalaliMoment.Moment,
    years: number
  ): jalaliMoment.Moment {
    return this.clone(date).add(years, 'jYear');
  }

  override addCalendarMonths(
    date: jalaliMoment.Moment,
    months: number
  ): jalaliMoment.Moment {
    return this.clone(date).add(months, 'jMonth');
  }

  override addCalendarDays(
    date: jalaliMoment.Moment,
    days: number
  ): jalaliMoment.Moment {
    return this.clone(date).add(days, 'jDay');
  }

  override toIso8601(date: jalaliMoment.Moment): string {
    return this.clone(date).format();
  }

  override isDateInstance(obj: any): boolean {
    return jalaliMoment.isMoment(obj);
  }

  override isValid(date: jalaliMoment.Moment): boolean {
    return this.clone(date).isValid();
  }

  override invalid(): jalaliMoment.Moment {
    return jalaliMoment.invalid();
  }

  override deserialize(value: any): jalaliMoment.Moment | null {
    let date;
    if (value instanceof Date) {
      date = jalaliMoment(value);
    }
    if (typeof value === 'string') {
      if (!value) return null;
      date = jalaliMoment(value).locale('fa');
    }
    if (date && this.isValid(date)) {
      return date;
    }
    return super.deserialize(value);
  }
  toPersianNumber(str: string): string {
    const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return str.replace(/\d/g, (d) => faDigits[parseInt(d)]);
  }
}
