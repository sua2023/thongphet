import { PatiensPDFColumns } from "@/columns";
import GeneralStatus from "@/components/status/generalStatus";
import ColumnStatus from "@/components/status/status";
import { CalculatorAge } from "@/helps/calculatorAge";
import { IPatienTypes } from "@/interfaces";

interface TypeProps {
  data: IPatienTypes[];
}
export default function PatientPDF({ data }: TypeProps) {
  return (
    <>
      <div>
        <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
          <thead className="text-gray700 bg-gray text-xs uppercase">
            <tr className="border-b border-gray text-left">
              {PatiensPDFColumns?.map((column) => (
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
                  <td className="py-2">{row?.firstName}</td>
                  <td>{row.phone}</td>
                  <td>{row.email}</td>
                  <td>{row.gender}</td>
                  <td>{CalculatorAge(row.dob)}</td>
                  <td>
                    <GeneralStatus status={row.status} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
