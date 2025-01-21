"use client";

import useAuth from "@/app/context/useAuth";
import useApi from "@/lib/useApi";
import usePagination from "@/lib/usePagination";

export default function Dashboard() {
  const fetchAPI = useApi();
  const pagination = usePagination();
  const { isAuthenticated } = useAuth();
  const listUsers1 = Array.from({ length: 20 }, (_, index) => ({
    name: `demo${index}`,
    position: "UX/UI",
    status: "active",
  }));

  const handlePaginate = (page: number) => {
    pagination.dispatch({
      type: pagination.ACTION_TYPE.PAGINATION,
      payload: page,
    });
  };

  const columns = ["#", "NAME", "POSITION", "STATUS", "ACTION"];

  return (
    <div className="bg-white">
      <div className="overflow-auto">
        <table className="text-gray700 w-full overflow-x-auto text-left text-sm rtl:text-right">
          <thead className="text-gray700 bg-gray300 text-xs uppercase">
            <tr className="border-b border-gray bg-gray text-left ">
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="bg-gray100 border-gray300"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              {columns?.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listUsers1.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray bg-white hover:bg-gray300"
              >
                <td className="w-4 px-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="bg-gray300 border-gray300 h-4 w-4 rounded text-primary focus:ring-2 focus:ring-primary"
                    />
                    <label
                      htmlFor={`checkbox-table-search-${index}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td>
                  {index +
                    1 +
                    Number(
                      pagination.state.pageSize * (pagination.state.page - 1)
                    )}
                </td>
                <td
                  scope="row"
                  className="text-gray00 flex items-center white space-nowrap py-4"
                >
                  <p>{row.name}</p>
                </td>
                <td>{row.position}</td>
                <td>
                  <div className="flex items-center">
                    <div className="me-2 h-2.5 w-2.5 rounded-full bg-primary"></div>
                    {row.status}
                  </div>
                </td>
                <td>
                  <button>edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="py-4">pagination</div>
      </div>
    </div>
  );
}
