import { ScheduleColumns } from "@/columns/scheduleColumn";
import HeadTable from "@/components/headTable";
import { DateFormat, FormatTime } from "@/helps/dateFormat";
import { IScheduleTypes } from "@/interfaces";

interface typeProps {
  data: IScheduleTypes[];
}
export default function DayTable({ data }: typeProps) {
  return (
    <div className="relative overflow-y-auto overflow-x-auto max-h-[calc(100vh-220px)]">
      <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
        <HeadTable columns={ScheduleColumns} />
        <tbody>
          {data?.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray bg-white hover:bg-gray-2"
            >
              <td className="pl-2 py-2">{index + 1}</td>
              <td>{row.doctor?.firstName}</td>
              <td>
                <p className="text-gray700">{`${FormatTime(
                  row.startTime
                )} - ${FormatTime(row.endTime)}`}</p>
              </td>
              <td>
                {typeof row.date !== "string"
                  ? DateFormat(row?.date)
                  : row.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
