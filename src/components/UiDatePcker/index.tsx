import React, { useState, ChangeEvent } from "react";
import { UiDatePckerProps } from "./types";
import { cn } from "../cn";

interface DateChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget & { value: string };
}


export const UiDatePicker = React.forwardRef<HTMLInputElement, UiDatePckerProps>(({ className, selectedStyle, todayDateStyle, onChange, value }, ref) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [year, setYear] = useState<number>(selectedDate.getFullYear());
  const [month, setMonth] = useState<number>(selectedDate.getMonth());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDateInputClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleNextMonthClick = () => {
    if (month === 11) setYear(year + 1);
    setMonth((month + 1) % 12);
  };

  const handlePrevMonthClick = () => {
    if (month === 0) setYear(year - 1);
    setMonth((month - 1 + 12) % 12);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.target.value));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    setShowDatePicker(false);

    // Format the date and trigger onChange with the formatted date
    const formattedDate = newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    if (onChange) {
      const event = {
        target: {
          value: formattedDate
        }
      } as DateChangeEvent;
      onChange(event);
    }
  };

  const renderDates = () => {
    const datesArray = [];
    const lastOfPrevMonth = new Date(year, month, 0);
    const lastOfMonth = new Date(year, month + 1, 0);
    const firstOfNextMonth = new Date(year, month + 1, 1);

    for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
      datesArray.push(
        <button key={`prev-${i}`} className="bg-gray-100 border border-gray-300 rounded p-1 cursor-not-allowed" disabled>
          {lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i}
        </button>
      );
    }

    for (let i = 1; i <= lastOfMonth.getDate(); i++) {
      const isToday =
        new Date().getFullYear() === year &&
        new Date().getMonth() === month &&
        new Date().getDate() === i;
      const isSelected =
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === i;
      datesArray.push(
        <button key={i} className={cn("border border-gray-300 rounded p-1 cursor-pointer", isToday ? cn("border border-primary-600 bg-primary-200", todayDateStyle) : isSelected ? cn("bg-primary-400 text-primary-900 border border-primary-600", selectedStyle) : "bg-white")} onClick={() => handleDateClick(i)}>
          {i}
        </button>
      );
    }

    for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
      datesArray.push(
        <button key={`next-${i}`} className="bg-gray-100 border border-gray-300 rounded p-1 cursor-not-allowed" disabled>
          {firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i}
        </button>
      );
    }

    return datesArray;
  };

  return (
    <div className="relative">
      <input
        type="text"
        ref={ref}
        value={value || selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
        onClick={handleDateInputClick}
        onChange={onChange}
        readOnly
        className={cn("p-2 border border-gray-300 rounded w-full", className)}
      />
      <div className={`absolute top-[110%] left-0 bg-white border border-gray-300 rounded z-50 ${showDatePicker ? "block" : "hidden"}`}>
        <div className="flex justify-between items-center p-2 border-b border-gray-300">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <select value={month} onChange={handleMonthChange} className="h-8 px-2 py-1 rounded focus:outline-none border bg-white">
                <option value={0}>January</option>
                <option value={1}>February</option>
                <option value={2}>March</option>
                <option value={3}>April</option>
                <option value={4}>May</option>
                <option value={5}>June</option>
                <option value={6}>July</option>
                <option value={7}>August</option>
                <option value={8}>September</option>
                <option value={9}>October</option>
                <option value={10}>November</option>
                <option value={11}>December</option>
              </select>
              <input
                type="number"
                value={year}
                onChange={handleYearChange}
                className="max-w-20 h-8 px-2 py-1 rounded focus:outline-none border bg-white"
              />
            </div>
            <div className="flex gap-2 items-center justify-center">
              <button className="h-8 w-8 rounded border-none flex justify-center items-center bg-primary-500 text-white cursor-pointer" onClick={handlePrevMonthClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button className="h-8 w-8 rounded border-none flex justify-center items-center bg-primary-500 text-white cursor-pointer" onClick={handleNextMonthClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 p-2 bg-gray-100">
          <span className="text-center font-bold">Sun</span>
          <span className="text-center font-bold">Mon</span>
          <span className="text-center font-bold">Tue</span>
          <span className="text-center font-bold">Wed</span>
          <span className="text-center font-bold">Thu</span>
          <span className="text-center font-bold">Fri</span>
          <span className="text-center font-bold">Sat</span>
        </div>
        <div className="grid grid-cols-7 gap-y-1 gap-x-1 p-2">
          {renderDates()}
        </div>
      </div>
    </div>
  );
});


