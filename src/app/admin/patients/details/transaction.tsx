"use client";

import { TransactionColumns } from "@/columns";
import { EditButtonIcon } from "@/components/editButtionIcon";
import HeadTable from "@/components/headTable";
import { SearchIcon } from "@/components/icons/icons";
import ColumnStatus from "@/components/status/status";
import { ViewButtonIcon } from "@/components/viewButtionIcon";
import { calculateIndexPaginate } from "@/helps/calculateIndexPaginate";
import { ITransactionTypes } from "@/interfaces";
import useFilter from "@/lib/useFiltter";

interface PatientTransactionProps {
  data?: ITransactionTypes[];
}
export default function PatientTransaction({ data }: PatientTransactionProps) {
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h3>Transaction</h3>
          <div className="flex gap-1 lg:gap-4">
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
                  className="bg-white border border-gray300 text-gray700 text-sm rounded-lg block w-full ps-10 p-2 focus:outline-none focus:ring-1 focus:ring-gray300"
                  placeholder="Search.."
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-2 overflow-x-auto overflow-y-auto max-h-[calc(100vh-210px)]">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
            <HeadTable columns={TransactionColumns} />
            <tbody>
              {data &&
                data.map((row:ITransactionTypes, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-gray bg-white hover:bg-gray"
                  >
                    <td className="py-4 px-2">
                      {calculateIndexPaginate({ filter, index })}
                    </td>

                    <td>{row.type}</td>
                    <td>
                      <ColumnStatus status={row.status} />
                    </td>
                    <td>{row.amount}</td>

                    <td>
                      <div className="flex gap-0">
                        <ViewButtonIcon />
                        <EditButtonIcon />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="sticky -bottom-1 bg-white flex items-center justify-between text-sm p-2">
            {/* <p>
              Showing {filter.page} to {total} of {filter.offset} entries
            </p>
            {total > filter.offset && (
              <Pagination
                filter={filter}
                totalPage={total}
                onPageChange={handlePageChange}
              />
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}
