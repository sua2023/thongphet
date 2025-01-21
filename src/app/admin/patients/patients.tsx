"use client";

import { PatiensColumns } from "@/columns";
import CustomSelect from "@/components/customDropdown";
import { DeleteButtonIcon } from "@/components/deleteButtonIcon";
import { EditButtonIcon } from "@/components/editButtionIcon";
import ExportAction from "@/components/exportAction";
import HeadTable from "@/components/headTable";
import { SearchIcon } from "@/components/icons/icons";
import DeleteModal from "@/components/modal/deleteModal";
import LargeModal from "@/components/modal/largeModal";
import Pagination from "@/components/pagination";
import GeneralStatus from "@/components/status/generalStatus";
import { ViewButtonIcon } from "@/components/viewButtionIcon";
import { calculateIndexPaginate } from "@/helps/calculateIndexPaginate";
import { CalculatorAge } from "@/helps/calculatorAge";
import { DateFormat, formatDateToYYYYMMDD } from "@/helps/dateFormat";
import { IPatienTypes } from "@/interfaces/patients";
import { useFetchPatients } from "@/lib/patients/useFetchPatient";
import useFilter from "@/lib/useFiltter";
import useDeleteUser from "@/lib/users/useDeleteUser";
import { useToast } from "@/lib/useToast";
import { clearData, setData } from "@/redux/features/patientSlice";

import { AppDispatch, RootState } from "@/redux/store";
import { PageLimits } from "@/utils/pageLimit";
import { useRouter } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import PatientPDF from "./patientPDF";
import SearchInput from "@/components/searchInput";
import ContainerContent from "@/components/containerContent";

export default function Patients() {
  const router = useRouter();
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, total, refresh } = useFetchPatients(filter);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const partient = useSelector((state: RootState) => state.patient.data);
  const useDelete = useDeleteUser();
  const contentRef = useRef<HTMLDivElement>(null);

  const { successPromiseMessage, errorMessage, errorPromiseMessage } =
    useToast();
  const csvInstance = useRef<any>(null);
  const [isOpenPDF, setIsOpenPDF] = useState(false);

  const handleOffsetChange = (newOffset: number) => {
    filterDispatch({ type: ACTION_TYPE.OFFSET, payload: newOffset });
  };
  const handlePrint = useReactToPrint({ contentRef });

  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };
  const handleClose = () => {
    setIsOpen(!isOpen);
    dispatch(clearData());
  };

  const handleDelete = async () => {
    try {
      if (partient) {
        const url = `patients/${partient.id}`;
        const result = await useDelete.handleDelete(url);
        if (result.status === 200) {
          successPromiseMessage("Delete user success", 2000);
          refresh();
        } else {
          errorMessage("Delete user failed", 2000);
        }
        handleClose();
      }
    } catch (error) {
      errorMessage("Someting went wrong", 2000);
    }
  };

  const handleView = (row: IPatienTypes) => {
    router.push(
      `/admin/patients/details/${row.id}?data=${encodeURIComponent(
        JSON.stringify(row)
      )}`
    );
  };
  const exportCSV = useMemo(
    () =>
      data?.map((row, index: number) => {
        return {
          ID: index + 1,
          Name: row.firstName,
          Phone: row.phone,
          Email: row.email,
          Gender: row.gender,
          Status: row.status,
          Created: `${formatDateToYYYYMMDD(row.createdAt)}`,
        };
      }) || [],
    [data]
  );

  return (
    <ContainerContent>
      <CSVLink
        data={exportCSV}
        separator={","}
        ref={csvInstance}
        filename="Patient.csv"
      />
      <div className="mt-5">
        <p className="text-base text-gray700">All patients</p>
        <div className="flex justify-between py-3 gap-1">
          <CustomSelect onChange={handleOffsetChange} options={PageLimits} />
          <div className="flex gap-1 lg:gap-4">
            <div>
              <ExportAction
                onChange={(value) => {
                  if (value == "CSV") {
                    csvInstance.current?.link.click();
                  } else {
                    setIsOpenPDF(true);
                  }
                }}
              />
            </div>
            <SearchInput
              onChange={(value) =>
                filterDispatch({ type: ACTION_TYPE.SEARCH, payload: value })
              }
            />
          </div>
        </div>
        <div className="relative mt-2 overflow-x-auto overflow-y-auto max-h-[calc(100vh-210px)]">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
            <HeadTable columns={PatiensColumns} />
            <tbody>
              {data.map((row: IPatienTypes, index: number) => (
                <tr
                  key={index}
                  className="border-b border-gray bg-white hover:bg-gray"
                >
                  <td className="py-4 px-2">
                    {calculateIndexPaginate({ filter, index })}
                  </td>

                  <td>{`${row.firstName} ${row.lastName}`}</td>
                  <td>{row.phone}</td>
                  <td>{row.email}</td>
                  <td>{row.gender}</td>
                  <td>{row.role}</td>
                  <td>{CalculatorAge(row.dob)}</td>
                  <td>{row.balance}</td>
                  <td>
                    <GeneralStatus status={row.status} />
                  </td>
                  <td>{DateFormat(row.createdAt)}</td>
                  <td>
                    <div className="flex gap-0">
                      <DeleteButtonIcon
                        onClick={() => {
                          dispatch(setData(row));
                          setIsOpen(true);
                        }}
                      />

                      <ViewButtonIcon onClick={() => handleView(row)} />
                      <EditButtonIcon
                        onClick={() => {
                          dispatch(setData(row));
                          router.push(`/admin/patients/edit/${row.id}`);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sticky -bottom-1 bg-white flex items-center justify-between text-sm p-2">
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
        <LargeModal
          isOpen={isOpenPDF}
          hideClose={true}
          onClose={() => setIsOpenPDF(false)}
        >
          <div>
            <div ref={contentRef}>
              <PatientPDF data={data} />
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                className="py-2 px-5 me-2 rounded-lg text-sm font-medium text-gray900 focus:outline-none bg-white border border-gray300 hover:border-red hover:bg-gray-100 hover:text-red"
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
        <DeleteModal
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleDelete}
        />
      </div>
    </ContainerContent>
  );
}
