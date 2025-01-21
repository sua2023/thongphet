"use client";
import { AppointmentColumns } from "@/columns";
import { Action } from "@/components/action";
import ContainerContent from "@/components/containerContent";
import CustomSelect from "@/components/customDropdown";
import ExportAction from "@/components/exportAction";
import { SearchIcon } from "@/components/icons/icons";
import LargeModal from "@/components/modal/largeModal";
import Pagination from "@/components/pagination";
import Select from "@/components/select";
import ColumnStatus from "@/components/status/status";
import UrgencyStatus from "@/components/urgency";
import { AppointmentOptions } from "@/helps/appointment";
import { calculateIndexPaginate } from "@/helps/calculateIndexPaginate";
import { FormatDateString, FormatTime } from "@/helps/dateFormat";
import { Decimal } from "@/helps/decimal";
import { useFetchAppointments } from "@/lib/appointment/useFetchAppointment";
import useFilter from "@/lib/useFiltter";
import { PageLimits } from "@/utils/pageLimit";
import React, { useMemo, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import AppointmentPDF from "./exportPDF";
import { useReactToPrint } from "react-to-print";

export default function Appointment() {
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, total } = useFetchAppointments(filter);
  const [searchTerm, setSearchTerm] = React.useState("");
  const csvInstance = useRef<any>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isOpenPDF, setIsOpenPDF] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({ contentRef });
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

  const exportCSV = useMemo(
    () =>
      data?.map((row, index: number) => {
        return {
          id: index + 1,
          code: row.code,
          patient: row.patient.firstName,
          duration: row.duration,
          time: row.startTime,
          urgency: row.urgency,
          totalSpend: row.total,
          status: row.status,
          doctor: row.doctor.firstName,
        };
      }) || [],
    [data]
  );
  const handleExport = (value: string) => {
    if (value == "CSV") {
      csvInstance.current?.link.click();
    } else {
      setIsOpenPDF(true);
    }
  };


  return (
    <React.Fragment>
      <CSVLink
        data={exportCSV}
        separator={","}
        ref={csvInstance}
        filename="booking.csv"
      />
      <ContainerContent>
        <h5>Bookings</h5>
        <div className="flex justify-between gap-1 py-3">
          <CustomSelect onChange={handleOffsetChange} options={PageLimits} />
          <div className="flex gap-1 lg:gap-3">
            <div>
              <Select
                options={AppointmentOptions}
                value={filter.filter?.status}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    filterDispatch({
                      type: ACTION_TYPE.STATUS,
                      payload: selectedOption,
                    });
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
            <div>
              <ExportAction onChange={(value) => handleExport(value)} />
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
            <thead className="text-gray700 bg-gray text-xs uppercase">
              <tr className="border-b border-gray text-left">
                {AppointmentColumns?.map((column) => (
                  <th key={column} scope="col" className="py-3 pl-1">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 &&
                data.map((row, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-gray bg-white hover:bg-gray"
                  >
                    <td className="pl-2">
                      {calculateIndexPaginate({ filter, index })}
                    </td>
                    <td>{row.code}</td>
                    <td>{row.patient?.firstName}</td>
                    <td>
                      <div>
                        <p className="text-sm">{row.duration} Minutes</p>
                        <p
                          className="text-gray500"
                          style={{ fontSize: "12px" }}
                        >{`${FormatTime(row.startTime)} - ${FormatTime(
                          row.endTime
                        )}`}</p>
                      </div>
                    </td>
                    <td>{UrgencyStatus(row.urgency)}</td>
                    <td>{Decimal(parseInt(row.total))}</td>
                    <td>{FormatDateString(row.date)}</td>
                    <td>{row.doctor.firstName}</td>
                    <td>
                      <ColumnStatus status={row.status} />
                    </td>
                    <td>
                      <Action
                        onEvents={(action) => {
                          console.log(action);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="sticky bg-white -bottom-1 flex items-center justify-between text-sm p-2">
            <p>
              Showing {filter.page} to {total} of {filter.offset} entries
            </p>
            {total > filter.offset && (
              <Pagination
                filter={filter}
                totalPage={total}
                onPageChange={(newPage) =>
                  filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage })
                }
              />
            )}
          </div>
        </div>
        <LargeModal
          isOpen={isOpenPDF}
          hideClose={true}
          onClose={() => setIsOpenPDF(false)}
        >
          <div>
            <div ref={contentRef}>
              <AppointmentPDF data={data} />
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                className="py-2.5 px-5 me-2 rounded-lg text-sm font-medium text-gray900 focus:outline-none bg-white border border-gray300 hover:border-red hover:bg-gray-100 hover:text-red"
                onClick={() => setIsOpenPDF(false)}
              >
                Canncel
              </button>
              <button
                className="py-2 px-3 w-24 bg-primary text-white text-sm rounded-lg"
                type="button"
                onClick={() => {
                  handlePrint();
                  setIsOpenPDF(false);
                }}
              >
                Print pdf
              </button>
            </div>
          </div>
        </LargeModal>
      </ContainerContent>
    </React.Fragment>
  );
}
