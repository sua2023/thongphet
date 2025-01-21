import { AppointmentExportPDFColumns } from "@/columns";
import ColumnStatus from "@/components/status/status";
import UrgencyStatus from "@/components/urgency";
import { FormatDateString, FormatTime } from "@/helps/dateFormat";
import { Decimal } from "@/helps/decimal";
import { IAppointmentType } from "@/interfaces/appointment";
import { useRef } from "react";
import { useReactToPrint, UseReactToPrintOptions } from "react-to-print";

interface TypeProps {
  data: IAppointmentType[];
}
export default function AppointmentPDF({ data }: TypeProps) {
  return (
    <>
      <div>
        <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
          <thead className="text-gray700 bg-gray text-xs uppercase">
            <tr className="border-b border-gray text-left">
              {AppointmentExportPDFColumns?.map((column) => (
                <th key={column} scope="col" className="py-3 px-4">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data.map((row, index: number) => (
                <tr key={index} className="border-b border-gray bg-white">
                  <td className="pl-2">{index + 1}</td>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
