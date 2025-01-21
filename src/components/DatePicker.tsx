import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "./icons/icons";

interface IDatePickerProps {
  onChange: (date: Date | null) => void;
}
export default function CustomDatePicker({ onChange }: IDatePickerProps) {
  const [date, setDate] = useState<Date | null>(null);
  const datePickerRef = useRef<DatePicker | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    onChange(date);
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setDate(null);
    }
  };
  React.useEffect(() => {
    if (inputValue) {
      setDate(null);
      setInputValue("");
      onChange(null);
    }
  }, [inputValue]);

  return (
    <>
      <div className="relative w-full h-10 lg:border-none border-[1.5px] border-gray300 transition focus:border-primary active:border-primary rounded-lg overflow-hidden outline-none flex items-center">
        <DatePicker
          selected={date || null}
          toggleCalendarOnIconClick
          className="px-2 h-10 bg-transparent w-full rounded-lg lg:border-[1.5px] lg:border-gray300 outline-none transition focus:border-primary active:border-primary"
          onChange={handleDateChange}
          placeholderText="DD-MMM-YYYY"
          portalId="datepicker-portal"
          ref={datePickerRef}
          value={inputValue}
          onChangeRaw={handleInputChange}
        />
        <span
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => datePickerRef?.current?.setOpen(true)}
        >
          <CalendarIcon />
        </span>
      </div>
    </>
  );
}
