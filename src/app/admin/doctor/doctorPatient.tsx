"use client";
import {
  DoctorAppointmentColumns,
  DoctorPatiensColumns,
} from "@/columns/doctorColumn";
import CustomDropdown from "@/components/customDropdown";
import HeadTable from "@/components/headTable";
import { SearchIcon } from "@/components/icons/icons";
import ColumnStatus from "@/components/status/status";
import ToolTip from "@/components/tooltip";
import UrgencyStatus from "@/components/urgency";
import { calculateIndexPaginate } from "@/helps/calculateIndexPaginate";
import { CalculatorAge } from "@/helps/calculatorAge";
import { DateFormat, FormatDateString, FormatTime } from "@/helps/dateFormat";
import { Decimal } from "@/helps/decimal";
import { useFetchByDoctorAppoitment } from "@/lib/doctor/useFetchDoctor";
import useFilter from "@/lib/useFiltter";
import { PageLimits } from "@/utils/pageLimit";
import { useParams, useRouter } from "next/navigation";

export default function DoctorPatient() {
  const params = useParams();
  const { id } = params;
  const userId = Array.isArray(id) ? id[0] : id;
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data } = useFetchByDoctorAppoitment(filter, userId);

  console.log(data);

  return (
    <>
      <div>
        <div className="flex justify-between py-3">
          <CustomDropdown options={PageLimits} />
          <div>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon size={18} />
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray300 text-gray700 text-sm rounded-lg block w-full ps-10 p-2 focus:outline-none focus:ring-1 focus:ring-gray300"
                placeholder="Search.."
                required
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-y-auto overflow-x-auto max-h-[calc(100vh-220px)]">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
            <HeadTable columns={DoctorPatiensColumns} />
            <tbody>
              {data?.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray bg-white hover:bg-gray-2"
                >
                  <td className="pl-2">
                    {calculateIndexPaginate({ filter, index })}
                  </td>
                  <td>{`${row.patient?.firstName} ${row.patient?.lastName}`}</td>
                  <td>{row.patient.phone}</td>
                  <td>{row.patient.email}</td>
                  <td>{row.patient.gender}</td>
                  <td>{CalculatorAge(row.patient.dob)}</td>
                  <td>
                    {DateFormat(row.patient.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
