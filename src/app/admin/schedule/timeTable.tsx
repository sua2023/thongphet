"use client";
import CustomSelect from "@/components/customDropdown";
import { SearchIcon, TimeIcon, TimeTableIcon } from "@/components/icons/icons";
import Select from "@/components/select";
import { formatDateToYYYYMMDD, FormatTime } from "@/helps/dateFormat";
import { ScheduleOptions } from "@/helps/schedule";
import { useFetchSchedule } from "@/lib/schedule/useFetchSchedule";
import useScheduleFilter from "@/lib/schedule/useFilterSchedule";
import { PageLimits } from "@/utils/pageLimit";
import React, { useRef } from "react";
import Schedules from "./schedule";
import { dateOfMonth } from "@/helps/dateOfMonth";
import DayTable from "./dayTable";
import { ScheduleDateOfWeekColumns } from "@/columns/scheduleColumn";
import { IScheduleTypes } from "@/interfaces";
import { autoSliceDayOfWeek } from "@/helps/dateOfWeek";

export default function TimeTable() {
  const {
    state: filter,
    dispatch: filterDispatch,
    ACTION_TYPE,
  } = useScheduleFilter();
  const { data, loading } = useFetchSchedule(filter);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterOfDate, setFilterOfDate] = React.useState("week");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [dataOfDate, setDataOfDate] = React.useState<IScheduleTypes[]>([]);
  const ScheduleDay = autoSliceDayOfWeek();

  const handleOffsetChange = (newOffset: number) => {
    filterDispatch({ type: ACTION_TYPE.OFFSET, payload: newOffset });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();
    setSearchTerm(newValue);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (newValue) {
        filterDispatch({ type: ACTION_TYPE.SEARCH, payload: newValue });
      } else {
        filterDispatch({ type: ACTION_TYPE.SEARCH, payload: "" });
      }
    }, 500);
  };

  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);

  const getDateForDay = (dayIndex: number) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + dayIndex);
    return `${date.getDate()}`;
  };

  const currentDateIndex = ScheduleDateOfWeekColumns.map((_, indexOfDate) => {
    const currentDateOfWeek = new Date(startOfWeek);
    currentDateOfWeek.setDate(startOfWeek.getDate() + indexOfDate);
    return currentDateOfWeek;
  });
  const formattedDates = currentDateIndex.map((date) => {
    const adjustedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return adjustedDate.toISOString().split("T")[0];
  });

  const onChange = (startDate: string, endDate: string) => {
    const newStartFomated = formatDateToYYYYMMDD(startDate);
    const newEndFomated = formatDateToYYYYMMDD(endDate);
    filterDispatch({
      type: ACTION_TYPE.START_DATE,
      payload: newStartFomated,
    });
    filterDispatch({
      type: ACTION_TYPE.END_DATE,
      payload: newEndFomated,
    });
  };

  const onViewMore = (events: any) => {
    setFilterOfDate("day");
    setDataOfDate((prev: IScheduleTypes[]) => {
      const resources = events?.map((item: any) => item.resource);
      const uniqueResources = resources.filter(
        (resource: any) =>
          !prev.some((prevItem: any) => prevItem.id === resource.id)
      );

      return [...prev, ...uniqueResources];
    });
  };

  return (
    <React.Fragment>
      <div>
        <h5>Time table</h5>
        <div className="flex justify-between gap-1 py-3">
          <CustomSelect onChange={handleOffsetChange} options={PageLimits} />
          <div className="flex gap-1 lg:gap-4">
            <div>
              <Select
                placeholder={ScheduleOptions[0].label}
                options={ScheduleOptions}
                value={filterOfDate}
                onChange={(selectedOption) => {
                  setFilterOfDate(selectedOption);
                  switch (selectedOption) {
                    case "day":
                      filterDispatch({
                        type: ACTION_TYPE.START_DATE,
                        payload: formatDateToYYYYMMDD(today),
                      });
                      filterDispatch({
                        type: ACTION_TYPE.END_DATE,
                        payload: formatDateToYYYYMMDD(nextDay),
                      });
                      break;
                    case "week":
                      setDataOfDate([]);
                      filterDispatch({
                        type: ACTION_TYPE.START_DATE,
                        payload: formattedDates[0],
                      });
                      filterDispatch({
                        type: ACTION_TYPE.END_DATE,
                        payload: formattedDates[formattedDates.length - 1],
                      });
                      break;
                    case "month":
                      setDataOfDate([]);
                      const { startDate, endDate } = dateOfMonth();
                      filterDispatch({
                        type: ACTION_TYPE.START_DATE,
                        payload: formatDateToYYYYMMDD(startDate),
                      });

                      filterDispatch({
                        type: ACTION_TYPE.END_DATE,
                        payload: formatDateToYYYYMMDD(endDate),
                      });
                      break;
                    default:
                      return;
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none ps-3">
                  <SearchIcon size={18} />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="bg-white border border-gray300 text-gray700 text-sm rounded-lg block w-full ps-10 p-2.5 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Search.."
                  required
                />
              </div>
            </div>
          </div>
        </div>
        {filterOfDate == "week" ? (
          <div id="detailed-pricing" className="w-full overflow-x-auto">
            <div className="overflow-hidden min-w-max">
              <div className="grid grid-cols-8 p-4 text-sm font-medium text-gray700 bg-gray border-t border-b border-gray300 gap-x-8">
                <p className="border-r-2 border-gray500">Doctor Name</p>
                {ScheduleDay?.map((day, index) => (
                  <div>
                    {day} <span>{getDateForDay(index)}</span>
                  </div>
                ))}
              </div>
              {data?.map((row, index: number) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-8 px-2 py-5 text-sm text-gray700 border-b border-gray300 gap-x-8"
                  >
                    <div className="text-gray-500 dark:text-gray-400">
                      {row.doctor?.firstName}
                    </div>
                    <div className="text-[12px]">
                      {formattedDates[0] == row.date
                        ? `${FormatTime(row.startTime)} - ${FormatTime(
                            row.endTime
                          )}`
                        : "--"}
                    </div>
                    <div className="text-[12px]">
                      {formattedDates[1] == row.date
                        ? `${FormatTime(row.startTime)} - ${FormatTime(
                            row.endTime
                          )}`
                        : "--"}
                    </div>
                    <div className="text-[12px]">
                      {formattedDates[2] == row.date
                        ? `${FormatTime(row.startTime)} - ${FormatTime(
                            row.endTime
                          )}`
                        : "--"}
                    </div>
                    <div className="text-[12px]">
                      {formattedDates[3] == row.date
                        ? `${FormatTime(row.startTime)} - ${FormatTime(
                            row.endTime
                          )}`
                        : "--"}
                    </div>
                    <div className="text-[12px]">
                      {formattedDates[4] == row.date
                        ? `${FormatTime(row.startTime)} - ${FormatTime(
                            row.endTime
                          )}`
                        : "--"}
                    </div>
                    <div className="text-[12px]">
                      {formattedDates[5] == row.date
                        ? `${FormatTime(row.startTime)} - ${FormatTime(
                            row.endTime
                          )}`
                        : "--"}
                    </div>
                    <div className="text-[12px]">
                      {formattedDates[6] == row.date
                        ? `${FormatTime(row.startTime)} - ${FormatTime(
                            row.endTime
                          )}`
                        : "--"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : filterOfDate == "month" ? (
          <Schedules data={data} onChange={onChange} onViewMore={onViewMore} />
        ) : (
          <React.Fragment>{data && <DayTable data={data} />}</React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
