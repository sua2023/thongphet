"use client";
import { doctorColums } from "@/columns";
import ContainerContent from "@/components/containerContent";
import CustomSelect from "@/components/customDropdown";
import CustomDatePicker from "@/components/DatePicker";
import { DeleteButtonIcon } from "@/components/deleteButtonIcon";
import { EditButtonIcon } from "@/components/editButtionIcon";
import { CalendarIcon, SearchIcon } from "@/components/icons/icons";
import DeleteModal from "@/components/modal/deleteModal";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/searchInput";
import Select from "@/components/select";
import Approve from "@/components/status/approve";
import ColumnStatus from "@/components/status/status";
import ToolTip from "@/components/tooltip";
import { ViewButtonIcon } from "@/components/viewButtionIcon";
import { DoctorStatusEnum } from "@/enum/doctor.enum";
import { calculateIndexPaginate } from "@/helps/calculateIndexPaginate";
import { CalculatorAge } from "@/helps/calculatorAge";
import { DateFormat, formatDateToYYYYMMDD } from "@/helps/dateFormat";
import { Decimal } from "@/helps/decimal";
import { DoctorFilterIsApprove, Doctoroptions } from "@/helps/doctorOption";
import { useFetchDoctors } from "@/lib/doctor/useFetchDoctor";
import { useDeleteStatus } from "@/lib/useDeleteStatus";
import useFilter from "@/lib/useFiltter";
import { useToast } from "@/lib/useToast";
import { closeOpen, setIsOpen } from "@/redux/features/dialogSlice";
import { RootState } from "@/redux/store";
import { PageLimits } from "@/utils/pageLimit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";

export default function AllDoctors() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, loading, error, total, refresh } = useFetchDoctors(filter);
  const [searchTerm, setSearchTerm] = React.useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { deletedStatus } = useDeleteStatus();
  const { isOpen, dataEvents, status } = useSelector(
    (state: RootState) => state.dialog
  );
  const { successPromiseMessage, errorMessage } = useToast();
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
  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };
  const handleOffsetChange = (newOffset: number) => {
    filterDispatch({ type: ACTION_TYPE.OFFSET, payload: newOffset });
  };

  const handleClose = () => {
    dispatch(closeOpen());
  };
  const handleDelete = async () => {
    try {
      const url = `doctors/${dataEvents?.id}/account`;
      const result = await deletedStatus(url, DoctorStatusEnum.DELETED);
      if (result?.status === 200) {
        successPromiseMessage("Delete doctor success", 2000);
        refresh();
      } else {
        errorMessage("Delete doctor failed", 2000);
      }
      handleClose();
    } catch (error) {
      errorMessage("Someting went wrong", 2000);
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    const newDate = formatDateToYYYYMMDD(date);
    filterDispatch({ type: ACTION_TYPE.START_DATE, payload: newDate });
  };

  const handleEndDateChange = (date: Date | null) => {
    const newDate = formatDateToYYYYMMDD(date);
    filterDispatch({ type: ACTION_TYPE.END_DATE, payload: newDate });
  };

  return (
    <>
      <ContainerContent>
        <p className="text-base text-gray700">All doctors</p>
        <div className="flex gap-2 lg:py-3 mt-2">
          <CustomSelect onChange={handleOffsetChange} options={PageLimits} />
        </div>
        <div className="block lg:flex justify-between gap-2 py-3">
          <div className="flex gap-3 lg:py-0  py-2">
            <CustomDatePicker
              onChange={(date) => handleStartDateChange(date)}
            />
            <CustomDatePicker onChange={(date) => handleEndDateChange(date)} />
          </div>
          <div className="block md:flex gap-1 md:gap-4 space-y-2 md:space-y-0">
            <div>
              <Select
                placeholder="All"
                options={DoctorFilterIsApprove}
                value={filter.filter?.isApproved}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    filterDispatch({
                      type: ACTION_TYPE.ISAPPROVED,
                      payload: selectedOption,
                    });
                  }
                }}
              />
            </div>
            <div>
              <Select
                placeholder="All"
                options={Doctoroptions}
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

            <SearchInput
              onChange={(value) =>
                filterDispatch({ type: ACTION_TYPE.SEARCH, payload: value })
              }
            />
            <button
              className="px-3 py-1.5 bg-primary rounded-lg text-white text-sm"
              onClick={() => router.push("/admin/doctor/create")}
            >
              Add new
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
            <thead className="text-gray700 bg-gray text-xs uppercase">
              <tr className="border-b border-gray text-left">
                {doctorColums?.map((column) => (
                  <th key={column} scope="col" className="py-3 pl-1">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index: number) => (
                <tr
                  key={index}
                  className="border-b border-gray bg-white hover:bg-gray"
                >
                  <td className="pl-2">
                    {calculateIndexPaginate({ filter, index })}
                  </td>
                  <td>
                    <div className="flex items-center">
                      <div className="m-1 size-16 shadow-sm rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                          src={row?.profile || "/images/user/null_profile.png"}
                          width={100}
                          height={100}
                          alt={row?.firstName ?? ""}
                          className="object-contain p-2 m-2 lg:size-16 size-16 transition-all duration-300"
                        />
                      </div>
                      <div className="flex items-center">
                        <ColumnStatus status={row.status} />
                        <p>{`${row.lastName} ${row.lastName}`}</p>
                      </div>
                    </div>
                  </td>
                  <td>{CalculatorAge(row.dob)}</td>
                  <td>{row.gender}</td>

                  <td>
                    <div className="relative group">
                      <span
                        className={`${
                          row.isApproved === "pending"
                            ? "cursor-pointer"
                            : "cursor-default"
                        }`}
                        onClick={() =>
                          row.isApproved == "pending" &&
                          router.push(`/admin/doctor/approval/${row.id}`)
                        }
                      >
                        <Approve status={row.isApproved} />
                      </span>
                      {row.isApproved !== "approved" && (
                        <ToolTip title="Click to approve doctor" />
                      )}
                    </div>
                  </td>
                  <td>{Decimal(parseInt(row?.balance ?? "0"))}</td>
                  <td>{DateFormat(row.createdAt)}</td>
                  <td>
                    <div className="flex">
                      <span className="relative group">
                        <EditButtonIcon
                          onClick={() =>
                            router.push(`/admin/doctor/edit/${row.id}`)
                          }
                        />
                        <ToolTip title="Edit" />
                      </span>
                      <span className="relative group">
                        <ViewButtonIcon
                          onClick={() => router.push(`/admin/doctor/${row.id}`)}
                        />
                        <ToolTip title="View" />
                      </span>
                      <span className="relative group">
                        <DeleteButtonIcon
                          onClick={() =>
                            dispatch(
                              setIsOpen({
                                isOpen: true,
                                status: "delete_doctor",
                                dataEvents: row,
                              })
                            )
                          }
                        />
                        <ToolTip title="Delete" />
                      </span>
                    </div>
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
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
        {status == "delete_doctor" && (
          <DeleteModal
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleDelete}
          />
        )}
      </ContainerContent>
    </>
  );
}
