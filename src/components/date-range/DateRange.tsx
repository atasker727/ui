import type { JSX, ChangeEvent } from 'react';
import { useState, useRef } from 'react';

import './style.scss';

export interface DateRangeValue {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
}

interface DateRangeProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  minDate?: string;
  maxDate?: string;
  className?: string;
  onValidityChange?: (isValid: boolean) => void;
}

export default function DateRange({
  value,
  onChange,
  minDate,
  maxDate,
  className = '',
  onValidityChange,
}: DateRangeProps): JSX.Element {
  const start = value.startDate ? new Date(value.startDate) : null;
  const end = value.endDate ? new Date(value.endDate) : null;

  const _dateRange = useRef({ startDate: start, endDate: end });
  const [isValid, setIsValid] = useState(true);

  function updateInputValidatity(): boolean {
    const { startDate, endDate } = _dateRange.current;
    const _isValid = !!(startDate && endDate && startDate <= endDate);

    if (isValid !== _isValid) {
      setIsValid(_isValid);
      onValidityChange?.(_isValid);
    }
    return _isValid;
  }

  function handleStartChange(e: ChangeEvent<HTMLInputElement>) {
    _dateRange.current.startDate = new Date(e.target.value);
    onChange({ startDate: e.target.value, endDate: value.endDate });
    updateInputValidatity();
  }

  function handleEndChange(e: ChangeEvent<HTMLInputElement>) {
    _dateRange.current.endDate = new Date(e.target.value);
    onChange({ startDate: value.startDate, endDate: e.target.value });
    updateInputValidatity();
  }

  return (
    <div className="date-range--container">
      <div className={`date-range ${className}`} data-valid={isValid ? 'true' : 'false'}>
        <label className="date-range__field">
          <span className="date-range__label">Start</span>
          <input
            className="date-range__input"
            type="date"
            value={value.startDate}
            onChange={handleStartChange}
            min={minDate}
            max={maxDate}
          />
        </label>
        <span className="date-range__separator">—</span>
        <label className="date-range__field">
          <span className="date-range__label">End</span>
          <input
            className="date-range__input"
            type="date"
            value={value.endDate}
            onChange={handleEndChange}
            min={minDate}
            max={maxDate}
          />
        </label>
      </div>
      <div className="date-range__error" role="alert">
        {!isValid && 'Start date must be on or before end date'}
      </div>
    </div>
  );
}
