'use client';

import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@app/components/core/popover';
import { Button } from '@app/components/core/button';
import { cn, formatDate } from '@app/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar, CalendarSingleProps } from '@app/components/core/calendar';
import { Side } from '@radix-ui/react-popper';

export type DatePickerProps = {
  onSelect: (date: Date | undefined) => void;
  value?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  side?: Side;
  placeholder?: string;
  disabledDate?: (date: Date) => boolean;
  calendarProps?: Omit<CalendarSingleProps, 'onSelect' | 'mode'>;
};

const DatePicker = ({ onSelect, value, placeholder, ...props }: DatePickerProps) => {
  const selected = value ? value : undefined;
  const { minDate, maxDate } = props;
  const [open, setOpen] = useState<boolean>(false);

  const disabledDate = (date: Date): boolean => {
    if (props.disabledDate) {
      return props.disabledDate(date);
    }

    let valid = true;

    if (minDate) {
      valid = date > minDate;
    }

    if (maxDate) {
      valid = valid && date < maxDate;
    }

    return !valid;
  };

  const onSelectData = (date: Date | undefined): void => {
    onSelect(date);
    setOpen(false);
  };

  return (
    <Popover onOpenChange={() => setOpen(!open)} open={open}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full pl-3 text-left font-normal tracking-normal',
            !value && 'text-muted-foreground'
          )}
        >
          {value ? formatDate(value) : <span>{placeholder ?? 'Pick a date'} </span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start" side={props.side}>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(_, date) => onSelectData(date)}
          disabled={disabledDate}
          initialFocus
          {...props.calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
};

// TODO Create DateRangePicker
export { DatePicker };
