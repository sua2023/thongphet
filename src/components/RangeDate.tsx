import React, { useState } from 'react';

interface DateRangePickerProps {
    onStartDateChange?: (date: string) => void; 
    onEndDateChange?: (date: string) => void;  
  }

export default function DateRangePicker({ onStartDateChange, onEndDateChange }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setStartDate(date);
    if (onStartDateChange) {
      onStartDateChange(date); 
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setEndDate(date);
    if (onEndDateChange) {
      onEndDateChange(date); 
    }
  };
  return (
    <div className="flex gap-2">
      <div className="flex items-end">
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="w-full rounded-lg border-[1.5px] border-gray300 bg-white px-2 py-1.5 text-black outline-none transition focus:border-primary active:border-primary"
          />
      </div>
      <div className="flex items-end">
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="bg-white border-[1.5px] border-gray300 p-2 text-gray700 text-sm rounded-lg focus:outline-none  focus:border-primary  block w-full"
        />
      </div>
    </div>
  );
}
