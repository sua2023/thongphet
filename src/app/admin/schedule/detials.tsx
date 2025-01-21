import { FormatTime } from "@/helps/dateFormat";
import Image from "next/image";
import React from "react";

export default function DetailsSchedule({ data }: any) {
  const { resource } = data;
  const newDate = new Date();

  const groupByDoctor = (data: any[]) => {
    return data.reduce((acc: any, item: any) => {
      const doctorName = item?.resource?.doctor?.firstName;
      if (!doctorName) return acc; // Skip records with no doctor name

      if (!acc[doctorName]) {
        acc[doctorName] = {
          doctor: doctorName,
          timeRanges: [
            { start: item.resource.startTime, end: item.resource.endTime },
          ],
        };
      } else {
        acc[doctorName].timeRanges.push({
          start: item.resource.startTime,
          end: item.resource.endTime,
        });
      }

      return acc;
    }, {});
  };
  const groupedData = groupByDoctor(data);
  const groupedDoctors = Object.values(groupedData);

  return (
    <div className="flex justify-start">
      <div className="relative overflow-auto w-full h-[calc(100vh-100px)]">
        <table className="sticky w-full text-sm text-left rtl:text-right text-gray700">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray700">
            Schedule details
          </caption>
          <thead className="text-xs text-gray700">
            <tr className="border-b border-gray">
              <th scope="col" className="px-6 py-0">
                Doctor name
              </th>
              <th scope="col" className="px-6 py-2">
               ID
              </th>
              <th scope="col" className="px-6 py-2">
                Date time
              </th>
            </tr>
          </thead>
          <tbody>
            {groupedDoctors.map((item: any, index: number) => (
              <>
                {item.timeRanges.map((timeRange: any, timeIndex: number) => (
                  <tr
                    key={`${index}-${timeIndex}`}
                    className="bg-white border-b border-gray"
                  >
                    {timeIndex === 0 && (
                      <td
                        className="px-6 py-2"
                        rowSpan={item.timeRanges.length}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-4 rtl:space-x-reverse">
                            <Image
                              className="w-10 h-10 border-white rounded-full"
                              src="/images/user/null_profile.png"
                              alt=""
                              height={10}
                              width={10}
                            />
                          </div>
                          <span>{item.doctor}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-1 border-l-2 border-gray300">
                     {timeIndex+1}
                    </td>
                    <td className="px-6 py-1 border-l-2 border-gray300">
                      {`${FormatTime(timeRange.start)} - ${FormatTime(
                        timeRange.end
                      )}`}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
